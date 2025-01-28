import { rateLimitByKey } from "@/lib/limiter";
import { createServerActionProcedure } from "zsa";

export const unauthenticatedAction = createServerActionProcedure()
  .handler(async () => {
    await rateLimitByKey({
      key: `unauthenticated-global`,
      limit: 10,
      window: 10000,
    });
  });