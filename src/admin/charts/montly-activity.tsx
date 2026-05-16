"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { IMonthlyActivity } from "@/lib/types"
import { TFunction } from "@/i18n/types"
import { useTranslations } from "next-intl"

const chartConfig = (t: TFunction<"charts">) => ({
     monthlyActivity: {
          label: t("monthly-activity"),
     },
     resumes: {
          label: t("resumes"),
          color: "var(--chart-1)",
     },
     coverLetters: {
          label: t("cover-letters"),
          color: "var(--chart-2)",
     },
     users: {
          label: t("users"),
          color: "var(--chart-3)",
     },
     templates: {
          label: t("templates"),
          color: "var(--chart-4)",
     },
     categories: {
          label: t("categories"),
          color: "var(--chart-5)",
     }
}) satisfies ChartConfig

interface MonthlyActivityProps{
     data: IMonthlyActivity[]
}
export function MonthlyActivity({data}: MonthlyActivityProps) {
     const t = useTranslations("charts")
     return (
          <Card className="pt-0">
               <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1">
                         <CardTitle>{t("monthly-platform-activity.title")}</CardTitle>
                         <CardDescription>
                              {t("monthly-platform-activity.desc")}
                         </CardDescription>
                    </div>
               </CardHeader>
               <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                         config={chartConfig(t)}
                         className="aspect-auto h-[250px] w-full"
                    >
                         <AreaChart
                              data={data}
                              accessibilityLayer
                         >
                              <defs>
                                   <linearGradient id="fillResumes" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                             offset="5%"
                                             stopColor="var(--color-resumes)"
                                             stopOpacity={0.8}
                                        />
                                        <stop
                                             offset="95%"
                                             stopColor="var(--color-resumes)"
                                             stopOpacity={0.1}
                                             />
                                   </linearGradient>
                                   <linearGradient id="fillCoverLetters" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                             offset="5%"
                                             stopColor="var(--color-coverLetters)"
                                             stopOpacity={0.8}
                                        />
                                        <stop
                                             offset="95%"
                                             stopColor="var(--color-coverLetters)"
                                             stopOpacity={0.1}
                                        />
                                   </linearGradient>
                                   <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                             offset="5%"
                                             stopColor="var(--color-users)"
                                             stopOpacity={0.8}
                                        />
                                        <stop
                                             offset="95%"
                                             stopColor="var(--color-users)"
                                             stopOpacity={0.1}
                                        />
                                   </linearGradient>
                                   <linearGradient id="fillTemplates" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                             offset="5%"
                                             stopColor="var(--color-templates)"
                                             stopOpacity={0.8}
                                        />
                                        <stop
                                             offset="95%"
                                             stopColor="var(--color-templates)"
                                             stopOpacity={0.1}
                                             />
                                   </linearGradient>
                                   <linearGradient id="fillCategories" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                             offset="5%"
                                             stopColor="var(--color-categories)"
                                             stopOpacity={0.8}
                                        />
                                        <stop
                                             offset="95%"
                                             stopColor="var(--color-categories)"
                                             stopOpacity={0.1}
                                        />
                                   </linearGradient>
                              </defs>
                              <CartesianGrid vertical={false} />
                              <XAxis
                                   dataKey="date"
                                   tickLine={false}
                                   axisLine={false}
                                   tickMargin={8}
                                   minTickGap={32}
                                   tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                             month: "short",
                                             day: "numeric",
                                        })
                                   }}
                              />
                              <ChartTooltip
                                   cursor={false}
                                   content={
                                        <ChartTooltipContent
                                             labelFormatter={(value) => {
                                                  return new Date(value).toLocaleDateString("en-US", {
                                                       month: "short",
                                                       day: "numeric",
                                                  })
                                             }}
                                             indicator="dot"
                                        />
                                   }
                              />
                              <Area
                                   dataKey="coverLetters"
                                   type="natural"
                                   fill="url(#fillCoverLetters)"
                                   stroke="var(--color-coverLetters)"
                              />
                              <Area
                                   dataKey="resumes"
                                   type="natural"
                                   fill="url(#fillResumes)"
                                   stroke="var(--color-resumes)"
                              />
                              <Area
                                   dataKey="users"
                                   type="natural"
                                   fill="url(#fillUsers)"
                                   stroke="var(--color-users)"
                              />
                              <Area
                                   dataKey="templates"
                                   type="natural"
                                   fill="url(#fillTemplates)"
                                   stroke="var(--color-templates)"
                              />
                              <Area
                                   dataKey="categories"
                                   type="natural"
                                   fill="url(#fillCategories)"
                                   stroke="var(--color-categories)"
                              />
                              <ChartLegend content={<ChartLegendContent />} />
                         </AreaChart>
                    </ChartContainer>
               </CardContent>
          </Card>
     )
}