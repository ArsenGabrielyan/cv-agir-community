import AdminContent from "@/admin";
import { getAdminData } from "@/data/admin";

export default async function AdminPage(){
     const [cvCount, clCount, templateCount, usersCount, categoryCount, montlyActivity, users, coverLetters, resumes, templates] = await getAdminData()
     return (
          <AdminContent
               cvCount={cvCount}
               clCount={clCount}
               templateCount={templateCount}
               usersCount={usersCount}
               categoryCount={categoryCount}
               monthlyActivity={montlyActivity}
               users={users.map(({name, ...val})=>({...val, name: name ?? ""}))}
               resumes={resumes}
               coverLetters={coverLetters}
               templates={templates.map(({name, ...val})=>({...val, name: name ?? ""}))}
          />
     )
}