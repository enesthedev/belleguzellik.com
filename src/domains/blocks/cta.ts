import type { Block } from 'payload'

export const cta: Block = {
  slug: 'cta',
  labels: {
    singular: 'Aksiyon Çağrısı',
    plural: 'Aksiyon Çağrıları',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Başlık',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Buton Metni',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Buton Linki',
      required: true,
    },
  ],
}
