import type { Block } from 'payload'

export const servicesGrid: Block = {
  slug: 'services-grid',
  labels: {
    singular: { en: 'Services Grid', tr: 'Hizmetler Grid' },
    plural: { en: 'Services Grids', tr: 'Hizmetler Gridleri' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Heading', tr: 'Başlık' },
      defaultValue: 'Hizmetlerimiz',
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', tr: 'Açıklama' },
      defaultValue: 'Size sunduğumuz profesyonel hizmetleri keşfedin',
    },
  ],
}

