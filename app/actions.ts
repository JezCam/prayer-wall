import { unauthenticatedAction } from '@/lib/safe-action'
import { sharePrayerRequestUseCase } from '@/use-cases/prayer-requests'
import { z } from 'zod'

export const sharePrayerRequestAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().min(10),
      shareInstructions: z.string(),
      prayerRequest: z.string().max(400),
    }),
  )
  .handler(async ({ input }) => {
    sharePrayerRequestUseCase(
      input.name,
      input.email,
      input.phone,
      input.shareInstructions,
      input.prayerRequest,
    )
    return
  })
