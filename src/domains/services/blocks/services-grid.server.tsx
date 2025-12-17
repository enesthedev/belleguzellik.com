import config from '@/payload.config'
import { getPayload } from 'payload'
import { ServicesGridClient } from './services-grid.client'

interface ServicesGridBlockProps {
  heading?: string | null
  description?: string | null
}

export async function ServicesGridBlock({ heading, description }: ServicesGridBlockProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: services } = await payload.find({
    collection: 'services',
    locale: 'tr',
    limit: 100,
    depth: 1,
  })

  return <ServicesGridClient heading={heading} description={description} services={services} />
}

