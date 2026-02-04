import { AuditAction } from "@db"
import { IResumeDynamicFields, QuickFilterType } from "../../lib/types"

export const ARR_FIELD_INITIAL_VALUES: IResumeDynamicFields = {
     courses: {
          name: "",
          institution: "",
          startDate: "",
          endDate: ""
     },
     education: {
          degree: "",
          faculty: "",
          city: "",
          school: "",
          startDate: "",
          endDate: ""
     },
     experience: {
          city: "",
          job: "",
          company: "",
          jobInfo: "",
          startDate: "",
          endDate: ""
     },
     languages: {
          name: "",
          percentage: 0
     },
     links: {
          name: "",
          url: ""
     },
     references: {
          fullName: "",
          position: "",
          company: "",
          phone: "",
          email: "",
     },
     skills: {
          name: "",
          percentage: 0
     }
}

export const AI_MODEL = "gemini-2.0-flash-lite"

export const GEN_CONFIG = (type = "text/plain") => ({
     temperature: 1,
     topP: 0.95,
     topK: 40,
     maxOutputTokens: 8192,
     responseModalities: [],
     responseMimeType: type,
})
export const AUDIT_QUICK_FILTERS: Record<QuickFilterType,AuditAction[]> = {
     errors: ["NO_ADMIN_ACCESS","UNAUTHORIZED","ACTION_ERROR","RATE_LIMIT_EXCEEDED","VALIDATION_ERROR","INVALID_CAPTCHA","CONTACT_FORM_SUBMISSION_ERROR","AI_ERROR","FAILED_2FA_ATTEMPT","REGISTRATION_ERROR","VERIFICATION_ERROR","PASSWORD_CHANGE_ERROR","LOGIN_ERROR"],
     auth: ["LOGIN_SUCCESS","PASSWORD_CHANGE_REQUEST","PASSWORD_CHANGED","VERIFICATION_REQUEST","EMAIL_VERIFIED","USER_REGISTERED","TWO_FACTOR_VERIFIED","LOGOUT","OAUTH_SIGNIN"],
     coverLetter: ["COVER_LETTER_CREATED","COVER_LETTER_DELETED","COVER_LETTER_UPDATED"],
     resume: ["RESUME_CREATED","RESUME_DELETED","RESUME_UPDATED","CV_PAGE_VIEWED"],
     ai: ["AI_COVER_LETTER_GENERATED","AI_EXPERIENCE_GENERATED","AI_SUMMARY_GENERATED"],
     app: ["CONTACT_FORM_SUBMITTED","ACCOUNT_UPDATED","TWO_FACTOR_UPDATED","EMAIL_CHANGE_REQUEST"],
     template: ["TEMPLATE_CREATED","TEMPLATE_UPDATED","TEMPLATE_DELETED"],
     category: ["CATEGORY_CREATED","CATEGORY_UPDATED","CATEGORY_DELETED"],
}

export const DEFAULT_VIDEO_DIMENSION = 270;
export const STEPS = ["step1", "step2", "step3"] as const