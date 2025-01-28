import { createPrayerRequest } from '@/data-access/prayer-request'

export async function sharePrayerRequestUseCase(
  name: string,
  email: string,
  phone: string,
  shareInstructions: string,
  prayerRequest: string,
) {
  createPrayerRequest(name, email, phone, shareInstructions, prayerRequest)
}
