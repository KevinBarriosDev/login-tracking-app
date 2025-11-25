import { betterAuth } from "better-auth"

let authInstance: ReturnType<typeof betterAuth> | null = null

export function getAuth() {
  if (!authInstance) {
    authInstance = betterAuth({
      database: {
        provider: "postgres",
        url: process.env.DATABASE_URL!,
      },
      emailAndPassword: {
        enabled: true,
      },
      secret: process.env.BETTER_AUTH_SECRET!,
      baseURL: process.env.BETTER_AUTH_URL!,
    })
  }
  return authInstance
}

export type Session = any // Simplificado para evitar errores de build
