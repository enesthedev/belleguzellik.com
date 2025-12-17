import config from '@/payload.config'
import { getPayload } from 'payload'
import { ServicesCarouselClient } from './services-carousel.client'

interface ServicesCarouselBlockProps {
  heading?: string | null
  description?: string | null
}

export async function ServicesCarouselBlock({ heading, description }: ServicesCarouselBlockProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: services } = await payload.find({
    collection: 'services',
    locale: 'tr',
    limit: 5,
    depth: 1,
  })

  return <ServicesCarouselClient heading={heading} description={description} services={services} />
}
