import { RenderBlocks } from '@/components/render-blocks'
import type { Page } from '@/payload-types'
import config from '@/payload.config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return pages.map((page) => ({
    slug: page.slug === '/' ? [] : page.slug?.split('/') || [],
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const segments = slug || []

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageSlug = segments.join('/') || '/'

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pageSlug,
      },
    },
    limit: 1,
  })

  const page = pages[0] as Page | undefined

  if (!page) {
    return { title: 'Sayfa Bulunamadı' }
  }

  const meta = page.meta

  const ogImage =
    meta?.image && typeof meta.image === 'object' && meta.image.url
      ? {
          url: meta.image.url,
          width: meta.image.width || 1200,
          height: meta.image.height || 630,
          alt: meta.image.alt || page.title,
        }
      : undefined

  return {
    title: meta?.title || page.title,
    description: meta?.description || undefined,
    openGraph: {
      title: meta?.title || page.title,
      description: meta?.description || undefined,
      url: pageSlug === '/' ? '/' : `/${pageSlug}`,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.title || page.title,
      description: meta?.description || undefined,
      ...(ogImage && { images: [ogImage.url] }),
    },
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const segments = slug || []

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // URL'de slug yoksa ana sayfa için '/' slug'ını kullan
  const pageSlug = segments.join('/') || '/'

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pageSlug,
      },
    },
    limit: 1,
  })

  const page = pages[0]

  if (!page) {
    if (segments.length === 0) {
      return (
        <div className="flex h-screen flex-col items-center justify-center space-y-4 p-4 text-center">
          <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
          <p>Ana sayfa içeriği henüz oluşturulmadı.</p>
          <p className="text-muted-foreground">
            Lütfen Admin Paneline gidip slug&apos;ı &quot;/&quot; olan bir sayfa oluşturun.
          </p>
        </div>
      )
    }
    notFound()
  }

  const enableFullscreen = page.enableFullscreenSections ?? false

  return (
    <main className={enableFullscreen ? 'h-screen overflow-hidden' : ''}>
      <RenderBlocks blocks={page.layout} enableFullscreenSections={enableFullscreen} />
    </main>
  )
}
