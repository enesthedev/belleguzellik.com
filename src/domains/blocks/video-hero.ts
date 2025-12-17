import type { Block } from 'payload'

export const videoHero: Block = {
  slug: 'video-hero',
  labels: {
    singular: { en: 'Video Hero Section', tr: 'Videolu Kahraman Bölümü' },
    plural: { en: 'Video Hero Sections', tr: 'Videolu Kahraman Bölümleri' },
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background Image', tr: 'Arka Plan Resmi' },
      relationTo: 'media',
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: { en: 'Background Video', tr: 'Arka Plan Videosu' },
      relationTo: 'media',
    },
    {
      name: 'actions',
      type: 'array',
      label: { en: 'Action Buttons', tr: 'Aksiyon Butonları' },
      labels: {
        singular: { en: 'Action', tr: 'Aksiyon' },
        plural: { en: 'Actions', tr: 'Aksiyonlar' },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: { en: 'Label', tr: 'Etiket' },
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: { en: 'Link (URL)', tr: 'Bağlantı (URL)' },
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: { en: 'Icon', tr: 'İkon' },
          options: [
            { label: { en: 'Map (Location)', tr: 'Harita (Konum)' }, value: 'map-pin' },
            { label: { en: 'Phone', tr: 'Telefon' }, value: 'phone' },
            { label: { en: 'Clock', tr: 'Saat' }, value: 'clock' },
          ],
        },
      ],
    },
  ],
}
