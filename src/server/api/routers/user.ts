import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.coerce.string().optional(),
        givenName: z.string().optional(),
        familyName: z.string().optional(),
        pronouns: z.string().optional(),
        region: z.string().optional(),
        possibleSupportRoles: z.string().optional(),
        protestDegree: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: input,
      });
    }),
});
