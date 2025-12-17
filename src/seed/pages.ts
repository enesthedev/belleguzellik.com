import type { Payload } from 'payload'

import { getOrCreateMedia, MEDIA_ASSETS } from './media'

export async function seedHomePage(payload: Payload): Promise<void> {
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: '/',
      },
    },
    limit: 1,
  })

  if (existingPages.length > 0) {
    payload.logger.info('Home page already exists, skipping')
    return
  }

  payload.logger.info('Seeding home page...')

  const videoId = await getOrCreateMedia(payload, MEDIA_ASSETS.video)
  const thumbnailId = await getOrCreateMedia(payload, MEDIA_ASSETS.thumbnail)

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Anasayfa',
      slug: '/',
      layout: [
        {
          blockType: 'video-hero',
          backgroundVideo: videoId,
          backgroundImage: thumbnailId,
          actions: [
            {
              label: 'Yol Tarifi Alın',
              link: 'https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8',
              icon: 'map-pin',
            },
            {
              label: 'Randevu Alın',
              link: 'https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum',
              icon: 'phone',
            },
          ],
        },
        {
          blockType: 'services-carousel',
          heading: 'Hizmetlerimiz',
          description: 'Geniş güzellik hizmetleri yelpazemizi keşfedin',
        },
      ],
    },
  })

  payload.logger.info('Home page seeded successfully')
}

export async function seedServicesPage(payload: Payload): Promise<void> {
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'hizmetler',
      },
    },
    limit: 1,
  })

  if (existingPages.length > 0) {
    payload.logger.info('Services page already exists, skipping')
    return
  }

  payload.logger.info('Seeding services page...')

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Hizmetlerimiz',
      slug: 'hizmetler',
      layout: [
        {
          blockType: 'services-grid',
          heading: 'Hizmetlerimiz',
          description:
            'Size sunduğumuz geniş güzellik hizmetleri yelpazemizi keşfedin. Her hizmet, uzman ekibimiz tarafından özenle sunulmaktadır.',
        },
      ],
    },
  })

  payload.logger.info('Services page seeded successfully')
}

