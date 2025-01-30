import { ModeToggle } from '@/components/mode-toggle'
import { getPrayerRequestsUseCase } from '@/use-cases/prayer-requests'
import SharePrayerRequestForm from '@/components/share-prayer-request-form'
import PrayerRequest from '@/components/prayer-request'
import OriginPagination from '@/components/origin-pagination'

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
    <div className='w-screen min-h-screen flex justify-center px-3 py-6 lg:py-24 lg:px-12'>
      <div className='grid grid-cols-1 items-start lg:grid-cols-[auto_auto_auto] gap-8 max-w-full h-fit'>
        <div className='flex flex-col gap-5 w-full max-w-[30rem]'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='pl-4 text-2xl font-bold'>Prayer Wall</h1>
            <ModeToggle />
          </div>
          <p className='px-4 text-sm text-muted-foreground'>
            Remember, your prayers can be seen 👀 so make sure that you use your
            own first name only!
            <br></br>
            <br></br>
            If you'd like to include others in your prayer requests, make sure
            you use their initials only 🤗
          </p>
          <p className='text-sm bg-muted/60 text-muted-foreground p-4 rounded-xl'>
            You may add your prayer request to our prayer wall using the form
            below. Once your prayer request is received, we will share it
            according to your instructions. Feel free to submit as many prayer
            requests as you like!
          </p>

          <SharePrayerRequestForm />
        </div>
        {/* Divider */}
        <div className='px-6 lg:px-0 lg:py-6 h-[2px] w-full lg:h-full lg:w-[2px]'>
          <div className='h-full w-full bg-muted rounded-full'></div>
        </div>
        <div className='flex flex-col gap-3 w-full max-w-[30rem]'>
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
            <div className='mt-3'>
              <OriginPagination currentPage={page} totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
