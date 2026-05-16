"use client"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { TFunction } from "@/i18n/types"
import { useTranslations } from "next-intl"

const chartConfig = (t: TFunction<"charts">) => ({
     count: {
          label: t("distribution"),
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
     }
}) satisfies ChartConfig

interface DistributionProps{
     resumes: number,
     coverLetters: number,
     users: number,
     templates: number,
}
export function Distribution({resumes, coverLetters, users, templates}: DistributionProps) {
     const chartData = [
          { resourceType: "users", count: users, fill: "var(--color-users" },
          { resourceType: "resumes", count: resumes, fill: "var(--color-resumes)" },
          { resourceType: "coverLetters", count: coverLetters, fill: "var(--color-coverLetters)" },
          { resourceType: "templates", count: templates, fill: "var(--color-templates)" },
     ]
     const t = useTranslations("charts")
     return (
          <Card className="flex flex-col">
               <CardHeader className="items-center pb-0">
                    <CardTitle>{t("distribution")}</CardTitle>
               </CardHeader>
               <CardContent className="flex-1 pb-0">
                    <ChartContainer
                         config={chartConfig(t)}
                         className="mx-auto aspect-square max-h-[300px]"
                    >
                         <PieChart>
                              <ChartTooltip
                                   cursor={false}
                                   content={<ChartTooltipContent hideLabel />}
                              />
                              <Pie data={chartData} dataKey="count" nameKey="resourceType"/>
                              <ChartLegend
                                   content={<ChartLegendContent nameKey="resourceType" />}
                                   className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                              />
                         </PieChart>
                    </ChartContainer>
               </CardContent>
          </Card>
     )
}