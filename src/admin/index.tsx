"use client"
import { useLocale, useTranslations } from "next-intl"
import SidebarContentWrapper from "@/components/sidebar-content"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Link, redirect } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { ChevronLeft, FileText, FileUser, LayoutTemplate, List, Users } from "lucide-react"
import { DashboardCounter } from "./components/dashboard-item"
import { IDashboardCount, IMonthlyActivity } from "@/lib/types"
import { MonthlyActivity } from "./charts/montly-activity"
import { Distribution } from "./charts/distribution"
import RecentResumes from "./recent-resources/resumes"
import RecentCoverLetters from "./recent-resources/cover-letters"
import RecentTemplates from "./recent-resources/templates"
import RecentUsers from "./recent-resources/users"

interface AdminContentProps{
     cvCount: IDashboardCount,
     clCount: IDashboardCount,
     templateCount: IDashboardCount,
     usersCount: IDashboardCount,
     categoryCount: IDashboardCount
     monthlyActivity: IMonthlyActivity[],
     resumes: {id: string, title: string, createdAt: Date}[],
     coverLetters: {id: string, title: string, createdAt: Date}[],
     users: {id: string, name: string, createdAt: Date}[],
     templates: {id: string, name: string, createdAt: Date}[]
}
export default function AdminContent({cvCount, clCount, templateCount, usersCount, categoryCount, monthlyActivity, resumes, coverLetters, users, templates}: AdminContentProps){
     const t = useTranslations("admin.main")
     const locale = useLocale()
     const user = useCurrentUser()
     if(!user) return redirect({ href: "/", locale })
     return (
          <SidebarContentWrapper title={t("title",{user: user?.name?.split(" ")[0] ?? "Admin"})} includeBackButton>
               <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                         <DashboardCounter
                              count={usersCount.count}
                              Icon={Users}
                              difference={usersCount.difference}
                              name={t("prefixes.users")}
                         />
                         <DashboardCounter
                              count={cvCount.count}
                              Icon={FileUser}
                              difference={cvCount.difference}
                              name={t("prefixes.resume")}
                         />
                         <DashboardCounter
                              count={clCount.count}
                              Icon={FileText}
                              difference={clCount.difference}
                              name={t("prefixes.cover-letter")}
                         />
                         <DashboardCounter
                              count={templateCount.count}
                              Icon={LayoutTemplate}
                              difference={templateCount.difference}
                              name={t("prefixes.templates")}
                              className="col-span-2"
                         />
                         <DashboardCounter
                              count={categoryCount.count}
                              Icon={List}
                              difference={categoryCount.difference}
                              name={t("prefixes.categories")}
                         />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                         <MonthlyActivity data={monthlyActivity}/>
                         <Distribution
                              resumes={cvCount.count}
                              coverLetters={clCount.count}
                              templates={templateCount.count}
                              users={usersCount.count}
                         />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                         <RecentUsers data={users}/>
                         <RecentResumes data={resumes}/>
                         <RecentCoverLetters data={coverLetters}/>
                         <RecentTemplates data={templates}/>
                    </div>
               </div>
          </SidebarContentWrapper>
     )
}