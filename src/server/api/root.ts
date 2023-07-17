// import { sendingRouter } from "~/server/api/routers/sending";
import { createTRPCRouter } from "~/server/api/trpc";
import { capsuleRouter } from "./routers/capsule";
import { likesRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";
import { paymentRouter } from "./routers/payment";
import { userRouter } from "./routers/user";
import { uploaderRouter } from "./routers/uploader";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  capsule: capsuleRouter,
  // sending: sendingRouter,
  like: likesRouter,
  comment: commentRouter,
  payment: paymentRouter,
  user: userRouter,
  uploader: uploaderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
