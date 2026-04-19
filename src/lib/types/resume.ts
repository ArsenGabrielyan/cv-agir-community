import { ExtendedUser } from "@/global";
import { CoverLetterFormType, ResumeFormType } from "./schemas";
import { Prisma } from "@db";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface ResumeArrayFieldProps<TSchema extends FieldValues>{
     form: UseFormReturn<TSchema>,
     index: number,
     remove: (index: number) => void,
     id: string
}
export interface ResumeFormProps{
     resumeData: ResumeFormType,
     setResumeData: React.Dispatch<React.SetStateAction<ResumeFormType>>,
     userData: ExtendedUser,
}
export interface CoverLetterFormProps{
     coverLetterData: CoverLetterFormType,
     setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterFormType>>,
     userData: ExtendedUser,
}
export interface IResumeDynamicFields{
     courses: {
          name: string,
          institution: string,
          startDate: string,
          endDate: string,
     },
     education: {
          degree: string,
          faculty: string,
          startDate: string,
          endDate: string,
          school: string,
          city: string,
     },
     experience: {
          job: string,
          company: string,
          startDate: string,
          endDate: string,
          city: string,
          jobInfo: string
     },
     languages: {
          name: string,
          percentage: number
     },
     links: {
          name: string,
          url: string
     },
     references: {
          fullName: string,
          position: string,
          company: string,
          phone: string,
          email: string,
     },
     skills: {
          name: string,
          percentage: number
     }
}