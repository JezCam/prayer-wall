import { PrayerRequest } from '@/use-cases/types'

const wpApiUrl = process.env.WORDPRESS_URL as string
const appUsername = process.env.WORDPRESS_APP_USERNAME as string
const appPassword = process.env.WORDPRESS_APP_PASSWORD as string

export async function createPrayerRequest(
  name: string,
  email: string,
  phone: string,
  share_instructions: string,
  prayer_request: string,
) {
  const postData = {
    title: share_instructions === 'anonymous' ? 'Anonymous' : name,
    content: prayer_request,
    status: share_instructions === 'nothing' ? 'draft' : 'publish', // Publish immediately or 'draft' for draft
    acf: {
      email,
      phone,
      share_instructions,
    },
  }

  const response = await fetch(wpApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${appUsername}:${appPassword}`).toString('base64')}`,
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create prayer request')
  }

  const data = await response.json()
  return data // Return the created post data
}

export async function getPrayerRequests(
  page: number,
  perPage: number,
): Promise<{
  prayerRequests: PrayerRequest[]
  totalPrayerRequests: number
  totalPages: number
}> {
  const response = await fetch(wpApiUrl + `?page=${page}&per_page=${perPage}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch prayer requests')
  }

  const totalPosts = response.headers.get('X-WP-Total') // Get total posts count
  const totalPages = response.headers.get('X-WP-TotalPages') // Get total pages

  // Parse the JSON response
  const prayerRequests = await response.json()
  return {
    prayerRequests,
    totalPrayerRequests: Number(totalPosts),
    totalPages: Number(totalPages),
  }
}

export async function updatePrayerRequest(
  id: number,
  data: Partial<PrayerRequest>,
): Promise<PrayerRequest> {
  const response = await fetch(wpApiUrl + `/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${appUsername}:${appPassword}`).toString('base64')}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create prayer request')
  }

  const prayerRequest = await response.json()
  return prayerRequest
}
