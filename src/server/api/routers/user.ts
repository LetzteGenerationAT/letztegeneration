import { type UserRole, UserStatus } from "@prisma/client";
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
  getUsersByAttribute: protectedProcedure
    .input(
      z.object({
        attribute: z.string().optional(),
        value: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (input.value === "") {
        return ctx.prisma.user.findMany({
          where: {
            status: {
              equals: UserStatus.Pending,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        });
      }
      return ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              givenName: {
                contains: input.value,
                mode: "insensitive",
              },
            },
            {
              familyName: {
                contains: input.value,
                mode: "insensitive",
              },
            },
            {
              region: {
                contains: input.value,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }),
});
