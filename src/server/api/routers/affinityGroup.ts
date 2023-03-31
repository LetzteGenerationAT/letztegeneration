import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const affinityGroupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().max(255),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.affinityGroup.create({
        data: {
          name: input.name,
        },
      });
    }),
  addMember: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.affinityGroup.update({
        where: { id: input.groupId },
        data: {
          members: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
  removeMember: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.affinityGroup.update({
        where: { id: input.groupId },
        data: {
          members: {
            disconnect: {
              id: input.userId,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.affinityGroup.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.affinityGroup.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
