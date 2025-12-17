import type { CollectionConfig } from 'payload'

export const UsersCollection: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', tr: 'Kullanıcı' },
    plural: { en: 'Users', tr: 'Kullanıcılar' },
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
