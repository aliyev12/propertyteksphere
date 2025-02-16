import NextAuth from "next-auth";

declare var process: {
  env: {
    MONGO_USER: string;
    MONGO_PASS: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_API_DOMAIN: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_URL_INTERNAL: string;
    NEXTAUTH_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY: string;
  };
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
  }
}
