"use server"
import { currentUser, getIsAdmin } from "@/lib/auth"
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { db } from "@/lib/db";
import { ResumeTemplateCategory } from "@db";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { getTranslations } from "next-intl/server";
import { getResumeTemplateCategoryById } from "@/data/resumes";

export async function getCategoriesList(searchParams: IAdminAPISearchParams<ResumeTemplateCategory>){
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:categories"
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:categories",
                    method: "GET",
               }
          })
          throw new Error(errMsg("auth.noAdminAccess"))
     }
     const {filter, range, sort} = searchParams;
     const orderbyClause = sort && Array.isArray(sort) && sort.length===2 ? {[sort[0]]: sort[1].toLowerCase()} : undefined;
     const data = await db.resumeTemplateCategory.findMany({
          where: {
               name: {
                    contains: filter?.name ?? "",
                    mode: 'insensitive'
               }
          },
          ...(orderbyClause ? {orderBy: orderbyClause} : {})
     });
     return range ? data.slice(range[0],range[1]+1) : data;
}

export async function getCategoryById(id: string){
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:categories",
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:categories",
                    method: "GET",
               }
          })
          throw new Error(errMsg("auth.noAdminAccess"))
     }
     const data = await getResumeTemplateCategoryById(id)
     return data
}