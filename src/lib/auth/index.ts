import { auth } from "@/auth"
import { ExtendedUser } from "@/global";
import { db } from "../db";

export const currentUser = async (): Promise<ExtendedUser | undefined> => {
     const session = await auth();
     return session?.user
}

export const getIsAdmin = async()=>{
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
}