import { Prisma } from "@db";
import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { LangCodeType } from "@/i18n/types";
import { CoverLetterSteps, Features, ResumeSteps } from "./enums";

export const userInclude = {
     cvPageSettings: true,
} satisfies Prisma.UserInclude
export type UserServerData = Prisma.UserGetPayload<{
     include: typeof userInclude
}>
export interface IFeature{
     feature: Features,
     Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
export type AccountServerData = Prisma.AccountGetPayload<{
     include: {
          user: true
     }
}>
export type RouteFN<T> = (lang: LangCodeType) => T

// Rate limiting and Security
interface ITrackerType{
     count: number,
     expiresAt: number
}
export type TrackerType = Record<string,ITrackerType>
export interface ICaptchaResult{
     success: boolean,
     score: number,
     action: string,
     challenge_ts: string,
     hostname: string,
     "error-codes"?: string[]
}

// Editor Related Types
export interface IEditorStep<Props>{
     component: React.ComponentType<Props>,
     key: ResumeSteps | CoverLetterSteps
}
export interface EditorFormFooterProps<Props>{
     currStep: string,
     setCurrStep: (step: string) => void
     showSmPreview: boolean,
     setShowSmPreview: (show: boolean) => void,
     onPrint: () => void,
     steps: IEditorStep<Props>[]
}