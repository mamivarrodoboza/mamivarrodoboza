/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import Users from '../../../models/user-model';
import dbConnect from '../../../lib/dbConnect';

const signInUser = async ({ password, user }) => {
  await dbConnect();
  if (!user.password) {
    throw new Error('Ne hagyja üresen a jelszó mezőt!');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Hibás jelszó vagy felhasználónév!');
  }

  return user;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Jelszó', type: 'Jelszó!123' },
      },
      async authorize(credentials, req) {
        const { email } = credentials;
        const { password } = credentials;
        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error('Még nem regisztrált');
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
    /*  FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }), */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  database: process.env.DB_URI,
  pages: {
    signIn: '/auth/signin',
    /* signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest) */
  },
});
