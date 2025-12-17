import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { r2Storage } from '@payloadcms/storage-r2'
import { en } from '@payloadcms/translations/languages/en'
import { tr } from '@payloadcms/translations/languages/tr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { GetPlatformProxyOptions } from 'wrangler'

import { MediaCollection } from './domains/media'
import { PagesCollection } from './domains/pages'
import { ServicesCollection } from './domains/services'
import { UsersCollection } from './domains/users'
import { seed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/logo',
      },
    },
  },
  collections: [UsersCollection, MediaCollection, ServicesCollection, PagesCollection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
  }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    seoPlugin({
      tabbedUI: true,
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} - ${process.env.SITE_NAME}`,
      generateDescription: ({ doc }) => doc.excerpt,
      generateURL: ({ doc }) => {
        const slug = doc?.slug || ''
        return slug === '/' ? `${process.env.SITE_URL}` : `${process.env.SITE_URL}/${slug}`
      },
    }),
  ],
  i18n: {
    supportedLanguages: { en, tr },
    fallbackLanguage: 'en',
  },
  onInit: async (payload) => {
    await seed(payload)
  },
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
