"use client"
import { CoverLetter } from "@db"
import { CreateCoverLetterButton } from "../create-buttons"
import CoverLetterCard from "../cover-letters/cl-card"
import { useTranslations } from "next-intl"

interface CoverLetterTabProps{
     coverLetters: CoverLetter[],
     t: ReturnType<typeof useTranslations<"dashboard">>
}
export default function CoverLetterTab({coverLetters, t}: CoverLetterTabProps){
     return (
          <>
               <div className="flex justify-between items-center gap-2 my-4 flex-wrap">
                    <h2 className="text-xl flex-1 sm:flex-none md:text-2xl lg:text-3xl font-semibold mb-3">{t("cover-letters.title")}</h2>
                    <CreateCoverLetterButton className="flex-1 sm:flex-none"/>
               </div>
               <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-3">
                    {coverLetters.map(letter=>(
                         <CoverLetterCard
                              key={letter.id}
                              data={letter}
                         />
                    ))}
               </div>
          </>
     )
}