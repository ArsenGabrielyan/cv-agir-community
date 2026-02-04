import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SettingsCardProps{
     title: string,
     children: React.ReactNode,
     className?: string,
     description?: string
}
export default function SettingsCard({title, children, className, description}: SettingsCardProps){
     return (
          <Card>
               <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                         <CardDescription>{description}</CardDescription>
                    )}
               </CardHeader>
               <CardContent className={cn("space-y-4",className)}>
                    {children}
               </CardContent>
          </Card>
     )
}