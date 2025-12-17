import { slugField, type CollectionConfig } from 'payload'

import { turkishToSlug } from '@/utils'

export const ServicesCollection: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { en: 'Service', tr: 'Hizmet' },
    plural: { en: 'Services', tr: 'Hizmetler' },
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (!doc.slug) return doc

        const pageSlug = `hizmetler/${doc.slug}`

        const { docs: existingPages } = await req.payload.find({
          collection: 'pages',
          where: {
            slug: { equals: pageSlug },
          },
          limit: 1,
        })

        if (operation === 'create' && existingPages.length === 0) {
          await req.payload.create({
            collection: 'pages',
            data: {
              title: doc.name,
              slug: pageSlug,
              layout: [
                {
                  blockType: 'service-header',
                  service: doc.id,
                },
                {
                  blockType: 'rich-text',
                  content: {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              text: doc.description || 'Hizmet açıklaması buraya gelecek.',
                            },
                          ],
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  blockType: 'features',
                  features: [],
                },
              ],
            },
          })
        } else if (operation === 'update' && existingPages.length > 0) {
          const existingPage = existingPages[0]
          const oldSlug = existingPage.slug

          if (oldSlug !== pageSlug) {
            await req.payload.update({
              collection: 'pages',
              id: existingPage.id,
              data: {
                title: doc.name,
                slug: pageSlug,
              },
            })
          }
        }

        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (!doc.slug) return doc

        const pageSlug = `hizmetler/${doc.slug}`

        const { docs: existingPages } = await req.payload.find({
          collection: 'pages',
          where: {
            slug: { equals: pageSlug },
          },
          limit: 1,
        })

        if (existingPages.length > 0) {
          await req.payload.delete({
            collection: 'pages',
            id: existingPages[0].id,
          })
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Service Name', tr: 'Hizmet Adı' },
      required: true,
    },
    slugField({
      useAsSlug: 'name',
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => {
        if (!valueToSlugify || typeof valueToSlugify !== 'string') return undefined
        return turkishToSlug(valueToSlugify)
      },
    }),
    {
      name: 'coverImage',
      type: 'upload',
      label: { en: 'Cover Image', tr: 'Kapak Resmi' },
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', tr: 'Açıklama' },
    },
    {
      name: 'duration',
      type: 'number',
      label: { en: 'Duration (min)', tr: 'Süre (dk)' },
      admin: {
        position: 'sidebar',
        description: { en: 'Duration in minutes', tr: 'Dakika cinsinden süre' },
      },
    },
  ],
}
