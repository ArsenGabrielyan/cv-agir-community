"use server"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getResumeFormSchema } from "@/schemas"
import { ResumeFormType } from "@/schemas/types"
import {del, put} from "@vercel/blob"
import path from "path"
import { getCurrentResumeByUserId, getResumeCountByUserId } from "@/data/resumes"
import { getIpAddress } from "@/actions/ip"
import { logAction } from "@/data/logs"
import { getTranslations } from "next-intl/server"

export const saveResume = async(values: ResumeFormType,templateId?: string) => {
     const {id} = values
     const currIp = await getIpAddress();
     const validationMsg = await getTranslations("validations");
     const validatedFields = getResumeFormSchema(validationMsg).safeParse(values);
     const errMsg = await getTranslations("error-messages");
     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0]),
               }
          })
          throw new Error(errMsg("validationError"))
     }
     const {profileImg, experience, education, courses, links, references, skills, languages, ...resumeValues} = validatedFields.data

     const user = await currentUser();

     if(!user || !user.id){
          await logAction({
               action: 'UNAUTHORIZED',
               metadata: {
                    ip: currIp,
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }

     const existingResume = id ? await getCurrentResumeByUserId(user.id,id) : null;

     if(id && !existingResume){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("content.noResume")
               }
          })
          throw new Error(errMsg("content.noResume"))
     }
     let newImgUrl: string | undefined | null = undefined;

     if(profileImg instanceof File){
          if(existingResume?.profileImg){
               await del(existingResume.profileImg)
          }
          const blob = await put(`resume-photos/${path.extname(profileImg.name)}`,profileImg,{
               access: "public"
          });
          newImgUrl = blob.url
     } else if(profileImg===null){
          if(existingResume?.profileImg){
               await del(existingResume.profileImg)
          }
          newImgUrl = null;
     }

     if(id){
          await logAction({
               userId: user.id,
               action: "RESUME_UPDATED",
               metadata: {
                    ip: currIp,
                    resumeId: id
               }
          })
          return db.resume.update({
               where: {id},
               data: {
                    ...resumeValues,
                    profileImg: newImgUrl,
                    templateId: !templateId ? null : templateId,
                    experience: {
                         deleteMany: {},
                         create: experience?.map(exp=>({
                              ...exp,
                              startDate: exp?.startDate ? new Date(exp.startDate) : undefined,
                              endDate: exp?.endDate ? new Date(exp.endDate) : undefined
                         })),
                    },
                    education: {
                         deleteMany: {},
                         create: education?.map(edu=>({
                              ...edu,
                              startDate: edu?.startDate ? new Date(edu.startDate) : undefined,
                              endDate: edu?.endDate ? new Date(edu.endDate) : undefined
                         }))
                    },
                    courses: {
                         deleteMany: {},
                         create: courses?.map(course=>({
                              ...course,
                              startDate: course?.startDate ? new Date(course.startDate) : undefined,
                              endDate: course?.endDate ? new Date(course.endDate) : undefined
                         }))
                    },
                    references: {
                         deleteMany: {},
                         create: references
                    },
                    links: {
                         deleteMany: {},
                         create: links
                    },
                    skills: {
                         deleteMany: {},
                         create: skills
                    },
                    languages: {
                         deleteMany: {},
                         create: languages
                    },
                    updatedAt: new Date()
               }
          })
     } else {
          const t = await getTranslations("dashboard.resumes")
          const newResume = await db.resume.create({
               data: {
                    ...resumeValues,
                    profileImg: newImgUrl,
                    templateId: !templateId ? null : templateId,
                    experience: {
                         create: experience?.map(exp=>({
                              ...exp,
                              startDate: exp?.startDate ? new Date(exp.startDate) : undefined,
                              endDate: exp?.endDate ? new Date(exp.endDate) : undefined
                         })),
                    },
                    education: {
                         create: education?.map(edu=>({
                              ...edu,
                              startDate: edu?.startDate ? new Date(edu.startDate) : undefined,
                              endDate: edu?.endDate ? new Date(edu.endDate) : undefined
                         }))
                    },
                    courses: {
                         create: courses?.map(course=>({
                              ...course,
                              startDate: course?.startDate ? new Date(course.startDate) : undefined,
                              endDate: course?.endDate ? new Date(course.endDate) : undefined
                         }))
                    },
                    references: { create: references },
                    links: { create: links },
                    skills: { create: skills },
                    languages: { create: languages },
                    title: resumeValues.title || t("default-title"),
                    userId: user.id,
                    updatedAt: new Date(),
               }
          })
          await logAction({
               userId: user.id,
               action: 'RESUME_CREATED',
               metadata: { ip: currIp, resumeId: newResume.id }
          })
          return newResume
     }
}