import am from "./am-base"
import { TranslationMessages } from "react-admin";

const auditLogTranslations = {
     "audit-log-keywords": {
          auth: {
               LOGIN_ERROR: "%{username}-ը մուտք գործման ընթացքում սխալ առաջացավ։",
               LOGIN_SUCCESS: "%{username}-ը մուտք գործեց այս հավելվածին։",
               PASSWORD_CHANGE_REQUEST: "%{username}-ը ուզում է փոխել իր գաղտնաբառը։",
               PASSWORD_CHANGE_ERROR: "%{username}-ի գաղտնաբառը փոխելու ընթացքում (գաղտնաբառը փոխելուց առաջ) սխալ առաջացավ։",
               PASSWORD_CHANGED: "%{username}-ը փոխել է իր գաղտնաբառը նոր գաղտնաբառով։",
               VERIFICATION_REQUEST: "%{username}-ը ուզում է հաստատել իր էլ․ հասցեն",
               VERIFICATION_ERROR: "%{username}-ի էլ․ հասցեն հաստատման ընթացքում առաջացել է սխալ։",
               EMAIL_VERIFIED: "%{username}-ը հաստատել է իր էլ․ հասցեն։",
               USER_REGISTERED: "%{username}-ը գրանցվել է այս հավելվածը",
               REGISTRATION_ERROR: "%{username}-ը գրանցվելու ընթացքում առաջացել է սխալ։",
               TWO_FACTOR_VERIFIED: "%{username}-ի երկաստիճան վավերացումը ստացվել է։",
               LOGOUT: "%{username}-ը դուրս եկավ այս հավելվածից։",
               OAUTH_SIGNIN: "%{username}-ը մուտք գործեց այս հավելվածին ուրիշ մեթոդով։",
               FAILED_2FA_ATTEMPT: "%{username}-ի երկաստիճան վավերացումը չստացվեց։"
          },
          content: {
               COVER_LETTER_DELETED: "%{username}-ը ջնջել է նշված ուղեկցող նամակը։",
               COVER_LETTER_CREATED: "%{username}-ը գրել է նոր ուղեկցող նամակ։",
               COVER_LETTER_UPDATED: "%{username}-ը թարմացրել է նշված ուղեկցող նամակը։",
               RESUME_DELETED: "%{username}-ը ջնջել է նշված ռեզյումեն։",
               RESUME_CREATED: "%{username}-ը ստեղծել է նոր ռեզյումե։",
               RESUME_UPDATED: "%{username}-ը թարմացրել է նշված ռեզյումեն։",
               CV_PAGE_VIEWED: "%{username}-ը դիտել է ռեզյումեի ընդհանուր ինֆորմացիան։"
          },
          ai: {
               AI_ERROR: "%{username}-ը Արհեստական Բանականության միջոցով գեներացրելու ընթացքում սխալ առաջացավ։",
               AI_SUMMARY_GENERATED: "%{username}-ը Արհեստական Բանականության միջոցով գեներացրել է նկարագրություն։",
               AI_EXPERIENCE_GENERATED: "%{username}-ը Արհեստական Բանականության միջոցով գեներացրել է աշխատանքային փորձ։",
               AI_COVER_LETTER_GENERATED: "%{username}-ը Արհեստական Բանականության միջոցով գեներացրել է ուղեկցող նամակ։"
          },
          captcha: {
               CONTACT_FORM_SUBMISSION_ERROR: "%{username}-ը հաղորդագրություն ուղարկելու ընթացքում սխալ առաջացավ։",
               INVALID_CAPTCHA: "%{username}-ի captcha ստուգումը չստացվեց։",
               CONTACT_FORM_SUBMITTED: "%{username}-ը ուղարկել է հաղորդագրություն։"
          },
          settings: {
               ACCOUNT_UPDATED: "%{username}-ի կարգավորումները թարմացված են։",
               TWO_FACTOR_UPDATED: {
                    text: "%{username}-ը %{status} երկաստիճան վավերացումը հաջորդ անգամ մուտք գործելիս։", 
                    enabled: "միացրել է",
                    disabled: "անջատել է"
               },
               EMAIL_CHANGE_REQUEST: "%{username}-ը ւզում է փոխել իր էլ․ հասցեն։"
          },
          admin: {
               TEMPLATE_CREATED: "%{username}-ը ավելացրել է նոր ռեզյումեի շաբլոն։",
               TEMPLATE_UPDATED: "%{username}-ը թարմացել է նշված ռեզյումեի շաբլոնը։",
               TEMPLATE_DELETED: "%{username}-ը ջնջել է նշված ռեզյումեի շաբլոնը։",
               CATEGORY_CREATED: "%{username}-ը ավելացրել է նոր կատեգորիա։",
               CATEGORY_UPDATED: "%{username}-ը թարմացրել է նշված կատեգորիան։",
               CATEGORY_DELETED: "%{username}-ը ջնջել է նշված կատեգորիան։"
          },
          forms: {
               VALIDATION_ERROR: "%{username}-ը փորձել է իրականացնել գործողությունը առանց վավերացնելու։",
               RATE_LIMIT_EXCEEDED: "%{username}-ը շատ հաճախ է փորձում իրականացնել այս գործողություն։",
               ACTION_ERROR: "%{username}-ը գործողություն իրականացնելու ընթացքում սխալ առաջացավ։",
               UNAUTHORIZED: "%{username}-ը փորձել է իրականացնել գործողությունը առանց մուտք գործման",
               NO_ADMIN_ACCESS: "%{username}-ը փորձել է օգտագործել ադմինիստրատորի գործողությունները առանց թույլտվության։"
          },
          misc: "%{username}-ը իրականացրել է «%{action}» գործողությունը։",
          "unknown-user": "«Անհայտ օգտատեր»"
     },
     "audit-log-secondary-texts": {
          auth: {
               error: "IP՝ %{ip}, էլ․ հասցե՝ %{email}, Պատճառ՝ %{reason}",
               success: "IP՝ %{ip}, էլ․ հասցե՝ %{email}",
               email: "Էլ․ հասցե՝ %{email}",
               oauth: "Էլ․ հասցե՝ %{email}, Մեթոդ՝ %{provider}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          content: {
               coverLetter: "IP՝ %{ip}, Ուղեկցող նամակ՝ %{coverLetterId}",
               resume: "IP՝ %{ip}, Ռեզյումե՝ %{resumeId}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          ai: {
               aiError: "IP՝ %{ip}, Գործողություն՝ %{tool}, Պատճառ՝ %{reason}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          captcha: {
               invalidCaptcha: "IP՝ %{ip}, Պատճառներ՝ %{reasons}",
               Submitted: "IP՝ %{ip}, Հաղորդագրությունը ունի %{messageLength} նիշ։",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          settings: {
               accountUpdated: "IP՝ %{ip}, Փոփոխված դաշտեր՝ %{changedFields}։",
               emailChangeReq: "IP՝ %{ip}, Նոր էլ․ հասցե՝ %{newEmail}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          admin: {
               template: "IP՝ %{ip}, Շաբլոն՝ %{templateId}",
               category: "IP՝ %{ip}, Կատեգորիա՝ %{categoryId}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          forms: {
               invalidFields: "Դաշտեր, որոնք վավեր չեն՝ %{fields}",
               rateLimit: "IP՝ %{ip}, Գործողության վայր՝ %{route}",
               unauthorized: "IP՝ %{ip}, էջ, որտեղ առաջացել է սխալը՝ %{route}",
               noAdmin: "IP՝ %{ip}, Գործողության վայր՝ %{route}, Մեթոդ՝ %{route}",
               default: "IP՝ %{ip}",
               defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
          },
          default: "IP՝ %{ip}",
          defaultError: "IP՝ %{ip}, Պատճառ՝ %{reason}"
     }
}

const armenianTranslation: TranslationMessages = {
     ...am,
     ...auditLogTranslations,
     resources: {
          categories: {
               name: 'Կատեգորիա |||| Կատեգորիաներ',
               fields: {
                    id: "#",
                    name: "Կատեգորիայի անուն",
                    createdAt: "Ստեղծվել է",
                    updatedAt: "Թարմացվել է"
               }
          },
          templates: {
               name: 'Շաբլոն |||| Շաբլոններ',
               fields: {
                    id: "#",
                    locale: "Լեզու",
                    name: "Անուն",
                    description: "Նկարագրություն",
                    categoryId: "Կատեգորիա",
                    imageName: "Նկարի անուն",
                    htmlTemplate: "HTML կոդ",
                    cssStyle: "CSS կոդ",
                    createdAt: "Ստեղծվել է",
                    updatedAt: "Թարմացվել է"
               }
          },
          logs: {
               name: "Ակտիվություն",
               fields: {
                    fromDate: "Սկսած ամսաթվից",
                    toDate: "Մինչև ամսաթիվ",
                    "action-errors": "Սխալներ",
                    "action-auth": "Նույնականացում",
                    "action-coverLetter": "Ուղեկցող նամակներ",
                    "action-resume": "Ռեզյումեներ",
                    "action-ai": "Արհեստական բանականություն",
                    "action-app": "Հավելվածի գործողություններ",
                    "action-template": "Շաբլոններ",
                    "action-category": "Կատեգորիաներ",
               }
          }
     },
     dashboard: {
          title: "Բարի գալուստ Ադմինիստրատորի վահանակ",
          desc: "Այստեղ ադմինիստրատորները կարող են կառավարել կատեգորիաները և շաբլոնները, իսկ մոդերատորները կարող են վերահսկել այս վեբ հավելվածի բովանդակությունը՝ իրերը անվտանգ պահելու համար։",
          goBack: "Վերադառնալ Հավելված"
     },
     tabs: {
          info: "Տեղեկություններ",
          htmlTemplate: "HTML կոդ",
          cssStyle: "CSS կոդ",
     }
}

export default armenianTranslation