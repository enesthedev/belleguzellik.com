import type { CollectionConfig } from 'payload'

export const MediaCollection: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', tr: 'Medya' },
    plural: { en: 'Media', tr: 'Medyalar' },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { en: 'Alt Text', tr: 'Alternatif Metin' },
      required: true,
    },
  ],
  upload: {
    crop: false,
    focalPoint: false,
  },
}
