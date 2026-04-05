import AdminContent from "@/components/admin";
import { db } from "@/lib/db";
import { cache } from "react";

const getResumeCount = cache(()=>db.resume.count())
const getCoverLetterCount = cache(()=>db.coverLetter.count())
const getTemplatesCount = cache(()=>db.resumeTemplate.count())
const getCategoriesCount = cache(()=>db.resumeTemplateCategory.count())
const getUsersCount = cache(()=>db.user.count())

export default async function AdminPage(){
     const [cvCount, clCount, templateCount, categoryCount, usersCount] = await Promise.all([
          getResumeCount(),
          getCoverLetterCount(),
          getTemplatesCount(),
          getCategoriesCount(),
          getUsersCount()
     ])
     return (
          <AdminContent
               cvCount={cvCount}
               clCount={clCount}
               templateCount={templateCount}
               categoryCount={categoryCount}
               usersCount={usersCount}
          />
     )
}