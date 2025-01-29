import { ModeToggle } from '@/components/mode-toggle'
import { getPrayerRequestsUseCase } from '@/use-cases/prayer-requests'
import SharePrayerRequestForm from '@/components/share-prayer-request-form'
import PrayerRequest from '@/components/prayer-request'
import OriginPagination from '@/components/comp-462'

export default async function Home({
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
    <div className='w-screen min-h-screen flex justify-center p-24'>
      <div className='flex gap-14'>
        <div className='flex flex-col gap-6 w-[30rem]'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='font-bold'>Prayer Wall</h1>
            <ModeToggle />
          </div>
          <p className='text-muted-foreground text-sm'>
            You may add your prayer request to our prayer wall using the form
            below. Once your prayer request is received, we will share it
            according to your instructions. Feel free to submit as many prayer
            requests as you like!
          </p>
          <SharePrayerRequestForm />
        </div>
        <div className='flex flex-col gap-6 w-[35rem]'>
          {prayerRequests.map((prayerRequest, index) => (
            <PrayerRequest
              key={index}
              id={prayerRequest.id}
              name={prayerRequest.title.rendered}
              prayerRequest={prayerRequest.content.rendered}
              num_times_prayed={prayerRequest.acf.num_times_prayed}
            />
          ))}
          {totalPrayerRequests > 0 && (
            <OriginPagination currentPage={page} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
