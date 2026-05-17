import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: (import.meta as any).env.VITE_NEON_AUTH_URL || "https://ep-aged-flower-acltw4ff.neonauth.sa-east-1.aws.neon.tech/neondb/auth"
});

export const { signIn, signUp, signOut, useSession } = authClient;
