import { slugField, type CollectionConfig } from 'payload'

import { turkishToSlug } from '@/utils'
import { cta, features, gallery, richText, videoHero } from '../blocks'
import { serviceHeader, servicesCarousel, servicesGrid } from '../services/blocks'

export const PagesCollection: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { en: 'Page', tr: 'Sayfa' },
    plural: { en: 'Pages', tr: 'Sayfalar' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', tr: 'Başlık' },
    },
    slugField({
      useAsSlug: 'title',
      slugify: ({ valueToSlugify }) => {
        if (!valueToSlugify || typeof valueToSlugify !== 'string') return undefined
        return turkishToSlug(valueToSlugify)
      },
    }),
    {
      name: 'enableFullscreenSections',
      type: 'checkbox',
      defaultValue: false,
      label: { en: 'Enable Fullscreen Sections', tr: 'Tam Ekran Bölümler' },
      admin: {
        description: {
          en: 'When enabled, each section will take full screen height with scroll snap',
          tr: 'Aktif olduğunda her bölüm tam ekran yüksekliğinde olur ve scroll snap kullanılır',
        },
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      label: { en: 'Layout', tr: 'Sayfa Düzeni' },
      labels: {
        singular: { en: 'Layout', tr: 'Sayfa Düzeni' },
        plural: { en: 'Layouts', tr: 'Sayfa Düzenleri' },
      },
      blocks: [videoHero, servicesCarousel, servicesGrid, serviceHeader, richText, features, gallery, cta],
    },
  ],
}
