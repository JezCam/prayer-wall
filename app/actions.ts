'use server'

import { unauthenticatedAction } from '@/lib/safe-action'
import {
  prayForRequestUseCase,
  sharePrayerRequestUseCase,
} from '@/use-cases/prayer-requests'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export const sharePrayerRequestAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().min(10),
      share_instructions: z.string(),
      prayer_request: z.string().max(400),
    }),
  )
  .handler(async ({ input }) => {
    sharePrayerRequestUseCase(
      input.name,
      input.email,
      input.phone,
      input.share_instructions,
      input.prayer_request,
    )
    // Add a delay (e.g., 2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))
    revalidatePath('')
  })

export const prayForRequestAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.number(),
      num_times_prayed: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    prayForRequestUseCase(input.id, input.num_times_prayed)
    // Add a delay (e.g., 2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))
    revalidatePath('')
  })
