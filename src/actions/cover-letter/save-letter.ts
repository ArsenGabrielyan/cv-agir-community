"use server"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCoverLetterFormSchema } from "@/schemas"
import { CoverLetterFormType } from "@/lib/types/schemas"
import {del, put} from "@vercel/blob"
import path from "path"
import { getCurrentCoverLetterByUserId } from "@/data/cover-letters"
import { getIpAddress } from "@/lib/ip"
import { logAction } from "@/data/logs"
import { getTranslations } from "next-intl/server"

export const saveCoverLetter = async(values: CoverLetterFormType) => {
     const {id} = values
     const currIp = await getIpAddress();
     const validationMsg = await getTranslations("validations");
     const validatedFields = getCoverLetterFormSchema(validationMsg).safeParse(values);
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
     const {profileImg, letterDate, ...coverLetterValues} = validatedFields.data

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

     const existingCoverLetter = id ? await getCurrentCoverLetterByUserId(user.id,id) : null;

     if(id && !existingCoverLetter){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("content.noCoverLetter")
               }
          })
          throw new Error(errMsg("content.noCoverLetter"))
     }

     let newImgUrl: string | undefined | null = undefined;

     if(profileImg instanceof File){
          if(existingCoverLetter?.profileImg){
               await del(existingCoverLetter.profileImg)
          }
          const blob = await put(`cl-photos/${path.extname(profileImg.name)}`,profileImg,{
               access: "public"
          });
          newImgUrl = blob.url
     } else if(profileImg===null){
          if(existingCoverLetter?.profileImg){
               await del(existingCoverLetter.profileImg)
          }
          newImgUrl = null;
     }

     if(id){
          await logAction({
               userId: user.id,
               action: "COVER_LETTER_UPDATED",
               metadata: {
                    ip: currIp,
                    coverLetterId: id
               }
          })
          return db.coverLetter.update({
               where: {id},
               data: {
                    ...coverLetterValues,
                    profileImg: newImgUrl,
                    createdAt: letterDate,
                    updatedAt: new Date()
               }
          })
     } else {
          const t = await getTranslations("dashboard.cover-letters")
          const newCoverLetter = await db.coverLetter.create({
               data: {
                    ...coverLetterValues,
                    profileImg: newImgUrl,
                    createdAt: letterDate,
                    title: coverLetterValues.title || t("default-title"),
                    userId: user.id,
                    updatedAt: new Date()
               }
          })
          await logAction({
               userId: user.id,
               action: "COVER_LETTER_CREATED",
               metadata: { ip: currIp, coverLetterId: newCoverLetter.id }
          })
          return newCoverLetter
     }
}