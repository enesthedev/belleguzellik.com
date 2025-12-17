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
    richTextParagraphs: [
      'Belle Güzellik Merkezi olarak, cildinizin benzersiz ihtiyaçlarını anlıyor ve size özel bakım protokolleri sunuyoruz. Her cilt tipi farklıdır ve bu nedenle her müşterimize kişiselleştirilmiş bir yaklaşım sunmaktayız.',
      'Profesyonel cilt bakımı seanslarımız, en son teknoloji cihazlar ve dermatolojik olarak onaylı ürünlerle gerçekleştirilmektedir. Kullandığımız tüm ürünler, uluslararası kalite standartlarına uygun ve cilt dostu formüllerden oluşmaktadır.',
      'Uzman estetisyenlerimiz, cildinizi derinlemesine analiz ederek kişiselleştirilmiş bir bakım planı oluşturur. Bu plan; temizlik, peeling, maske uygulaması, serum tedavisi ve nemlendirme aşamalarını içerir.',
      'Düzenli cilt bakımı ile gözenekleriniz küçülür, cilt tonunuz eşitlenir ve cildiniz daha genç, daha canlı bir görünüm kazanır. İlk seanstan itibaren farkı hissedeceksiniz.',
    ],
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
    richTextParagraphs: [
      'Tırnaklarınız, stilinizin ve kişiliğinizin bir yansımasıdır. Belle Güzellik Merkezi olarak, tırnak bakımı ve nail art konusunda uzmanlaşmış ekibimizle size muhteşem tırnaklar sunuyoruz.',
      'Kalıcı oje uygulamamız, özel UV/LED teknolojisi ile sertleştirilen, 2-3 hafta boyunca ilk günkü parlaklığını ve dayanıklılığını koruyan profesyonel bir işlemdir. Çizilme, soyulma veya solma olmadan mükemmel görünümünüzü koruyun.',
      'Nail art hizmetimizde sınır hayal gücünüzdür. French, ombre, geometrik desenler, çiçek motifleri, taş süslemeleri ve daha fazlası... Özel günleriniz için veya günlük şıklığınız için size özel tasarımlar oluşturuyoruz.',
      'Tüm uygulamalarımızda tırnak sağlığını ön planda tutuyoruz. Kullandığımız ürünler, tırnaklarınıza zarar vermeden güçlendiren ve koruyan özel formüllerden oluşmaktadır.',
    ],
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
    richTextParagraphs: [
      'Bakışlarınız, yüzünüzün en dikkat çekici ve ifade dolu noktasıdır. Doğru şekillendirilmiş kaşlar ve bakımlı kirpikler, yüz hatlarınızı belirginleştirir ve doğal güzelliğinizi ön plana çıkarır.',
      'Kaş tasarımı hizmetimizde, yüz şeklinizi ve kemik yapınızı analiz ederek size en uygun kaş formunu belirliyoruz. İplik, cımbız veya ağda teknikleriyle hassas şekillendirme yapıyor, kaşlarınıza doğal ve çerçevelenmiş bir görünüm kazandırıyoruz.',
      'Kirpik lifting işlemi, kendi doğal kirpiklerinizi kökten uca kıvırarak daha uzun, daha dolgun ve daha kıvrık görünmesini sağlar. Maskara veya kirpik kıvırıcıya ihtiyaç duymadan, makyajsız bile etkileyici bakışlara sahip olabilirsiniz.',
      'İşlem tamamen ağrısız olup, sonuçlar 6-8 hafta boyunca kalıcıdır. Doğal kirpiklerinize zarar vermeden, günlük bakım rutininizi kolaylaştırır.',
    ],
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
      {
        icon: 'Sparkles',
        title: 'Kirpik Boyama',
        description:
          'Kirpiklerinizi boyayarak makyajsız bile belirgin ve etkileyici bakışlar elde edin.',
      },
      {
        icon: 'Heart',
        title: 'Doğal Görünüm',
        description:
          'Tüm işlemlerimizde doğallığı koruyarak yüz hatlarınızla uyumlu sonuçlar elde ediyoruz.',
      },
    ],
  },
]

function createRichTextContent(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

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
    const serviceSlug = turkishToSlug(serviceData.name)

    const service = await payload.create({
      collection: 'services',
      draft: false,
      data: {
        name: serviceData.name,
        slug: serviceSlug,
        description: serviceData.description,
        duration: serviceData.duration,
        coverImage: coverImageId ?? undefined,
      },
    })

    payload.logger.info(`Created service: ${serviceData.name}`)

    const pageSlug = `hizmetler/${serviceSlug}`
    const { docs: existingPages } = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: pageSlug },
      },
      limit: 1,
    })

    if (existingPages.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingPages[0].id,
        data: {
          layout: [
            {
              blockType: 'service-header',
              service: service.id,
            },
            {
              blockType: 'rich-text',
              content: createRichTextContent(serviceData.richTextParagraphs),
            },
            {
              blockType: 'features',
              features: serviceData.features,
            },
          ],
        },
      })
      payload.logger.info(`Updated service page with content: ${serviceData.name}`)
    }
  }

  payload.logger.info('Services seeded successfully')
}

async function seedHomePage(payload: Payload): Promise<void> {
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

  const videoId = await getOrCreateMedia(payload, SEED_MEDIA.video)
  const thumbnailId = await getOrCreateMedia(payload, SEED_MEDIA.thumbnail)

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

export async function seed(payload: Payload): Promise<void> {
  await seedHomePage(payload)
  await seedServices(payload)
}
