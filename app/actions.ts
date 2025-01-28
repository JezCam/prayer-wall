import { unauthenticatedAction } from '@/lib/safe-action'
import { z } from 'zod'

export const sharePrayerRequestAction = unauthenticatedAction
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ input }) => {
    return
  })
