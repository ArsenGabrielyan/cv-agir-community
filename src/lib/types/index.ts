import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { LangCodeType } from "@/i18n/types";
import { CoverLetterSteps, Features, ResumeSteps } from "./enums";
import { ColumnDef } from "@tanstack/react-table";

export interface IFeature{
     feature: Features,
     Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
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
export interface DataTableProps<TData> {
     columns: ColumnDef<TData>[]
     data: TData[],
     searchColumn?: string,
     headerElement?: React.JSX.Element
}