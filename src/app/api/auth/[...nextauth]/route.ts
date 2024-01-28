import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

import User from '@models/User';
import {connectToDB} from '@utils/database';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],

  async session({session}: any) {
    const sessionUser = await User.findOne({email: session.user.email});

    session.user.id = sessionUser?._id.toString();

    return session;
  },

  async signIn({profile}: any) {
    try {
      await connectToDB();

      // check if user exists
      const userExists = await User.findOne({email: profile.email});

      // if not, create user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
        });

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
