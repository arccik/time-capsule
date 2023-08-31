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
      await transporter.sendMail({
        from: email,
        to: env.EMAIL_FROM,
        subject,
        text: `${text} \n\n Sent from ${email} \n`,
      });
    }),
});
