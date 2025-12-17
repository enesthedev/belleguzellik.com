import type { Block } from 'payload'

export const richText: Block = {
  slug: 'rich-text',
  labels: {
    singular: { en: 'Rich Text', tr: 'Zengin Metin' },
    plural: { en: 'Rich Texts', tr: 'Zengin Metinler' },
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: { en: 'Content', tr: 'İçerik' },
    },
  ],
}
