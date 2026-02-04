"use server"
import { getGenerateDescriptionSchema, getGenerateLetterBodySchema, getGenerateSummarySchema } from "@/schemas/ai"
import { GenerateDescriptionInput, GenerateLetterBodyInput, GenerateSummaryInput, WorkExperienceType } from "@/schemas/types"
import {getLanguageLevel} from "@/lib/helpers"
import gemini from "@/lib/gemini"
import { AI_MODEL, GEN_CONFIG } from "@/lib/constants"
import { currentUser } from "@/lib/auth"
import DOMPurify from "isomorphic-dompurify"
import { checkLimiter, clearLimiter, incrementLimiter } from "@/lib/limiter"
import { logAction } from "@/data/logs"
import { maskText } from "@/lib/helpers/audit-logs"
import { getIpAddress } from "./ip"
import { getTranslations } from "next-intl/server"

export const generateSummary = async(input: GenerateSummaryInput) => {
     const user = await currentUser();
     const currIp = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip: currIp,
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     const validationMsg = await getTranslations("validations");
     const validatedFields = getGenerateSummarySchema(validationMsg).safeParse(input);
     if(!validatedFields.success){
          await logAction({
               userId: user.id,
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0]),
               }
          })
          throw new Error(errMsg("validationError"))
     }
     const limiterKey = `ai:${user.id || await getIpAddress()}`;
     if(checkLimiter(limiterKey,10)){
          await logAction({
               userId: user.id,
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip: currIp,
                    route: limiterKey
               }
          })
          throw new Error(errMsg("rateLimitError"))
     }

     const t = await getTranslations("ai");
     const {jobTitle, education, experience, skills, languages} = validatedFields.data

     const sysMsg = `You're a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data. Only return the summary and don't include any other info in the response. Keep it concise, professional, and return the data in ${t("instructions-language")}. Maximum 70 words and Short.`;

     const langLevels = await getTranslations("doc-preview.lang-levels")

     const userMessage = t("gen-summary-msg",{
          jobTitle: jobTitle || "N/A",
          experience: experience?.map(exp=>t("experience-msg",{
               job: exp.job || "N/A",
               company: exp.company || "N/A",
               startDate: exp.startDate || "N/A",
               endDate: exp.endDate || t("today"),
               jobInfo: exp.jobInfo || "N/A"
          })
          ).join("\n\n") || "",
          education: education?.map(edu=>t("edu-msg",{
               degree: edu.degree || "N/A",
               school: edu.school || "N/A",
               faculty: edu.faculty || "N/A",
               startDate: edu.startDate || "N/A",
               endDate: edu.endDate || t("today")
          })).join("\n\n") || "",
          skills: skills?.map(skill=>skill.name).join(", ") || "",
          languages: languages?.map(lang=>t("lang-msg",{
               name: `${lang.name} (locale)` || "N/A",
               percentage: lang.percentage ? langLevels(getLanguageLevel(lang.percentage)) : "N/A"
          })).join(", ") ||""
     });

     const model = gemini.getGenerativeModel({
          model: AI_MODEL,
          systemInstruction: sysMsg
     });

     const chatSession = model.startChat({
          generationConfig: GEN_CONFIG(),
          history: []
     })
     const result = await chatSession.sendMessage(userMessage);
     const auditLogTxt = await getTranslations("audit-log.ai");

     const aiResponse = result.response.text()

     if(!aiResponse){
          incrementLimiter(limiterKey,60_000)
          await logAction({
               userId: user.id,
               action: "AI_ERROR",
               metadata: {
                    tool: auditLogTxt("desc-gen"),
                    ip: currIp,
                    input: maskText(userMessage,50),
                    reason: errMsg("ai.answerError")
               }
          })
          throw new Error(errMsg("ai.answerError"))
     }
     clearLimiter(limiterKey)
     await logAction({
          userId: user.id,
          action: "AI_SUMMARY_GENERATED",
          metadata: { ip: currIp }
     })
     return DOMPurify.sanitize(aiResponse,{
          ALLOWED_TAGS: ["b", "i", "strong", "p", "ul", "li", "br"],
          ALLOWED_ATTR: [],
     })
}

