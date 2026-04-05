import { TFunction } from "@/i18n/types";
import { AUDIT_QUICK_FILTERS } from "@/lib/constants";
import { AuditLogServerData, AuditMetadata, AuditMetadataMap, CategorySecondaryKeys, TypedAuditRecord } from "@/lib/types/admin";
import { AuditAction } from "@db";

function asTypedAuditRecord<A extends AuditAction>(
     record: AuditLogServerData,
     action: A
): TypedAuditRecord<A> {
     return {
          ...record,
          action,
          metadata: record.metadata as unknown as AuditMetadata<A>,
     };
}

export function maskEmail(email: string): string {
     const [local, domain] = email.split("@");
     if (!local || !domain) return email;
   
     const visiblePart = local[0];
     const maskedPart = "*".repeat(Math.max(local.length - 1, 1));
     
     return `${visiblePart}${maskedPart}@${domain}`;
}

export const maskText = (text: string, length = 100) => text.length > length ? text.slice(0,length)+"..." : text;

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

function buildMetadataFromDB<A extends keyof AuditMetadataMap>(metadata: AuditMetadata<A>): Partial<AuditMetadata<A>> {
     if (!metadata || typeof metadata !== "object") {
          return {};
     }
     const safe = {} as Partial<AuditMetadata<A>>;
     for (const [key, value] of Object.entries(metadata) as [
          keyof AuditMetadata<A>,
          AuditMetadata<A>[keyof AuditMetadata<A>]
     ][]) {
          switch (key) {
               case "email":
                    safe[key] = maskEmail(String(value)) as Partial<
                         AuditMetadata<A>
                    >[typeof key];
                    break;
               case "reason":
               case "tool":
               case "route":
                    safe[key] = maskText(String(value), 100) as Partial<
                         AuditMetadata<A>
                    >[typeof key];
                    break;
               case "reasons":
                    safe[key] = (
                         Array.isArray(value)
                         ? value.map((r) => maskText(String(r), 100))
                         : [maskText(String(value), 100)]
                    ) as Partial<AuditMetadata<A>>[typeof key];
                    break;
               case "changedFields":
                    case "fields":
                    safe[key] = value as Partial<AuditMetadata<A>>[typeof key];
                    break;
               default:
                    safe[key] = value as Partial<AuditMetadata<A>>[typeof key];
          }
     }
     return safe;
}

export function formatAuditLog(
     data: AuditLogServerData,
     t: TFunction<"audit-log">
) {
     const { user, action, metadata } = asTypedAuditRecord(data, data.action as AuditAction);
     const secondaryKey = getSecondaryKey(action);
     const username = user?.name ?? t("primary.unknown-user");
     const safeMetadata = buildMetadataFromDB(
          metadata as unknown as AuditMetadata<keyof AuditMetadataMap>
     ) as Record<string, unknown>;

     const primaryText =
          action === "TWO_FACTOR_UPDATED"
               ? t("primary.TWO_FACTOR_UPDATED.text", {
                    username,
                    status: (safeMetadata.enabled as boolean | undefined)
                         ? t("primary.TWO_FACTOR_UPDATED.enabled")
                         : t("primary.TWO_FACTOR_UPDATED.disabled"),
               })
               : t(`primary.${action}`, { username });

     const secondaryText = t(
          `secondary.${secondaryKey ?? "default"}` as Parameters<typeof t>[0],
          safeMetadata as Parameters<typeof t>[1]
     );

     return {
          primaryText,
          secondaryText,
          isError: AUDIT_QUICK_FILTERS.errors.includes(action),
     };
}