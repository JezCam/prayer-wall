import {
  createPrayerRequest,
  getPrayerRequests,
  prayForRequest,
} from '@/data-access/prayer-request'

export async function sharePrayerRequestUseCase(
  name: string,
  email: string,
  phone: string,
  share_instructions: string,
  prayer_request: string,
) {
  createPrayerRequest(name, email, phone, share_instructions, prayer_request)
}

export async function getPrayerRequestsUseCase(page: number, perPage: number) {
  return await getPrayerRequests(page, perPage)
}

export async function prayForRequestUseCase(
  id: number,
  num_times_prayed: number,
) {
  prayForRequest(id, num_times_prayed)
}
