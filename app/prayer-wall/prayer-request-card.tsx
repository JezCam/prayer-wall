'use client'

import React, { useState } from 'react'
import { Form } from '../../components/ui/form'
import { useServerAction } from 'zsa-react'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { prayForRequestAction } from '@/app/prayer-wall/actions'
import { z } from 'zod'
import { LoaderButton } from '../../components/loader-button'

import he from 'he'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrayerRequest } from '@/use-cases/types'

const praySchema = z.object({
  id: z.number(),
  num_times_prayed: z.number(),
})

export default function PrayerRequestCard(props: {
  prayerRequest: PrayerRequest
}) {
  const name = props.prayerRequest.title.rendered
  const prayerRequest = props.prayerRequest.content.rendered

  const { toast } = useToast()
  const [prayed, setPrayed] = useState<boolean>(false)
  const [numTimesPrayed, setNumTimesPrayed] = useState<number>(
    props.prayerRequest.acf.num_times_prayed ?? 0,
  )

  const { execute, isPending } = useServerAction(prayForRequestAction, {
    onError({ err }) {
      toast({
        title: 'Something went wrong, please try again.',
        description: err.message,
        variant: 'destructive',
      })
      // roll back state change
      setNumTimesPrayed(prev => prev - 1)
    },
    onSuccess({ data }) {
      toast({
        title: 'Prayer received',
        description: `Thank you for praying for ${name}!`,
      })
      setPrayed(true)
      console.log(data)
    },
  })

  const form = useForm<z.infer<typeof praySchema>>({
    resolver: zodResolver(praySchema),
    defaultValues: {
      id: props.prayerRequest.id,
      num_times_prayed: numTimesPrayed + 1,
    },
  })

  function onSubmit(values: z.infer<typeof praySchema>) {
    setNumTimesPrayed(prev => prev + 1)
    execute(values)
  }

  return (
    <div
      style={{ opacity: props.prayerRequest.pending ? 0.5 : 1 }}
      className='bg-muted/60 p-4 pl-5 pb-5 rounded-[28px] flex flex-col gap-3'
    >
      <div className='flex justify-between items-center gap-3'>
        <h2 className='font-semibold'>{name}</h2>
        <div className='flex gap-2 items-center '>
          {numTimesPrayed > 0 ? (
            <span className='text-xs'>
              Prayed for <span className='font-bold'>{numTimesPrayed}</span>{' '}
              time
              {numTimesPrayed > 1 && 's'}.
            </span>
          ) : (
            <span className='text-xs'>Be the first to pray for this!</span>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <LoaderButton
                variant='outline'
                isLoading={isPending}
                type='submit'
                disabled={prayed}
              >
                {prayed ? 'Thanks for praying!' : 'I prayed for this'}
              </LoaderButton>
            </form>
          </Form>
        </div>
      </div>
      <p className='text-sm'>
        {he.decode(
          props.prayerRequest.pending
            ? prayerRequest
            : prayerRequest.slice(3, -5),
        )}
      </p>
    </div>
  )
}
