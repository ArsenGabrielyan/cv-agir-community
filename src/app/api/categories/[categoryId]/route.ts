import { getResumeTemplateCategoryById } from "@/data/resumes";
import { currentUser, getIsAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { ResumeTemplateCategory } from "@db";
import { withAuth } from "@/lib/auth/api";
import { getTranslations } from "next-intl/server";

export const GET = withAuth<{params: Promise<{categoryId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url
               }
          })
          return new NextResponse(errMsg("auth.unauthorized"),{ status: 401 })
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: req.url,
                    method: req.method,
               }
          })
          return new NextResponse(errMsg("auth.noAdminAccess"),{ status: 401 })
     }
     const {categoryId} = await params
     const data = await getResumeTemplateCategoryById(categoryId)
     return NextResponse.json(data)
})

export const PUT = withAuth<{params: Promise<{categoryId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url
               }
          })
          return new NextResponse(errMsg("auth.unauthorized"),{ status: 401 })
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: req.url,
                    method: req.method,
               }
          })
          return new NextResponse(errMsg("auth.noAdminAccess"),{ status: 401 })
     }
     const {categoryId} = await params
     const {name}: ResumeTemplateCategory = await req.json()
     const data = await db.resumeTemplateCategory.update({
          where: {
               id: categoryId
          },
          data: {
               name
          }
     });
     await logAction({
          userId: user.id,
          action: "CATEGORY_UPDATED",
          metadata: { ip, categoryId }
     })
     return NextResponse.json(data)
})

export const DELETE = withAuth<{params: Promise<{categoryId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url
               }
          })
          return new NextResponse(errMsg("auth.unauthorized"),{ status: 401 })
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: req.url,
                    method: req.method,
               }
          })
          return new NextResponse(errMsg("auth.noAdminAccess"),{ status: 401 })
     }
     const {categoryId} = await params;
     const currCategory = await getResumeTemplateCategoryById(categoryId);
     if(!currCategory){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("content.noCategory"),
               }
          })
          return new NextResponse(errMsg("content.noCategory"),{ status: 404 })
     }
     const data = await db.resumeTemplateCategory.delete({
          where: {
               id: categoryId
          }
     })
     await logAction({
          userId: user.id,
          action: "CATEGORY_DELETED",
          metadata: { ip, categoryId }
     })
     return NextResponse.json(data)
})