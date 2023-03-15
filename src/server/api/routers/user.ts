import { UserStatus } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
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
        image: z.string().optional(),
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
  getUsersWithRingerNotesByAttribute: protectedProcedure
    .input(
      z.object({
        attribute: z.string().optional(),
        value: z.string().optional(),
        status: z.nativeEnum(UserStatus),
        amount: z.number().positive(),
      })
    )
    .query(({ ctx, input }) => {
      if (!_.isUndefined(input.attribute) && !_.isUndefined(input.status)) {
        if (input.attribute === "status") {
          return ctx.prisma.user.findMany({
            take: input.amount ?? 25,
            where: {
              status: UserStatus[input.status ?? "Pending"],
            },
            include: {
              _count: {
                select: {
                  ringerNotes: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } else {
          return ctx.prisma.user.findMany({
            take: input.amount ?? 25,
            where: {
              [input.attribute]: {
                contains: input.value ?? "",
              },
            },
            include: {
              _count: {
                select: {
                  ringerNotes: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        }
      }
    }),
  getNewlyRegisteredUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
        },
      },
      include: {
        _count: {
          select: {
            ringerNotes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  }),
  countNewUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
        },
      },
    });
  }),
  countAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.count();
  }),
});
