import AdminContent from "@/admin";
import { getAdminCounts } from "@/data/admin";

export default async function AdminPage(){
     const [cvCount, clCount, templateCount, categoryCount, usersCount] = await getAdminCounts()
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