import { TranslationMessages } from "react-admin";
import am from "@/i18n/react-admin/hy"
import en from '@/i18n/react-admin/en';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { LangCodeType } from "../types";
import { Locale } from "@db";
import { languages } from "@/i18n/config";

const translations: Record<string,TranslationMessages> = {am, en}
export const getI18nProvider = (locale: LangCodeType) => polyglotI18nProvider(
     locale=>translations[locale],
     locale,
     [
          {locale: "en", name: "English"},
          {locale: "am", name: "Հայերեն"}
     ]
);

export const langChoices: ({
     id: Locale,
     name: string
})[] = languages.map(lang=>({
     id: lang.code,
     name: `${lang.label} (${lang.code})`
}))