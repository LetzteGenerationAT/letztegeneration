import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string().max(255),
        description: z.string().max(255),
        date: z.date(),
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
        date: z.date(),
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
  getAllEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
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
  //    updateEvent: protectedProcedure
  //     .input(
  //       z.object({
  //         userId: z.string(),
  //         ringerId: z.string(),
  //         text: z.string().max(255),
  //       })
  //     )
  //     .mutation(({ ctx, input }) => {
  //       return ctx.prisma.event.create({
  //         data: {
  //           text: input.text,
  //           user: {
  //             connect: {
  //               id: input.userId,
  //             },
  //           },
  //           ringer: {
  //             connect: {
  //               id: input.ringerId,
  //             },
  //           },
  //         },
  //       });
  //     }),
  //   deleteEvent: protectedProcedure
  //     .input(
  //       z.object({
  //         id: z.string(),
  //       })
  //     )
  //     .mutation(async ({ ctx, input }) => {
  //       return ctx.prisma.event.delete({
  //         where: {
  //           id: input.id,
  //         },
  //         include: {
  //           ringer: {
  //             select: {
  //               id: true,
  //             },
  //           },
  //         },
  //       });
  //     }),

  //   getEvent: protectedProcedure
  //   .input(
  //     z.object({
  //       userId: z.string(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     return ctx.prisma.event.findMany({
  //       where: {
  //         userId: input.userId,
  //       },
  //       include: {
  //         ringer: {
  //           select: {
  //             id: true,
  //             givenName: true,
  //             familyName: true,
  //             image: true,
  //           },
  //         },
  //       },
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     });
  //   }),
});