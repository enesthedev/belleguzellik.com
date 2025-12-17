import type { Block } from 'payload'

export const gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galeri',
    plural: 'Galeriler',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Resimler',
      labels: {
        singular: 'Resim',
        plural: 'Resimler',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Resim',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
