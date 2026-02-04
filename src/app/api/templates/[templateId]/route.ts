import { getResumeTemplateById } from "@/data/resumes";
import { currentUser, getIsAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { ResumeTemplate } from "@db";
import { withAuth } from "@/lib/auth/api";
import { getTranslations } from "next-intl/server";

export const GET = withAuth<{params: Promise<{templateId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url,
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
     const {templateId} = await params
     const data = await getResumeTemplateById(templateId);
     return NextResponse.json(data)
})

export const PUT = withAuth<{params: Promise<{templateId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url,
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
     const {templateId} = await params
     const {name, description, imageName, htmlTemplate, cssStyle, categoryId}: ResumeTemplate = await req.json();
     const data = await db.resumeTemplate.update({
          where: {
               id: templateId
          },
          data: {
               name,
               description,
               imageName,
               htmlTemplate,
               cssStyle,
               categoryId,
          }
     });
     await logAction({
          userId: user.id,
          action: 'TEMPLATE_UPDATED',
          metadata: {ip, templateId}
     })
     return NextResponse.json(data)
})

export const DELETE = withAuth<{params: Promise<{templateId: string}>}>(async(req, {params}) => {
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: req.url,
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
     const {templateId} = await params
     const currTemplate = await getResumeTemplateById(templateId);
     if(!currTemplate){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("content.noTemplate")
               }
          })
          return new NextResponse(errMsg("content.noTemplate"),{ status: 400 })
     }
     const data = await db.resumeTemplate.delete({
          where: {
               id: templateId
          }
     })
     await logAction({
          userId: user.id,
          action: 'TEMPLATE_DELETED',
          metadata: {ip, templateId}
     })
     return NextResponse.json(data)
})