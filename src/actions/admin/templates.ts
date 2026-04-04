"use server"
import { getIsAdmin, currentUser } from "@/lib/auth"
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { db } from "@/lib/db";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { getTranslations } from "next-intl/server";
import { templateDataInclude, TemplateServerData } from "@/lib/types/resume";
import { getResumeTemplateById } from "@/data/resumes";
import { notFound } from "next/navigation";

export async function getTemplateList(searchParams: IAdminAPISearchParams<TemplateServerData>){
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: { ip, route: "server-action:templates" }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: { ip, route: "server-action:templates", method: "GET" }
          })
          throw new Error(errMsg("auth.noAdminAccess"))
     }
     const {filter,sort,range} = searchParams;
     const orderbyClause = sort && Array.isArray(sort) && sort.length===2 ? {[sort[0]]: sort[1].toLowerCase()} : undefined;
     const data = await db.resumeTemplate.findMany({
          where: {
               name: {
                    contains: filter?.name ?? "",
                    mode: 'insensitive'
               },
               categoryId: filter?.categoryId
          },
          include: templateDataInclude,
          ...(orderbyClause ? {orderBy: orderbyClause} : {})
     });
     return range ? data.slice(range[0],range[1]+1) : data
}

export async function getTemplateById(id: string) {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:templates",
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {  ip, route: "server-action:templates", method: "GET" }
          })
          throw new Error(errMsg("auth.noAdminAccess"))
     }
     const data = await getResumeTemplateById(id);
     return data
}