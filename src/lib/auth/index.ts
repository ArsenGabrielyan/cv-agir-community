import { auth } from "@/auth"
import { ExtendedUser } from "@/global";
import { db } from "../db";
import { cache } from "react";

export const currentUser = cache(async (): Promise<ExtendedUser | undefined> => {
     const session = await auth();
     return session?.user
})

export const getIsAdmin = cache(async()=>{
     const user = await currentUser();
     if(!user || !user.id) return false;
     const adminUser = await db.user.findUnique({
          where: {
               id: user.id
          },
          select: {
               isAdmin: true,
          }
     })
     return !!adminUser && adminUser.isAdmin
})