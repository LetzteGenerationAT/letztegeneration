import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ringerRouter = createTRPCRouter({
  createRingerNote: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        ringerId: z.string(),
        text: z.string().max(255),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ringerNote.create({
        data: {
          text: input.text,
          ringerId: input.ringerId,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
  getRingerNotesForUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.ringerNote.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          ringer: {
            select: {
              id: true,
              givenName: true,
              familyName: true,
              image: true,
            },
          },
        },
      });
    }),
});
