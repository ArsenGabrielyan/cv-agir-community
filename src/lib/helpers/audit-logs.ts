import { AUDIT_QUICK_FILTERS } from "@/lib/constants";
import { AuditLogServerData, CategorySecondaryKeys } from "@/lib/types";
import { AuditAction } from "@db";
import { TranslateFunction } from "react-admin";

export function maskEmail(email: string): string {
     const [local, domain] = email.split("@");
     if (!local || !domain) return email;
   
     const visiblePart = local[0];
     const maskedPart = "*".repeat(Math.max(local.length - 1, 1));
     
     return `${visiblePart}${maskedPart}@${domain}`;
}

export const maskText = (text: string, length = 100) => text.length > length ? text.slice(0,length)+"..." : text;

export function getActionCategory(action: string) {
     if (
          action.startsWith("LOGIN_") ||
          action.startsWith("LOGOUT") ||
          action.startsWith("PASSWORD_") ||
          action.startsWith("VERIFICATION_") ||
          action.startsWith("USER_") ||
          action.startsWith("TWO_FACTOR") ||
          action === "EMAIL_VERIFIED"
     )
          return "auth";

     if (action.startsWith("AI_")) return "ai";

     if (action.startsWith("CATEGORY_")) return "admin";
     if (action.startsWith("TEMPLATE_")) return "admin";

     if (
          action.startsWith("COVER_LETTER_") ||
          action.startsWith("RESUME_") ||
          action === "CV_PAGE_VIEWED"
     )
          return "content";

     if (action.startsWith("CONTACT_") || action.startsWith("INVALID_CAPTCHA"))
          return "captcha";

     if (action.startsWith("ACCOUNT_") || action.startsWith("EMAIL_CHANGE_"))
          return "settings";

     if (
          action.startsWith("VALIDATION_") ||
          action.startsWith("RATE_LIMIT") ||
          action.startsWith("ACTION_ERROR") ||
          action.startsWith("UNAUTHORIZED") ||
          action.startsWith("NO_ADMIN_ACCESS")
     )
          return "forms";

     return "misc";
}

function buildSafeMetadata(metadata: unknown) {
     if (!metadata || typeof metadata !== "object") return {};
     const safe: Record<string,unknown> = {};
     for (const [key, value] of Object.entries(metadata)) {
          switch (key) {
               case "email":
                    safe.email = maskEmail(String(value));
                    break;
               case "reason":
               case "tool":
               case "route":
                    safe[key] = maskText(String(value), 100);
                    break;
               case "reasons":
                    safe[key] = Array.isArray(value)
                         ? value.map((r) => maskText(String(r), 100)).join(", ")
                         : maskText(String(value), 100);
                    break;
               case "changedFields":
               case "fields":
                    safe[key] = Array.isArray(value) 
                         ? value.join(", ") 
                         : String(value);
                    break;
               default:
                    safe[key] = value;
          }
     }
     return safe;
}

export function getSecondaryKey(
     action: AuditAction
): CategorySecondaryKeys[keyof CategorySecondaryKeys] | null {
     // AUTH
     if (["LOGIN_ERROR", "PASSWORD_CHANGE_ERROR", "REGISTRATION_ERROR", "VERIFICATION_ERROR"].includes(action))
          return "error";
     if (["LOGIN_SUCCESS", "LOGOUT", "TWO_FACTOR_VERIFIED", "PASSWORD_CHANGED"].includes(action))
          return "success";
     if (action === "OAUTH_SIGNIN") return "oauth";
     if (["PASSWORD_CHANGE_REQUEST", "EMAIL_VERIFIED", "VERIFICATION_REQUEST"].includes(action))
          return "email";

     // CONTENT
     if (action.startsWith("COVER_LETTER_")) return "coverLetter";
     if (action.startsWith("RESUME_") || action === "CV_PAGE_VIEWED") return "resume";

     // AI
     if (action === "AI_ERROR") return "aiError";

     // CAPTCHA / CONTACT
     if (action === "INVALID_CAPTCHA") return "invalidCaptcha";
     if (action === "CONTACT_FORM_SUBMITTED") return "Submitted";
     if (action === "CONTACT_FORM_SUBMISSION_ERROR") return "defaultError";

     // SETTINGS
     if (action === "ACCOUNT_UPDATED") return "accountUpdated";
     if (action === "EMAIL_CHANGE_REQUEST") return "emailChangeReq";
     if (action === "TWO_FACTOR_UPDATED") return "default";

     // ADMIN
     if (action.startsWith("TEMPLATE_")) return "template";
     if (action.startsWith("CATEGORY_")) return "category";

     // FORMS
     if (action === "VALIDATION_ERROR") return "invalidFields";
     if (action === "RATE_LIMIT_EXCEEDED") return "rateLimit";
     if (action === "UNAUTHORIZED") return "unauthorized";
     if (action === "NO_ADMIN_ACCESS") return "noAdmin";
     if (action === "ACTION_ERROR") return "defaultError";

     return null;
}

export function getFormattedAuditLog(record: AuditLogServerData, t: TranslateFunction) {
     const { user, action, metadata } = record;
     const category = getActionCategory(action);
     const secondaryKey = getSecondaryKey(action);
     const username = user?.name ?? t("audit-log-keywords.unknown-user");
     
     if (!t(`audit-log-keywords.${category}.${action}`)) {
          console.warn(`[i18n missing] audit-log-keywords.${category}.${action}`);
     }
     if (secondaryKey && !t(`audit-log-secondary-texts.${category}.${secondaryKey}`)) {
          console.warn(`[Missing i18n key]: audit-log-secondary-texts.${category}.${secondaryKey}`);
     }
     // Special handling for TWO_FACTOR_UPDATED
     let primaryText: string;
     if (action === "TWO_FACTOR_UPDATED") {
          if (!t(`audit-log-keywords.${category}.${action}.text`)) {
               console.warn(`[i18n missing] audit-log-keywords.${category}.${action}.text`);
          }
          const safeMetadata = buildSafeMetadata(metadata);
          const enabled = (safeMetadata.enabled as boolean) ?? false;
          const status = enabled 
               ? t("audit-log-keywords.settings.TWO_FACTOR_UPDATED.enabled")
               : t("audit-log-keywords.settings.TWO_FACTOR_UPDATED.disabled");
          
          primaryText = t("audit-log-keywords.settings.TWO_FACTOR_UPDATED.text", {
               username,
               status,
          });
     } else {
          primaryText = t(`audit-log-keywords.${category}.${action}`, {
               username,
               action,
          });
     }

     const safeMetadata = buildSafeMetadata(metadata);
     const secondaryText = category && secondaryKey
          ? t?.(`audit-log-secondary-texts.${category}.${secondaryKey}`, safeMetadata)
          ?? t?.("audit-log-secondary-texts.defaultError", safeMetadata)
          : t?.("audit-log-secondary-texts.defaultError", safeMetadata);

     const isError = AUDIT_QUICK_FILTERS.errors.includes(action);

     return { primaryText, secondaryText, isError };
}