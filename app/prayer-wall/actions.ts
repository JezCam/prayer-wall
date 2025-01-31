'use server'

import { unauthenticatedAction } from '@/lib/safe-action'
import {
  prayForRequestUseCase,
  sharePrayerRequestUseCase,
} from '@/use-cases/prayer-requests'
import { PrayerRequest } from '@/use-cases/types'
import { z } from 'zod'

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
  .handler(async ({ input }): Promise<PrayerRequest> => {
    return await sharePrayerRequestUseCase(
      input.name,
      input.email,
      input.phone,
      input.share_instructions,
      input.prayer_request,
    )
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
  })
