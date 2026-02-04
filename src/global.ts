import {routing} from '@/i18n/routing';
import { MessageSchema } from '@/i18n/types';

import { CVPageSettings } from "@db"
import type {DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  isTwoFactorEnabled: boolean,
  isOauth: boolean,
  jobTitle?: string,
  phone?: string,
  address?: string,
  summary?: string,
  hobbies?: string,
  cvPageSettings: CVPageSettings
}

declare module "next-auth"{
  interface Session{
    user: ExtendedUser
  }
}

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: MessageSchema
  }
}