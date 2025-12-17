import type { Block } from 'payload'

export const serviceHeader: Block = {
  slug: 'service-header',
  labels: {
    singular: { en: 'Service Header', tr: 'Hizmet Başlığı' },
    plural: { en: 'Service Headers', tr: 'Hizmet Başlıkları' },
  },
  fields: [
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      label: { en: 'Service', tr: 'Hizmet' },
    },
  ],
}
