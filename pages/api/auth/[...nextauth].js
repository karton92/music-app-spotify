import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
