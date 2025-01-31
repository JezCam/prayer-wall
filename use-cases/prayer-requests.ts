import {
  createPrayerRequest,
  getPrayerRequests,
  updatePrayerRequest,
} from '@/data-access/prayer-request'
import { PrayerRequest } from './types'

export async function sharePrayerRequestUseCase(
  name: string,
  email: string,
  phone: string,
  share_instructions: string,
  prayer_request: string,
): Promise<PrayerRequest> {
  return await createPrayerRequest(
    name,
    email,
    phone,
    share_instructions,
    prayer_request,
  )
}

export async function getPrayerRequestsUseCase(page: number, perPage: number) {
  return await getPrayerRequests(page, perPage)
}

export async function prayForRequestUseCase(
  id: number,
  num_times_prayed: number,
) {
  const data: Partial<PrayerRequest> = {
    acf: {
      num_times_prayed,
    },
  }
  updatePrayerRequest(id, data)
}
