"use server"
import { getIsAdmin, currentUser } from "@/lib/auth"
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { db } from "@/lib/db";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { getTranslations } from "next-intl/server";
import { templateDataInclude, TemplateServerData } from "@/lib/types/resume";
import { getResumeTemplateById } from "@/data/resumes";
import { revalidatePath } from "next/cache";
import { TemplateFormType } from "@/lib/types/schemas";
import { TemplateFormSchema } from "@/schemas/admin";

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

export async function createTemplate(values: TemplateFormType, path: string): Promise<{
     error?: string,
     success?: string
}>{
     const validatedFields = TemplateFormSchema.safeParse(values);
     const errMsg = await getTranslations("error-messages");
     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0]),
               }
          })
          return {error: errMsg("validationError")}
     }
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:templates",
               }
          })
          return {error: errMsg("auth.unauthorized")}
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:templates",
                    method: "POST",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const result = await db.resumeTemplate.create({
          data: { ...validatedFields.data }
     })
     await logAction({
          userId: user.id,
          action: "TEMPLATE_CREATED",
          metadata: {ip, templateId: result.id}
     })
     revalidatePath(path)
     return {success: "Շաբլոնը ստեղծված է"}
}

export async function editTemplate(id: string, values: TemplateFormType, path: string): Promise<{
     error?: string,
     success?: string
}>{
     const validatedFields = TemplateFormSchema.safeParse(values);
     const errMsg = await getTranslations("error-messages");
     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0]),
               }
          })
          return {error: errMsg("validationError")}
     }
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:templates"
               }
          })
          return {error: errMsg("auth.unauthorized")}
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:templates",
                    method: "PUT",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const result = await db.resumeTemplate.update({
          where: { id },
          data: { ...validatedFields.data }
     });
     await logAction({
          userId: user.id,
          action: 'TEMPLATE_UPDATED',
          metadata: {ip, templateId: result.id}
     })
     revalidatePath(path)
     return {success: "Շաբլոնը խմբագրված է"}
}

export async function deleteTemplate(id: string, path: string): Promise<{
     error?: string,
     success?: boolean
}>{
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
          return {error: errMsg("auth.unauthorized")}
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:templates",
                    method: "DELETE",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const currTemplate = await getResumeTemplateById(id);
     if(!currTemplate){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("content.noTemplate")
               }
          })
          return {error: errMsg("content.noTemplate")}
     }
     const data = await db.resumeTemplate.delete({
          where: { id }
     })
     await logAction({
          userId: user.id,
          action: 'TEMPLATE_DELETED',
          metadata: {ip, templateId: data.id}
     })
     revalidatePath(path)
     return {success: true}
}

export async function deleteTemplates(ids: string[], path: string): Promise<{
     error?: string,
     success?: boolean
}> {
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
          return {error: errMsg("auth.unauthorized")}
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:templates",
                    method: "DELETE",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     await db.resumeTemplate.deleteMany({
          where: { id: { in: ids } }
     })
     await logAction({
          userId: user.id,
          action: "TEMPLATE_BULK_DELETE",
          metadata: {ip, count: ids.length, templateIds: ids}
     })
     revalidatePath(path)
     return {success: true}
}