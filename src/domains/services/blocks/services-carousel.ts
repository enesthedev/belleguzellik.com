import type { Block } from 'payload'

export const servicesCarousel: Block = {
  slug: 'services-carousel',
  labels: {
    singular: { en: 'Services Carousel', tr: 'Hizmet' },
    plural: { en: 'Services Carousels', tr: 'Hizmetler' },
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
