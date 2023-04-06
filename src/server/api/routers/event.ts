import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string().max(255),
        description: z.string().max(255),
        date: z.string().datetime(),
        location: z.string().max(255),
        maxAttendees: z.number().min(1).max(1000),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          name: input.name,
          description: input.description,
          date: input.date,
          location: input.location,
          maxAttendees: input.maxAttendees,
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  updateEvent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().max(255),
        description: z.string().max(255),
        date: z.string().datetime(),
        location: z.string().max(255),
        maxAttendees: z.number().min(1).max(1000),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          date: input.date,
          location: input.location,
          maxAttendees: input.maxAttendees,
        },
      });
    }),
  deleteEvent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAllEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
      include: {
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      take: 5, // TODO: REMOVE THIS
    });
  }),
  addAttendance: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          attendees: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  revokeAttendance: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          attendees: {
            disconnect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
