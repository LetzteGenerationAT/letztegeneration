import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "~/server/api/routers/user";
import { ringerRouter } from "~/server/api/routers/ringer";
import { eventRouter } from "~/server/api/routers/event";
import { affinityGroupRouter } from "~/server/api/routers/affinityGroup";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  ringer: ringerRouter,
  event: eventRouter,
  affinityGroup: affinityGroupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
