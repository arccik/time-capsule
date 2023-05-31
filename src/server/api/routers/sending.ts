// import { z } from "zod";
// import sendEmail from "~/lib/emailTransporter";
// import {
//   createTRPCRouter,
//   publicProcedure,
//   protectedProcedure,
// } from "~/server/api/trpc";

// export const sendingRouter = createTRPCRouter({
// vioEmail: protectedProcedure
//   .input(z.object({ email: z.string() }))
//   .mutation(async ({ ctx, input }) => {
//     return await sendEmail();
//   }),
// vioPost: protectedProcedure
//   .input(z.object({ address: z.string() }))
//   .query(({ ctx, input }) => {}),
// vioSms: protectedProcedure
//   .input(z.object({ phone: z.string() }))
//   .query(({ ctx, input }) => {}),
// vioWhatsapp: protectedProcedure
//   .input(z.object({ phone: z.string() }))
//   .query(({ ctx, input }) => {}),
// vioCall: protectedProcedure
//   .input(z.object({ phone: z.string() }))
//   .query(({ ctx, input }) => {}),
// });
