import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
  type SupportedLocale,
  detectLocaleFromPath,
  isAdminPath,
  toInternalPath,
  toLocalizedPath,
} from './i18n/routes'

const PAYLOAD_LOCALE_COOKIE = 'payload-lng'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isAdminPath(pathname)) {
    return NextResponse.next()
  }

  const cookieLocale = request.cookies.get(PAYLOAD_LOCALE_COOKIE)?.value as
    | SupportedLocale
    | undefined
  const pathLocale = detectLocaleFromPath(pathname)

  if (pathLocale === 'tr') {
    const internalPath = toInternalPath(pathname)

    if (cookieLocale === 'en') {
      const url = request.nextUrl.clone()
      url.pathname = internalPath
      return NextResponse.redirect(url, 302)
    }

    const fullyLocalizedPath = toLocalizedPath(internalPath, 'tr')

    if (pathname !== fullyLocalizedPath) {
      const url = request.nextUrl.clone()
      url.pathname = fullyLocalizedPath
      return NextResponse.redirect(url, 302)
    }

    const url = request.nextUrl.clone()
    url.pathname = internalPath

    const response = NextResponse.rewrite(url)
    if (cookieLocale !== 'tr') {
      response.cookies.set(PAYLOAD_LOCALE_COOKIE, 'tr', { path: '/' })
    }
    return response
  }

  if (pathLocale === 'en') {
    const userLocale = cookieLocale || 'en'

    if (userLocale === 'tr') {
      const localizedPath = toLocalizedPath(pathname, 'tr')
      const url = request.nextUrl.clone()
      url.pathname = localizedPath
      return NextResponse.redirect(url, 302)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/(admin|yonetim)/:path*'],
}
