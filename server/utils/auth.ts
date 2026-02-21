import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db'
import * as schema from '../db/schema'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NUXT_PUBLIC_APP_URL ?? 'http://localhost:3001',
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'AWAM',
        input: false
      },
      bahagian: {
        type: 'string',
        required: false,
        input: false
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7 // 7 days
  },
  trustedOrigins: [
    process.env.NUXT_PUBLIC_APP_URL ?? 'http://localhost:3001'
  ]
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
