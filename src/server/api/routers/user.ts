import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (exist) {
        throw new TRPCError({
          message: "User already exists",
          code: "BAD_REQUEST",
        });
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });
      if (user) {
        return { success: true, user };
      }
    }),
  isExist: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),
});
