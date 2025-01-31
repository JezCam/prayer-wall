import React from 'react'
import { getPrayerRequestsUseCase } from '@/use-cases/prayer-requests'
import PrayerWall from './prayer-wall'

export default async function PrayerWallPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; per_page?: string }>
}) {
  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1
  const perPage = params.per_page ? parseInt(params.per_page) : 5
  const { prayerRequests, totalPrayerRequests, totalPages } =
    await getPrayerRequestsUseCase(page, perPage)

  return (
    <div className='grid grid-cols-1 items-start lg:grid-cols-[auto_auto_auto] gap-8 max-w-full h-fit'>
      <PrayerWall
        currentPage={page}
        prayerRequests={prayerRequests}
        totalPrayerRequests={totalPrayerRequests}
        totalPages={totalPages}
      />
    </div>
  )
}
