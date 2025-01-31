'use client'

import { PrayerRequest } from '@/use-cases/types'
import React, { useOptimistic, useState } from 'react'
import PrayerRequestCard from './prayer-request-card'
import SharePrayerRequestForm from './share-prayer-request-form'
import OriginPagination from '@/components/origin-pagination'

export default function PrayerWall(props: {
  currentPage: number
  prayerRequests: PrayerRequest[]
  totalPrayerRequests: number
  totalPages: number
}) {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(
    props.prayerRequests,
  )
  const [optimisticPrayerRequests, setOptimisticPrayerRequests] =
    useOptimistic(prayerRequests)

  const onShare = (data: PrayerRequest) => {
    setOptimisticPrayerRequests(prev => [data, ...prev.slice(0, -1)])
  }
  const onSuccess = (data: PrayerRequest) => {
    setPrayerRequests(prev => [data, ...prev.slice(0, -1)])
  }

  return (
    <>
      <div className='flex flex-col gap-5 w-full max-w-[30rem]'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='pl-4 text-2xl font-bold'>Prayer Wall</h1>
        </div>
        <p className='px-4 text-sm text-muted-foreground'>
          Remember, your prayers can be seen 👀 so make sure that you use your
          own first name only!
          <br></br>
          <br></br>
          If you&apos;d like to include others in your prayer requests, make
          sure you use their initials only 🤗
        </p>
        <p className='text-sm bg-muted/60 text-muted-foreground p-4 rounded-xl'>
          You may add your prayer request to our prayer wall using the form
          below. Once your prayer request is received, we will share it
          according to your instructions. Feel free to submit as many prayer
          requests as you like!
        </p>

        <SharePrayerRequestForm onShare={onShare} onSuccess={onSuccess} />
      </div>
      {/* Divider */}
      <div className='px-6 lg:px-0 lg:py-6 h-[2px] w-full lg:h-full lg:w-[2px]'>
        <div className='h-full w-full bg-muted rounded-full'></div>
      </div>
      <div className='flex flex-col gap-3 w-full max-w-[30rem]'>
        {optimisticPrayerRequests.map(prayerRequest => (
          <PrayerRequestCard
            key={prayerRequest.id}
            prayerRequest={prayerRequest}
          />
        ))}
        {props.totalPrayerRequests > 0 && (
          <div className='mt-3'>
            <OriginPagination
              currentPage={props.currentPage}
              totalPages={props.totalPages}
            />
          </div>
        )}
      </div>
    </>
  )
}
