import NextAuth from 'next-auth/next';
import GithubProvider, {GithubProfile} from 'next-auth/providers/github';

import User from '@models/User';
import {connectToDB} from '@utils/database';
import {OAuthConfig} from 'next-auth/providers/oauth';

type AuthOptions = {
  providers: OAuthConfig<GithubProfile>[];
  callbacks: {
    session: any;
    signIn: any;
  };
};

type Session = {
  user: {
    id: string;
    email: string;
  };
};

type Profile = {
  email: string;
  login: string;
  avatar_url: string;
};

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          display: 'popup',
          url: 'https://github.com/login/oauth/authorize',
          scope: 'read:user user:email',
        },
      },
    }),
  ],

  callbacks: {
    async session({session}: {session: Session}) {
      const sessionUser = await User.findOne({email: session.user.email});

      session.user.id = sessionUser?._id.toString();

      return session;
    },

    async signIn({profile}: {profile: Profile}) {
      try {
        await connectToDB();
        if (!profile.email) return 'Email not found';

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
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
