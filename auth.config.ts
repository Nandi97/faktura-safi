import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Session } from '@auth/core/types';
import GithubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();
const authConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		CredentialProvider({
			credentials: {
				email: {
					type: 'email',
				},
				password: {
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				const user = {
					id: '1',
					name: 'John',
					email: credentials?.email as string,
				};
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	pages: {
		signIn: '/', //sigin page
	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async session({ session, user, token }) {
			// Ensure `user.id` is a string and matches the expected `Session` type.
			return {
				...session,
				user: {
					...(session.user ?? {}),
					id: token.id as string, // Ensure this is a string.
					email: token.email ?? '',
				},
			} as Session;
		},
		jwt: async ({ token, account, user }) => {
			if (account && user) {
				token.accessToken = account.access_token;
				token.id = user.id as string; // Ensure this is a string.
				token.email = user.email ?? '';
				token.image = user.image ?? '';
			}
			return token;
		},
	},
} satisfies NextAuthConfig;

export default authConfig;
