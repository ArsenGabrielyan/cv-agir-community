import en from 'ra-language-english';
import { TranslationMessages } from "react-admin";

const auditLogTranslations = {
     "audit-log-keywords": {
          auth: {
               LOGIN_ERROR: "%{username} encountered an error while logging in.",
               LOGIN_SUCCESS: "%{username} has logged in to this app.",
               PASSWORD_CHANGE_REQUEST: "%{username} wants to change their password.",
               PASSWORD_CHANGE_ERROR: "%{username} encountered an error while changing their password (before changing their password).",
               PASSWORD_CHANGED: "%{username} has changed their password to a new password.",
               VERIFICATION_REQUEST: "%{username} wants to verify their email address.",
               VERIFICATION_ERROR: "%{username} encountered an error while verifying their email address.",
               EMAIL_VERIFIED: "%{username} has verified their email address.",
               USER_REGISTERED: "%{username} has registered for this app.",
               REGISTRATION_ERROR: "%{username} encountered an error while signing up.",
               TWO_FACTOR_VERIFIED: "%{username}'s two-factor authentication was successful.",
               LOGOUT: "%{username} has logged out of this app.",
               OAUTH_SIGNIN: "%{username} has signed in to this app using a different method.",
               FAILED_2FA_ATTEMPT: "%{username}'s two-factor authentication failed."
          },
          content: {
               COVER_LETTER_DELETED: "%{username} has deleted the specified cover letter.",
               COVER_LETTER_CREATED: "%{username} has created a new cover letter.",
               COVER_LETTER_UPDATED: "%{username} has updated the specified cover letter.",
               RESUME_DELETED: "%{username} has deleted the specified resume.",
               RESUME_CREATED: "%{username} has created a new resume.",
               RESUME_UPDATED: "%{username} has updated the specified resume.",
               CV_PAGE_VIEWED: "%{username} has viewed the resume's general information."
          },
          ai: {
               AI_ERROR: "An error occurred while generating %{username} using AI.",
               AI_SUMMARY_GENERATED: "%{username} generated a description using AI.",
               AI_EXPERIENCE_GENERATED: "%{username} generated a work experience using AI.",
               AI_COVER_LETTER_GENERATED: "%{username} generated a cover letter using AI."
          },
          captcha: {
               CONTACT_FORM_SUBMISSION_ERROR: "%{username} encountered an error while sending a message.",
               INVALID_CAPTCHA: "%{username}'s captcha verification failed.",
               CONTACT_FORM_SUBMITTED: "%{username} has sent a message."
          },
          settings: {
               ACCOUNT_UPDATED: "%{username}'s settings have been updated.",
               TWO_FACTOR_UPDATED: {
                    "text": "%{username} has %{status} two-step verification the next time they sign in.",
                    "enabled": "enabled",
                    "disabled": "disabled"
               },
               EMAIL_CHANGE_REQUEST: "%{username} wants to change his/her email address."
          },
          admin: {
               TEMPLATE_CREATED: "%{username} added a new resume template.",
               TEMPLATE_UPDATED: "%{username} updated the specified resume template.",
               TEMPLATE_DELETED: "%{username} deleted the specified resume template.",
               CATEGORY_CREATED: "%{username} added a new category.",
               CATEGORY_UPDATED: "%{username} updated the specified category.",
               CATEGORY_DELETED: "%{username} deleted the specified category."
          },
          forms: {
               VALIDATION_ERROR: "%{username} attempted to perform the action without validating.",
               RATE_LIMIT_EXCEEDED: "%{username} is attempting this action too often.",
               ACTION_ERROR: "%{username} encountered an error while performing an action.",
               UNAUTHORIZED: "%{username} attempted to perform an action without being logged in.",
               NO_ADMIN_ACCESS: "%{username} attempted to use administrator actions without permission."
          },
          misc: "%{username} performed the action \"%{action}\".",
          "unknown-user": "Unknown User"
     },
     "audit-log-secondary-texts": {
          auth: {
               error: "IP: %{ip}, Email: %{email}, Reason: %{reason}",
               success: "IP: %{ip}, Email: %{email}",
               email: "Email: %{email}",
               oauth: "Email: %{email}, Method: %{provider}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          content: {
               coverLetter: "IP: %{ip}, Cover Letter: %{coverLetterId}",
               resume: "IP: %{ip}, Resume: %{resumeId}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          ai: {
               aiError: "IP: %{ip}, Action: %{tool}, Reason: %{reason}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          captcha: {
               invalidCaptcha: "IP: %{ip}, Reasons: %{reasons}",
               Submitted: "IP: %{ip}, Message has %{messageLength} characters.",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          settings: {
               accountUpdated: "IP: %{ip}, Changed fields: %{changedFields}.",
               emailChangeReq: "IP: %{ip}, New email address: %{newEmail}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          admin: {
               template: "IP: %{ip}, Template: %{templateId}",
               category: "IP: %{ip}, Category: %{categoryId}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          forms: {
               invalidFields: "Fields that are not valid: %{fields}",
               rateLimit: "IP: %{ip}, Action location: %{route}",
               unauthorized: "IP: %{ip}, Page where the error occurred: %{route}",
               noAdmin: "IP: %{ip}, Destination: %{route}, Method: %{route}",
               default: "IP: %{ip}",
               defaultError: "IP: %{ip}, Reason: %{reason}"
          },
          default: "IP: %{ip}",
          defaultError: "IP: %{ip}, Reason: %{reason}"
     }
}

const englishTranslation: TranslationMessages = {
     ...en,
     ...auditLogTranslations,
     resources: {
          categories: {
               name: 'Category |||| Categories',
               fields: {
                    id: "ID",
                    name: "Category Name",
                    createdAt: "Date Created",
                    updatedAt: "Date Modified"
               }
          },
          templates: {
               name: 'Template |||| Templates',
               fields: {
                    id: "ID",
                    locale: "Language",
                    name: "Name",
                    description: "Description",
                    categoryId: "Category",
                    imageName: "Image Name",
                    htmlTemplate: "HTML",
                    cssStyle: "CSS",
                    createdAt: "Date Created",
                    updatedAt: "Date Modified"
               }
          },
          logs: {
               name: "Audit Log",
               fields: {
                    fromDate: "Start Date",
                    toDate: "End Date",
                    "action-errors": "Errors",
                    "action-auth": "Authentication",
                    "action-coverLetter": "Cover Letters",
                    "action-resume": "Resumes",
                    "action-ai": "Artificial Intelligence",
                    "action-app": "App Actions",
                    "action-template": "Templates",
                    "action-category": "Categories",
               }
          }
     },
     dashboard: {
          title: "Welcome to the Admin Dashboard",
          desc: "Here, administrators can manage categories and templates, and moderators can monitor the content of this web app to keep things safe.",
          goBack: "Back to the App"
     },
     tabs: {
          info: "Information",
          htmlTemplate: "HTML",
          cssStyle: "CSS",
     }
}

export default englishTranslation