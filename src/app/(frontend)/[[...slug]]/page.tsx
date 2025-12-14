import { RenderBlocks } from '@/components/render-blocks'
import { ServiceHeader } from '@/domains/services/components/service-header'
import type { Page, Service } from '@/payload-types'
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

  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 100,
  })

  const pageParams = pages.map((page) => ({
    slug: page.slug === 'anasayfa' ? [] : page.slug?.split('/') || [],
  }))

  const serviceParams = services.map((service) => ({
    slug: ['hizmetler', service.slug || ''],
  }))

  return [...pageParams, ...serviceParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const segments = slug || []

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (segments[0] === 'hizmetler' && segments.length === 2) {
    const { docs: services } = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: segments[1],
        },
      },
      limit: 1,
    })

    const service = services[0] as Service | undefined

    if (!service) {
      return { title: 'Hizmet Bulunamadı' }
    }

    return {
      title: service.name,
      description: service.description || undefined,
    }
  }

  const pageSlug = segments.join('/') || 'anasayfa'

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

  return {
    title: page.title,
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const segments = slug || []

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (segments[0] === 'hizmetler' && segments.length === 2) {
    const { docs: services } = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: segments[1],
        },
      },
      limit: 1,
    })

    const service = services[0] as Service | undefined

    if (!service) {
      notFound()
    }

    return (
      <main>
        <ServiceHeader service={service} />
        <RenderBlocks blocks={service.content} />
      </main>
    )
  }

  const pageSlug = segments.join('/') || 'anasayfa'

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
            Lütfen Admin Paneline gidip slug&apos;ı &quot;anasayfa&quot; olan bir sayfa oluşturun.
          </p>
        </div>
      )
    }
    notFound()
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
