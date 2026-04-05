import AdminContent from "@/components/admin";
import { db } from "@/lib/db";

export default async function AdminPage(){
     const [cvCount, clCount, templateCount, categoryCount, usersCount] = await Promise.all([
          db.resume.count(),
          db.coverLetter.count(),
          db.resumeTemplate.count(),
          db.resumeTemplateCategory.count(),
          db.user.count()
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