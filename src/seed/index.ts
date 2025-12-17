import type { Payload } from 'payload'

import { seedHomePage, seedServicesPage } from './pages'
import { seedServices } from './services'

export async function seed(payload: Payload): Promise<void> {
  await seedHomePage(payload)
  await seedServices(payload)
  await seedServicesPage(payload)
}

