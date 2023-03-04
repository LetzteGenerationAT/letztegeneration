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
          user: {
            connect: {
              id: input.userId,
            },
          },
          ringer: {
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  deleteOwnRingerNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.ringerNote.delete({
        where: {
          id: input.id,
        },
        include: {
          ringer: {
            select: {
              id: true,
            },
          },
        },
      });
    }),
});
