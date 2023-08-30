import { env } from "~/env.mjs";
import { z } from "zod";
import { transporter } from "~/lib/emailTransporter";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sendingRouter = createTRPCRouter({
  email: publicProcedure
    .input(
      z.object({ email: z.string(), subject: z.string(), text: z.string() })
    )
    .mutation(async ({ input }) => {
      const { email, subject, text } = input;
      const response = await transporter.sendMail({
        from: email,
        to: env.EMAIL_FROM,
        subject,
        text,
      });
      console.log("TRPCC RESPONSE :>>> ", response);
    }),
});
