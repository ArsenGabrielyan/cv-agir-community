import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "@/lib/env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const absoluteUrl = (path?: string) => !path ? env.NEXT_PUBLIC_APP_URL : `${env.NEXT_PUBLIC_APP_URL}${path}`