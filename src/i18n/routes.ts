export type SupportedLocale = 'en' | 'tr'

export const routeTranslations: Record<SupportedLocale, Record<string, string>> = {
  tr: {
    admin: 'yonetim',
    collections: 'koleksiyonlar',
    globals: 'geneller',
    create: 'olustur',
    services: 'hizmetler',
    users: 'kullanicilar',
    media: 'medya',
    login: 'giris-yap',
    account: 'hesabim',
    createFirstUser: 'ilk-kullanici-olustur',
    pages: 'sayfalar',
  },
  en: {
    admin: 'admin',
    collections: 'collections',
    globals: 'globals',
    create: 'create',
    services: 'services',
    users: 'users',
    media: 'media',
    login: 'login',
    account: 'account',
    createFirstUser: 'create-first-user',
    pages: 'pages',
  },
}

const createReverseMap = (
  translations: Record<SupportedLocale, Record<string, string>>,
): Record<string, Record<string, SupportedLocale>> => {
  const reverseMap: Record<string, Record<string, SupportedLocale>> = {}

  for (const [locale, segments] of Object.entries(translations)) {
    for (const [key, value] of Object.entries(segments)) {
      if (!reverseMap[key]) {
        reverseMap[key] = {}
      }
      reverseMap[key][value] = locale as SupportedLocale
    }
  }

  return reverseMap
}

export const reverseRouteMap = createReverseMap(routeTranslations)

const segmentToInternalMap = (() => {
  const map: Record<string, string> = {}

  for (const [, translations] of Object.entries(routeTranslations)) {
    for (const [key, value] of Object.entries(translations)) {
      map[value] = routeTranslations.en[key] || value
    }
  }

  return map
})()

export const normalizeToInternal = (path: string): string => {
  const segments = path.split('/').filter(Boolean)

  const normalizedSegments = segments.map((segment) => {
    return segmentToInternalMap[segment] || segment
  })

  return '/' + normalizedSegments.join('/')
}

export const translatePath = (
  path: string,
  fromLocale: SupportedLocale,
  toLocale: SupportedLocale,
): string => {
  if (fromLocale === toLocale) return path

  const segments = path.split('/').filter(Boolean)
  const fromTranslations = routeTranslations[fromLocale]
  const toTranslations = routeTranslations[toLocale]

  const translatedSegments = segments.map((segment) => {
    const key = Object.entries(fromTranslations).find(([, value]) => value === segment)?.[0]
    if (key && toTranslations[key]) {
      return toTranslations[key]
    }
    return segment
  })

  return '/' + translatedSegments.join('/')
}

export const detectLocaleFromPath = (path: string): SupportedLocale | null => {
  const firstSegment = path.split('/').filter(Boolean)[0]

  if (firstSegment === 'admin') return 'en'
  if (firstSegment === 'yonetim') return 'tr'

  return null
}

export const isAdminPath = (path: string): boolean => {
  const firstSegment = path.split('/').filter(Boolean)[0]
  return firstSegment === 'admin' || firstSegment === 'yonetim'
}

export const toInternalPath = (path: string): string => {
  return normalizeToInternal(path)
}

export const toLocalizedPath = (path: string, locale: SupportedLocale): string => {
  const pathLocale = detectLocaleFromPath(path)

  if (!pathLocale) return path
  if (pathLocale === locale) return path

  return translatePath(path, pathLocale, locale)
}
