import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your_username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch("https://server.aptech.io/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data?.loggedInUser) {
            throw new Error(data.message || "Invalid credentials");
          }

          return {
            id: data.loggedInUser.id,
            name: data.loggedInUser.name,
            email: data.loggedInUser.email,
            avatar: data.loggedInUser.avatar,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          } as UserType;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = (user as UserType).avatar;
        token.accessToken = (user as UserType).accessToken;
        token.refreshToken = (user as UserType).refreshToken;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        avatar: token.avatar as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      return session;
    },
  },
};

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends UserType {}
  interface Session {
    user: UserType & {
      accessToken?: string;
    };
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends UserType {}
}
