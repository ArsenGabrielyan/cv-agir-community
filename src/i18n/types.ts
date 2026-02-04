import hyLanding from "../../i18n/hy/landing-page.json"
import hyCommon from "../../i18n/hy/common.json"
import hyForm from "../../i18n/hy/form.json"
import hyEmailTemplates from "../../i18n/hy/email-templates.json"
import hyDashboard from "../../i18n/hy/dashboard.json"
import hyEditor from "../../i18n/hy/editor.json"
import { messages } from "./config"

export type LangCodeType = 'en' | 'hy';
type CountryCodeType = 'us' | 'am';
export interface ILanguage{
     code: LangCodeType,
     countryCode: CountryCodeType,
     label: string
}
export type MessageSchema = (
     typeof hyLanding &
     typeof hyCommon &
     typeof hyForm &
     typeof hyEmailTemplates &
     typeof hyDashboard &
     typeof hyEditor
)
export type Messages = typeof messages[number]