export const generateWorkExperience = async(input: GenerateDescriptionInput) => {
     const user = await currentUser();
     const currIp = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip: currIp,
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     const validationMsg = await getTranslations("validations");
     const validatedFields = getGenerateDescriptionSchema(validationMsg).safeParse(input);
     if(!validatedFields.success){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("ai.invalidExperienceInput")
               }
          })
          throw new Error(errMsg("ai.invalidExperienceInput"))
     }
     const limiterKey = `ai:${user.id || await getIpAddress()}`;
     if(checkLimiter(limiterKey,10)){
          await logAction({
               userId: user.id,
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip: currIp,
                    route: limiterKey
               }
          })
          throw new Error(errMsg("rateLimitError"))
     }

     const t = await getTranslations("ai");
     const {description} = validatedFields.data;

     const sysMsg = `
     You're a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
     Your response must adhere to the following structure. You can omit fields if they can't be infered from the provided data, but don't add any new ones. Reply in ${t("instructions-language")} and format the Description as a Markdown Format.

     Job Title: <job title>
     Company Name: <company name>
     Start Date: <format: YYYY-MM-DD> (only if provided)
     End Date: <format: YYYY-MM-DD> (only if provided)
     Description: <an optimized description in bullet format might be infered from the job title
     `

     const userMessage = t("work-exp-msg",{ description })

     const model = gemini.getGenerativeModel({
          model: AI_MODEL,
          systemInstruction: sysMsg
     });

     const chatSession = model.startChat({
          generationConfig: GEN_CONFIG("application/json"),
          history: []
     })
     const result = await chatSession.sendMessage(userMessage);
     const auditLogTxt = await getTranslations("audit-log.ai");
     const aiResponse = result.response.text()

     if(!aiResponse){
          incrementLimiter(limiterKey,60_000)
          await logAction({
               userId: user.id,
               action: "AI_ERROR",
               metadata: {
                    tool: auditLogTxt("exp-gen"),
                    ip: currIp,
                    input: maskText(userMessage,50),
                    reason: errMsg("ai.answerError")
               }
          })
          throw new Error(errMsg("ai.answerError"))
     }
     clearLimiter(limiterKey)
     const parsed = JSON.parse(aiResponse)[0];

     const responseObj = {
          job: parsed["Job Title"] || "",
          company: parsed["Company Name"] || "",
          jobInfo: DOMPurify.sanitize(parsed["Description"],{
               ALLOWED_TAGS: ["b", "i", "strong", "p", "ul", "li", "br"],
               ALLOWED_ATTR: [],
          }) || "",
          startDate: parsed["Start Date"] || "",
          endDate: parsed["End Date"] || "",
     } satisfies WorkExperienceType
     await logAction({
          userId: user.id,
          action: "AI_EXPERIENCE_GENERATED",
          metadata: { ip: currIp }
     })
     return responseObj
}

export const generateCoverLetterBody = async(input: GenerateLetterBodyInput) => {
     const user = await currentUser();
     const currIp = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip: currIp,
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     const validationMsg = await getTranslations("validations");
     const validatedFields = getGenerateLetterBodySchema(validationMsg).safeParse(input);
     if(!validatedFields.success){
          await logAction({
               userId: user.id,
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0]),
               }
          })
          throw new Error(errMsg("validationError"))
     }
     const limiterKey = `ai:${user.id || await getIpAddress()}`;
     if(checkLimiter(limiterKey,10)){
          await logAction({
               userId: user.id,
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip: currIp,
                    route: limiterKey
               }
          })
          throw new Error(errMsg("rateLimitError"))
     }

     const t = await getTranslations("ai");
     const {jobTitle, fname, lname, recipientName, recipientTitle} = validatedFields.data

     const sysMsg = `You're a job cover letter generator AI. Your task is to write a professional cover letter given the user's provided data and recipient's data. Only return the cover letter in markdown and make 3-4 paragraphs explaining why this user is perfect candidate for a specific job. Keep it concise, professional, avoid headings, and return the data in ${t("instructions-language")}.`;

     const userMessage = t("cover-letter-body-msg",{
          fname: fname || "N/A",
          lname: lname || "N/A",
          jobTitle: jobTitle || "N/A",
          recipientName: recipientName || "N/A",
          recipientTitle: recipientTitle || "N/A"
     });

     const model = gemini.getGenerativeModel({
          model: AI_MODEL,
          systemInstruction: sysMsg
     });

     const chatSession = model.startChat({
          generationConfig: GEN_CONFIG(),
          history: []
     })
     const result = await chatSession.sendMessage(userMessage);
     const auditLogTxt = await getTranslations("audit-log.ai");
     const aiResponse = result.response.text()

     if(!aiResponse){
          incrementLimiter(limiterKey,60_000)
          await logAction({
               userId: user.id,
               action: "AI_ERROR",
               metadata: {
                    tool: auditLogTxt("letter-gen"),
                    input: maskText(userMessage,50),
                    ip: currIp,
                    reason: errMsg("ai.answerError")
               }
          })
          throw new Error(errMsg("ai.answerError"))
     }
     clearLimiter(limiterKey)
     await logAction({
          userId: user.id,
          action: "AI_COVER_LETTER_GENERATED",
          metadata: { ip: currIp }
     })
     return DOMPurify.sanitize(aiResponse,{
          ALLOWED_TAGS: ["b", "i", "strong", "p", "ul", "li", "br"],
          ALLOWED_ATTR: [],
     })
}