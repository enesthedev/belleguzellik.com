import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { turkishToSlug } from '@/utils'

const SEED_MEDIA = {
  video: {
    filename: 'makeup-video.mp4',
    alt: 'Belle Güzellik Merkezi - Makyaj Video',
    mimeType: 'video/mp4',
  },
  thumbnail: {
    filename: 'makeup-video-thumbnail.png',
    alt: 'Belle Güzellik Merkezi - Video Thumbnail',
    mimeType: 'image/png',
  },
}

const SEED_SERVICES = [
  {
    name: 'Profesyonel Cilt Bakımı',
    description:
      'Cildinizin ihtiyaçlarına özel olarak tasarlanmış, derinlemesine temizlik ve nemlendirme içeren kapsamlı yüz bakımı.',
    duration: 75,
    image: {
      filename: 'woman-receiving-facial-mask-applied-by-beautician.jpg',
      alt: 'Profesyonel Cilt Bakımı',
      mimeType: 'image/jpeg',
    },
    features: [
      {
        icon: 'Search',
        title: 'Cilt Analizi',
        description:
          'Özel cihazlarla cildinizin nem, yağ ve elastikiyet seviyelerini ölçerek size özel bir yol haritası çıkarıyoruz.',
      },
      {
        icon: 'Sparkles',
        title: 'Derin Temizlik',
        description:
          'Gözeneklerinizi tıkayan kirlilik, makyaj kalıntıları ve ölü derilerden cildinizi nazikçe arındırıyoruz.',
      },
      {
        icon: 'Heart',
        title: 'Besleyici Bakım',
        description:
          'Cilt tipinize özel seçilmiş serumlar ve maskelerle cildinizin ihtiyaç duyduğu vitamin ve mineralleri sağlıyoruz.',
      },
      {
        icon: 'Shield',
        title: 'Koruma',
        description:
          'Nemlendirici ve SPF koruması ile bakımın etkisini mühürlüyor, cildinizi dış etkenlere karşı korumaya alıyoruz.',
      },
    ],
  },
  {
    name: 'Kalıcı Oje & Nail Art',
    description:
      'Profesyonel kalıcı oje uygulaması ve özel tasarım nail art ile tırnaklarınızı sanata dönüştürün.',
    duration: 60,
    image: {
      filename: 'nail-art.jpg',
      alt: 'Kalıcı Oje & Nail Art',
      mimeType: 'image/jpeg',
    },
    features: [
      {
        icon: 'Clock',
        title: 'Uzun Ömürlü',
        description:
          '2-3 hafta boyunca ilk günkü parlaklığını koruyan, çizilmeyen mükemmel görünüm.',
      },
      {
        icon: 'Shield',
        title: 'Tırnak Dostu',
        description:
          'Tırnaklarınıza zarar vermeyen, aksine kırılmalara karşı koruma sağlayan özel formül.',
      },
      {
        icon: 'Palette',
        title: 'Sınırsız Sanat',
        description: 'French, ombre, geometrik desenler veya taş süslemelerle tarzınızı yansıtın.',
      },
    ],
  },
  {
    name: 'Kaş & Kirpik Tasarımı',
    description:
      'Yüz hatlarınıza uygun profesyonel kaş şekillendirme ve kirpik lifting ile bakışlarınızı canlandırın.',
    duration: 90,
    image: {
      filename: 'woman-with-eyebrow-and-eyelash-design-applied.jpg',
      alt: 'Kaş & Kirpik Tasarımı',
      mimeType: 'image/jpeg',
    },
    features: [
      {
        icon: 'Scissors',
        title: 'Kaş Tasarımı',
        description:
          'Yüz şeklinize en uygun kaş formunu belirliyor, iplik, cımbız veya ağda teknikleriyle hassas şekillendirme yapıyoruz.',
      },
      {
        icon: 'Eye',
        title: 'Kirpik Lifting',
        description:
          'Kendi kirpiklerinizi kökten uca kıvırarak daha uzun, daha dolgun ve daha kıvrık görünmesini sağlayan bakım işlemidir.',
      },
    ],
  },
]

async function getOrCreateMedia(
  payload: Payload,
  mediaConfig: { filename: string; alt: string; mimeType: string },
): Promise<number | null> {
  const { docs: existingMedia } = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: mediaConfig.filename,
      },
    },
    limit: 1,
  })

  if (existingMedia.length > 0) {
    payload.logger.info(`Media already exists: ${mediaConfig.filename}`)
    return existingMedia[0].id
  }

  const assetsDir = path.resolve(process.cwd(), 'src/assets')
  const filePath = path.join(assetsDir, mediaConfig.filename)

  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Seed asset not found: ${filePath}`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: mediaConfig.alt,
    },
    file: {
      data: fileBuffer,
      name: mediaConfig.filename,
      mimetype: mediaConfig.mimeType,
      size: fileBuffer.length,
    },
  })

  payload.logger.info(`Created media: ${mediaConfig.filename}`)
  return media.id
}

async function seedServices(payload: Payload): Promise<void> {
  payload.logger.info('Seeding services...')

  for (const serviceData of SEED_SERVICES) {
    const { docs: existingServices } = await payload.find({
      collection: 'services',
      where: {
        name: {
          equals: serviceData.name,
        },
      },
      limit: 1,
    })

    if (existingServices.length > 0) {
      payload.logger.info(`Service already exists: ${serviceData.name}`)
      continue
    }

    const coverImageId = await getOrCreateMedia(payload, serviceData.image)

    await payload.create({
      collection: 'services',
      draft: false,
      data: {
        name: serviceData.name,
        slug: turkishToSlug(serviceData.name),
        description: serviceData.description,
        duration: serviceData.duration,
        coverImage: coverImageId ?? undefined,
        content: [
          {
            blockType: 'features',
            features: serviceData.features,
          },
        ],
      },
    })

    payload.logger.info(`Created service: ${serviceData.name}`)
  }

  payload.logger.info('Services seeded successfully')
}

async function seedHomePage(payload: Payload): Promise<void> {
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'anasayfa',
      },
    },
    limit: 1,
  })

  if (existingPages.length > 0) {
    payload.logger.info('Home page already exists, skipping')
    return
  }

  payload.logger.info('Seeding home page...')

  const videoId = await getOrCreateMedia(payload, SEED_MEDIA.video)
  const thumbnailId = await getOrCreateMedia(payload, SEED_MEDIA.thumbnail)

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Anasayfa',
      slug: 'anasayfa',
      layout: [
        {
          blockType: 'hero',
          showLogo: true,
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

export async function seed(payload: Payload): Promise<void> {
  await seedHomePage(payload)
  await seedServices(payload)
}
