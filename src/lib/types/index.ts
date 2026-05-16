import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { LangCodeType } from "@/i18n/types";
import { CoverLetterSteps, Features, ResumeSteps } from "./enums";
import { ColumnDef } from "@tanstack/react-table";

export type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
export interface IFeature{
     feature: Features,
     Icon: LucideIconType
}
export type RouteFN<T> = (lang: LangCodeType) => T
type CrudFnAction = "create" | "update" | "delete"
export type CrudFN<T,U extends CrudFnAction> = (data: T, type: Exclude<CrudFnAction,U>) => void;

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
     headerElement?: React.JSX.Element
}
export interface IDashboardCount {
     count: number,
     difference: number
}
export interface IMonthlyActivity {
     date: string,
     resumes: number,
     coverLetters: number,
     users: number,
     templates: number,
     categories: number
}