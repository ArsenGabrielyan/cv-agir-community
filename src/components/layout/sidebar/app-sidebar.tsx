import { 
     Sidebar,
     SidebarContent,
     SidebarHeader
} from "@/components/ui/sidebar";
import Logo from "../logo";
import SidebarLinks from "./sidebar-links";
import { currentUser } from "@/lib/auth";
import { getResumeCountByUserId } from "@/data/resumes";

export default async function AppSidebar(){
     const user = await currentUser();
     if(!user || !user.id){
          return null;
     }
     const resumeCount = await getResumeCountByUserId(user.id)
     return (
          <Sidebar>
               <SidebarHeader className="items-center pt-4">
                    <Logo href="/dashboard" width={200} height={64}/>
               </SidebarHeader>
               <SidebarContent>
                    <SidebarLinks/>
               </SidebarContent>
          </Sidebar>
     )
}