import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import type { MediaConfig } from './types'

export const MEDIA_ASSETS = {
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
  facialMask: {
    filename: 'woman-receiving-facial-mask-applied-by-beautician.jpg',
    alt: 'Cilt Bakımı',
    mimeType: 'image/jpeg',
  },
  nailArt: {
    filename: 'nail-art.jpg',
    alt: 'Tırnak Sanatı',
    mimeType: 'image/jpeg',
  },
  eyebrowEyelash: {
    filename: 'woman-with-eyebrow-and-eyelash-design-applied.jpg',
    alt: 'Kaş ve Kirpik Tasarımı',
    mimeType: 'image/jpeg',
  },
  haircut: {
    filename: 'woman-haircut.jpg',
    alt: 'Profesyonel Saç Hizmetleri',
    mimeType: 'image/jpeg',
  },
  laserEpilation: {
    filename: 'woman-laser-epliation.jpg',
    alt: 'Lazer Epilasyon',
    mimeType: 'image/jpeg',
  },
} as const

export async function getOrCreateMedia(
  payload: Payload,
  mediaConfig: MediaConfig,
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

