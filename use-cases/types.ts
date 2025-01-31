export interface PrayerRequest {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf: {
    email?: string
    phone?: string
    share_instructions?: string
    num_times_prayed?: number
  }
  pending?: boolean
}
