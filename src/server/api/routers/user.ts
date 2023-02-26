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
        phoneNumber: z.coerce.string(),
        givenName: z.string(),
        familyName: z.string(),
        pronouns: z.string(),
        region: z.string(),
        possibleSupportRoles: z.string(),
        protestDegree: z.string(),
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
