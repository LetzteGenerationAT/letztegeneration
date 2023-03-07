import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"] &
      User;
  }

  interface User {
    status: string;
    phoneNumber: string;
    givenName: string;
    familyName: string;
    image: string;
    region: string;
    supportRoles: string;
    possibleSupportRoles: string;
    role: string;
    protestDegree: string;
    pronouns: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.status = user.status;
        session.user.phoneNumber = user.phoneNumber;
        session.user.givenName = user.givenName;
        session.user.familyName = user.familyName;
        session.user.image = user.image;
        session.user.region = user.region;
        session.user.supportRoles = user.supportRoles;
        session.user.possibleSupportRoles = user.possibleSupportRoles;
        session.user.role = user.role;
        session.user.protestDegree = user.protestDegree;
        session.user.pronouns = user.pronouns;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  pages: {
    signOut: "/",
    verifyRequest: "/auth/verify-request",
    newUser: "/dashboard/profile",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // CognitoProvider({
    //   clientId: env.COGNITO_CLIENT_ID,
    //   clientSecret: env.COGNITO_CLIENT_SECRET,
    //   issuer: env.COGNITO_ISSUER,
    // }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
