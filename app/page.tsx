'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useServerAction } from 'zsa-react'
import { sharePrayerRequestAction } from './actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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

const prayerRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  shareInstructions: z.string({
    required_error: 'Please select an email to display.',
  }),
  prayerRequest: z.string().max(400),
})

export default function Home() {
  const { toast } = useToast()

  const { execute, isPending, error } = useServerAction(
    sharePrayerRequestAction,
    {
      onError({ err }) {
        toast({
          title: 'Something went wrong',
          description: err.message,
          variant: 'destructive',
        })
      },
    },
  )

  const form = useForm<z.infer<typeof prayerRequestSchema>>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      shareInstructions: '',
      prayerRequest: '',
    },
  })

  function onSubmit(values: z.infer<typeof prayerRequestSchema>) {
    execute(values)
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-12'>
      <ModeToggle />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex space-x-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
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
              name='name'
              render={({ field }) => (
                <FormItem>
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
          <div className='flex space-x-3'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please...</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='share'>Share this</SelectItem>
                      <SelectItem value='anoymous'>
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
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Uh-oh, we couldn&apos;t log you in</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton isLoading={isPending} className='w-full' type='submit'>
            Share your prayer request
          </LoaderButton>
        </form>
      </Form>
    </div>
  )
}
