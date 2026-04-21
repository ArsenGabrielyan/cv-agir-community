import { SettingsType } from "./schemas";
import { AuditAction, ResumeTemplate, ResumeTemplateCategory } from "@db";
import { AuditLogServerData } from "./server";

// Admin filter types
export type QuickFilterType = "errors" | "auth" | "coverLetter" | "resume" | "ai" | "app" | "template" | "category"
export type AuditActionKey = `action-${QuickFilterType}`
export type IAdminAPISearchParams<T> = T extends ResumeTemplate | ResumeTemplateCategory ? {
     filter?: T,
     range?: [number, number],
     sort?: [keyof T, "DESC" | "ASC"]
} : {
     filter: Record<AuditActionKey,AuditAction[]> & Partial<{
          q: string,
          fromDate: Date,
          toDate: Date,
     }>
}
export interface IAdminSearchParams{
     query?: string,
     page?: string,
     pageSize?: string
}
export type AuditLogSearchType = Record<AuditAction, string>
export type AuditLogSearchAction = AuditAction | keyof AuditLogSearchType

// Audit Logging
export interface ActionIPResult{ ip: string | null }
type AuthActionResult<T extends "email-optional" | "email-required" = "email-optional"> = T extends "email-optional" ? {email?: string, ip: string | null} : {email: string, ip: string | null}
type ContentActionResult<T extends "resume" | "cover-letter" | "template" | "category"> = (T extends "resume" ? {resumeId: string} : T extends "cover-letter" ? {coverLetterId: string} : T extends "template" ? {templateId: string} : T extends "category" ? {categoryId: string} : {id: string}) & ActionIPResult
export interface AuditMetadataMap{
     [AuditAction.LOGIN_ERROR]: AuthActionResult & {reason: string},
     [AuditAction.LOGIN_SUCCESS]: AuthActionResult,
     [AuditAction.PASSWORD_CHANGE_REQUEST]: {email: string}
     [AuditAction.PASSWORD_CHANGE_ERROR]: AuthActionResult & {reason: string}
     [AuditAction.PASSWORD_CHANGED]: AuthActionResult<"email-required">,
     [AuditAction.VERIFICATION_REQUEST]: {email: string},
     [AuditAction.VERIFICATION_ERROR]: AuthActionResult & {reason: string}
     [AuditAction.EMAIL_VERIFIED]: {email: string},
     [AuditAction.USER_REGISTERED]: AuthActionResult<"email-required">,
     [AuditAction.REGISTRATION_ERROR]: AuthActionResult & {reason: string},
     [AuditAction.TWO_FACTOR_VERIFIED]: AuthActionResult
     [AuditAction.LOGOUT]: AuthActionResult
     [AuditAction.OAUTH_SIGNIN]: {email: string, provider: string}
     [AuditAction.FAILED_2FA_ATTEMPT]: AuthActionResult<"email-required"> & {reason: string}
     // Content
     [AuditAction.COVER_LETTER_CREATED]: ContentActionResult<"cover-letter">,
     [AuditAction.COVER_LETTER_UPDATED]: ContentActionResult<"cover-letter">,
     [AuditAction.COVER_LETTER_DELETED]: ContentActionResult<"cover-letter">,
     [AuditAction.RESUME_CREATED]: ContentActionResult<"resume">,
     [AuditAction.RESUME_UPDATED]: ContentActionResult<"resume">,
     [AuditAction.RESUME_DELETED]: ContentActionResult<"resume">,
     [AuditAction.CV_PAGE_VIEWED]: { resumeId: string; viewerIp: string | null },
     // AI
     [AuditAction.AI_ERROR]: ActionIPResult & {tool: string, input?: string, reason: string},
     [AuditAction.AI_SUMMARY_GENERATED]: ActionIPResult
     [AuditAction.AI_EXPERIENCE_GENERATED]: ActionIPResult
     [AuditAction.AI_COVER_LETTER_GENERATED]: ActionIPResult
     // Contact Form
     [AuditAction.CONTACT_FORM_SUBMISSION_ERROR]: ActionIPResult & {reason: string},
     [AuditAction.CONTACT_FORM_SUBMITTED]: ActionIPResult & { messageLength: number}
     [AuditAction.INVALID_CAPTCHA]: ActionIPResult & {score: number, reasons?: string[]}
     // Settings
     [AuditAction.ACCOUNT_UPDATED]: ActionIPResult & {changedFields: (keyof SettingsType)[]}
     [AuditAction.TWO_FACTOR_UPDATED]: ActionIPResult & {enabled: boolean};
     [AuditAction.EMAIL_CHANGE_REQUEST]: ActionIPResult & {newEmail: string}
     // Admin
     [AuditAction.TEMPLATE_CREATED]: ContentActionResult<"template">,
     [AuditAction.TEMPLATE_UPDATED]: ContentActionResult<"template">,
     [AuditAction.TEMPLATE_DELETED]: ContentActionResult<"template">,
     [AuditAction.TEMPLATE_BULK_DELETE]: ActionIPResult & {count: number, templateIds: string[]},
     [AuditAction.CATEGORY_CREATED]: ContentActionResult<"category">,
     [AuditAction.CATEGORY_UPDATED]: ContentActionResult<"category">,
     [AuditAction.CATEGORY_DELETED]: ContentActionResult<"category">,
     // Forms
     [AuditAction.VALIDATION_ERROR]: {fields: (string | number)[]},
     [AuditAction.RATE_LIMIT_EXCEEDED]: ActionIPResult & {route: string}
     [AuditAction.ACTION_ERROR]: ActionIPResult & {reason: string},
     [AuditAction.NO_ADMIN_ACCESS]: ActionIPResult & {route?: string, method: "GET" | "POST" | "PUT" | "DELETE"}
     [AuditAction.UNAUTHORIZED]: ActionIPResult & {route?: string}
}
export type AuditMetadata<A extends AuditAction> = A extends keyof AuditMetadataMap ? AuditMetadataMap[A] : undefined

export type CategorySecondaryKeys = {
    auth: "error" | "success" | "email" | "oauth";
    content: "coverLetter" | "resume";
    ai: "aiError";
    captcha: "invalidCaptcha" | "Submitted" | "defaultError";
    settings: "accountUpdated" | "emailChangeReq" | "default";
    admin: "template" | "category";
    forms: "invalidFields" | "rateLimit" | "unauthorized" | "noAdmin" | "defaultError";
    misc: "default" | "defaultError";
};
export type TypedAuditRecord<A extends AuditAction> = Omit<AuditLogServerData, "action" | "metadata"> & {
     action: A;
     metadata: AuditMetadata<A>;
};