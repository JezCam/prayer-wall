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
import { Textarea } from '@/components/ui/textarea'

const prayerRequestSchema = z.object({
  name: z.string({
    required_error: 'Your name is required',
  }),
  email: z
    .string({
      required_error: 'Your email is required',
    })
    .email(),
  phone: z
    .string({
      required_error: 'Your phone is required',
    })
    .min(10, {
      message: 'Invalid phone number',
    }),
  shareInstructions: z.string({
    required_error: 'Please select an email to display.',
  }),
  prayerRequest: z
    .string({
      required_error: 'Please enter your prayer request',
    })
    .max(400),
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
  })

  function onSubmit(values: z.infer<typeof prayerRequestSchema>) {
    execute(values)
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex space-x-3'>
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
            <div className='flex space-x-3'>
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
                name='shareInstructions'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Please...</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an option' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='share'>Share this</SelectItem>
                        <SelectItem value='anoymous'>
                          Share this anonymously
                        </SelectItem>
                        <SelectItem value='nothing'>
                          DO NOT share this
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='prayerRequest'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Your prayer request</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className='w-full'
                      placeholder='Enter your prayer request'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant='destructive'>
                <Terminal className='h-4 w-4' />
                <AlertTitle>Uh-oh, something went wrong.</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <LoaderButton
              isLoading={isPending}
              className='w-full !mt-8'
              type='submit'
            >
              Share your prayer request
            </LoaderButton>
          </form>
        </Form>
      </div>
    </div>
  )
}
