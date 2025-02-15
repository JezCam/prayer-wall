'use client'

import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useServerAction } from 'zsa-react'
import { sharePrayerRequestAction } from '@/app/prayer-wall/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { LoaderButton } from '@/components/loader-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PrayerRequest } from '@/use-cases/types'

const prayerRequestSchema = z.object({
  name: z
    .string({
      required_error: 'Your name is required.',
    })
    .min(1, {
      message: 'Please enter your name.',
    }),
  email: z
    .string({
      required_error: 'Your email is required.',
    })
    .email(),
  phone: z
    .string({
      required_error: 'Your phone is required.',
    })
    .min(10, {
      message: 'Invalid phone number.',
    }),
  share_instructions: z.string({
    required_error: 'Please select share instructions.',
  }),
  prayer_request: z
    .string({
      required_error: 'Please enter your prayer request.',
    })
    .min(1, {
      message: 'Please enter your prayer request.',
    })
    .max(400),
})

export default function SharePrayerRequestForm(props: {
  onShare: (data: PrayerRequest) => void
  onSuccess: (data: PrayerRequest) => void
}) {
  const [open, setOpen] = useState<boolean>(true)
  const { toast } = useToast()

  const { execute, isPending, error } = useServerAction(
    sharePrayerRequestAction,
    {
      onError({ err }) {
        toast({
          title: 'Something went wrong, please try again.',
          description: err.message,
          variant: 'destructive',
        })
      },
      onSuccess({ data }) {
        toast({
          title: 'Prayer request shared',
          description: 'Thank you for sharing your prayer request!',
        })
        form.reset()
        props.onSuccess(data)
      },
    },
  )

  const form = useForm<z.infer<typeof prayerRequestSchema>>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      share_instructions: 'share',
      prayer_request: '',
    },
  })

  function onSubmit(values: z.infer<typeof prayerRequestSchema>) {
    const data: PrayerRequest = {
      id: Date.now(), // using the date as an optimistic id
      title: {
        rendered: values.name,
      },
      content: {
        rendered: values.prayer_request,
      },
      acf: {
        email: values.email,
        phone: values.phone,
        num_times_prayed: 0,
        share_instructions: values.share_instructions,
      },
      pending: true,
    }
    props.onShare(data)
    execute(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className='space-y-3 md:space-y-6 overflow-clip [transition:height_0.4s_ease-in-out] p-1'
          style={{ height: open ? 'auto' : 0 }}
        >
          <div className='flex flex-col sm:flex-row gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='w-full'
                      placeholder='Enter your name'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Your email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='w-full'
                      placeholder='Enter your email'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Your phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='w-full'
                      placeholder='Enter your phone'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='share_instructions'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Please...</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='share'>Share this</SelectItem>
                      <SelectItem value='anonymous'>
                        Share this anonymously
                      </SelectItem>
                      <SelectItem value='nothing'>DO NOT share this</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='prayer_request'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Your prayer request</FormLabel>
                <FormControl>
                  <>
                    <Textarea
                      {...field}
                      className='w-full'
                      placeholder='Enter your prayer request'
                      rows={4}
                      maxLength={400}
                    />
                    <span className='text-xs text-muted-foreground ml-2'>
                      {400 - form.getValues().prayer_request.length} characters
                      remaining
                    </span>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && (
          <Alert variant='destructive'>
            <Terminal className='h-4 w-4' />
            <AlertTitle>Uh-oh, something went wrong.</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <LoaderButton
          isLoading={isPending}
          className='w-full !mt-4 font-semibold'
          type='submit'
          size='lg'
          onClick={e => {
            if (!open) {
              e.preventDefault()
              e.stopPropagation()
            }
            setOpen(true)
          }}
        >
          Share your prayer request
        </LoaderButton>
      </form>
    </Form>
  )
}
