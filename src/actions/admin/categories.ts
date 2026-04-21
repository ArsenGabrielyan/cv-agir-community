"use server"
import { currentUser, getIsAdmin } from "@/lib/auth"
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { db } from "@/lib/db";
import { ResumeTemplateCategory } from "@db";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/lib/ip";
import { getTranslations } from "next-intl/server";
import { getResumeTemplateCategoryById } from "@/data/resumes";
import { getCategoryFormSchema } from "@/schemas/admin";
import { CategoryFormType } from "@/lib/types/schemas";

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

export async function createCategory(values: CategoryFormType) {
     const validationMsg = await getTranslations("validations.category-name")
     const validatedFields = getCategoryFormSchema(validationMsg).safeParse(values);
     const errMsg = await getTranslations("error-messages");
     const successMsg = await getTranslations("success-messages.category")
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
                    route: "server-action:categories"
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
                    route: "server-action:categories",
                    method: "POST",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const {name} = validatedFields.data
     const data = await db.resumeTemplateCategory.create({
          data: { name }
     })
     await logAction({
          userId: user.id,
          action: "CATEGORY_CREATED",
          metadata: {
               ip,
               categoryId: data.id
          }
     })
     return {success: successMsg("create"), data}
}

export async function editCategory(id: string, values: CategoryFormType){
     const validationMsg = await getTranslations("validations.category-name")
     const validatedFields = getCategoryFormSchema(validationMsg).safeParse(values);
     const errMsg = await getTranslations("error-messages");
     const successMsg = await getTranslations("success-messages.category")
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
                    route: "server-action:categories"
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
                    route: "server-action:categories",
                    method: "PUT",
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const {name} = validatedFields.data
     const data = await db.resumeTemplateCategory.update({
          where: { id },
          data: { name }
     });
     await logAction({
          userId: user.id,
          action: "CATEGORY_UPDATED",
          metadata: { ip, categoryId: data.id }
     })
     return {success: successMsg("edit"), data}
}

export async function deleteCategory(id: string){
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
          return {error: errMsg("auth.unauthorized")}
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:categories",
                    method: "DELETE"
               }
          })
          return {error: errMsg("auth.noAdminAccess")}
     }
     const currCategory = await getResumeTemplateCategoryById(id);
     if(!currCategory){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("content.noCategory"),
               }
          })
          return {error: errMsg("content.noCategory")}
     }
     const data = await db.resumeTemplateCategory.delete({
          where: { id }
     })
     await logAction({
          userId: user.id,
          action: "CATEGORY_DELETED",
          metadata: { ip, categoryId: data.id }
     })
     return {success: true, data}
}