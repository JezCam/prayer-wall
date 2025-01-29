'use client'

import React, { useState } from 'react'
import { Form } from './ui/form'
import { useServerAction } from 'zsa-react'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { prayForRequestAction } from '@/app/actions'
import { z } from 'zod'
import { LoaderButton } from './loader-button'

const praySchema = z.object({
  id: z.number(),
  num_times_prayed: z.number(),
})

export default function PrayerRequest(props: {
  id: number
  name: string
  prayerRequest: string
  num_times_prayed: number
}) {
  const { toast } = useToast()
  const [prayed, setPrayed] = useState<boolean>(false)

  const { execute, isPending, error } = useServerAction(prayForRequestAction, {
    onError({ err }) {
      toast({
        title: 'Something went wrong, please try again.',
        description: err.message,
        variant: 'destructive',
      })
    },
    onSuccess() {
      toast({
        title: 'Prayer received',
        description: `Thank you for praying for ${props.name}!`,
      })
      setPrayed(true)
    },
  })

  const form = useForm<z.infer<typeof praySchema>>({
    defaultValues: { id: props.id, num_times_prayed: props.num_times_prayed },
  })

  function onSubmit(values: z.infer<typeof praySchema>) {
    execute(values)
  }

  return (
    <div className='bg-muted p-4 rounded-md flex flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold'>{props.name}</h2>
        <div className='flex gap-2 items-center '>
          {props.num_times_prayed > 0 ? (
            <span className='text-xs'>
              Prayed for{' '}
              <span className='font-bold'>{props.num_times_prayed}</span> time
              {props.num_times_prayed > 1 && 's'}.
            </span>
          ) : (
            <span className='text-xs'>Be the first to pray for this!</span>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <LoaderButton
                variant={'outline'}
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
      <p className='text-sm'>{props.prayerRequest.slice(3, -5)}</p>
    </div>
  )
}
