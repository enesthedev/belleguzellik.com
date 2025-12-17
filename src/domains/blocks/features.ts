import type { Block } from 'payload'

export const features: Block = {
  slug: 'features',
  labels: {
    singular: 'Özellikler',
    plural: 'Özellikler',
  },
  fields: [
    {
      name: 'features',
      type: 'array',
      label: 'Özellik Listesi',
      labels: {
        singular: 'Özellik',
        plural: 'Özellikler',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'İkon',
          admin: {
            description: 'Lucide ikon adı (örn: Shield, Zap, Clock)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Başlık',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Açıklama',
        },
      ],
    },
  ],
}
