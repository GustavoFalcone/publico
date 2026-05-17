import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react/adapters";

export const authClient = createAuthClient(
  (import.meta as any).env.VITE_NEON_AUTH_URL || "https://ep-aged-flower-acltw4ff.neonauth.sa-east-1.aws.neon.tech/neondb/auth",
  {
    adapter: BetterAuthReactAdapter(),
  }
);

export const { signIn, signUp, signOut, useSession } = authClient;
