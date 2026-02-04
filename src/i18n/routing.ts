import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
     locales,
     defaultLocale,
     localePrefix: {
          mode: "as-needed",
     },
     localeDetection: true
})
 
/*
 * Lightweight wrappers around Next.js' navigation
 * APIs that consider the routing configuration
 */
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);