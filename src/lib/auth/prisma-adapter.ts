import { PrismaClientKnownRequestError } from "@db/runtime/library"
import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters"
import { db } from "../db";
import {mapToAdapterAccount, mapToAdapterUser, mapToVerificationToken} from "@/lib/helpers/maps"

function stripUndefined<T>(obj: T) {
     const data = {} as T
     for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key]
     return { data }
}
export const CustomPrismaAdapter = (p: typeof db): Adapter  => ({
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     async createUser({id,...data}){
          const user = await p.user.create(stripUndefined(data))
          return mapToAdapterUser(user)
     },
     async getUser(id){
          try{
               const user = await p.user.findUnique({
                    where: {id}
               })
               return user ? mapToAdapterUser(user) : null
          } catch {
               return null
          }
     },
     async getUserByEmail(email){
          try{
               const user = await p.user.findUnique({
                    where: {email}
               })
               return user ? mapToAdapterUser(user) : null
          } catch {
               return null
          }
     },
     async getUserByAccount({provider, providerAccountId}) {
          const account = await p.account.findUnique({
               where: { 
                    provider_providerAccountId: {
                         provider, providerAccountId
                    }
               },
               include: { user: true },
          })
          if (!account || !account.user) {
               return null
          }
          return mapToAdapterUser(account.user)
     },
     async updateUser({ id, ...data }){
          const user = await p.user.update({
               where: { id },
               ...stripUndefined(data)
          });
          return mapToAdapterUser(user);
     },
     async deleteUser(id){
          const user = await p.user.delete({ where: { id } });
          return mapToAdapterUser(user);
     },
     async linkAccount(data) {
          const account = await p.account.create({data,include: {user: true}});
          if (!account.user) return null;
          return mapToAdapterAccount(account)
     },
     async unlinkAccount(provider_providerAccountId) {
          const account = await p.account.delete({
               where: { provider_providerAccountId },
               include: {user: true}
          })
          return mapToAdapterAccount(account)
     },
     async getSessionAndUser(sessionToken) {
          const userAndSession = await p.session.findUnique({
               where: { sessionToken },
               include: { user: true },
          })
          if (!userAndSession) return null
          const { user, ...session } = userAndSession
          return { user, session } as { user: AdapterUser; session: AdapterSession }
     },
     createSession: (data) => p.session.create(stripUndefined(data)),
     updateSession: (data) => p.session.update({
          where: { sessionToken: data.sessionToken },
          ...stripUndefined(data),
     }),
     deleteSession: (sessionToken) => p.session.delete({ where: { sessionToken } }),
     async createVerificationToken(data) {
          const verificationToken = await p.verificationToken.create({
               data: {
                    email: data.identifier,
                    token: data.token,
                    expires: data.expires
               }
          })
          return mapToVerificationToken(verificationToken)
     },
     async useVerificationToken(identifier_token) {
          try {
               const verificationToken = await p.verificationToken.delete({
                    where: {
                         email_token: {
                              email: identifier_token.identifier,
                              token: identifier_token.token
                         }
                    },
               })
               return mapToVerificationToken(verificationToken)
          } catch (error: unknown) {
               if (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
                    return null
               throw error
          }
     },
     async getAccount(providerAccountId, provider) {
          const account = await p.account.findFirst({
               where: { providerAccountId, provider },
               include: {user: true}
          })
          return account ? mapToAdapterAccount(account) : null
     },
     async createAuthenticator(data) {
          return p.authenticator.create(stripUndefined(data))
     },
     async getAuthenticator(credentialID) {
          return p.authenticator.findUnique({
               where: { credentialID },
          })
     },
     async listAuthenticatorsByUserId(userId) {
          return p.authenticator.findMany({
               where: { userId },
          })
     },
     async updateAuthenticatorCounter(credentialID, counter) {
          return p.authenticator.update({
               where: { credentialID },
               data: { counter },
          })
     },
})