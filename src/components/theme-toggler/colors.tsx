"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeColors } from "@/lib/types/theme";
import { cn } from "@/lib/utils";
import { useCurrentTheme, useThemeColors } from "@/theme/theme-provider";

const availableColors: Record<ThemeColors,{
     light: string,
     dark: string,
     title: string
}> = {
     blue: {
          light: "bg-blue-600",
          dark: "bg-blue-700",
          title: "Blue"
     },
     green: {
          light: "bg-green-600",
          dark: "bg-green-500",
          title: "Green"
     },
     rose: {
          light: "bg-rose-600",
          dark: "bg-rose-700",
          title: "Rose"
     },
     orange: {
          light: "bg-orange-500",
          dark: "bg-orange-700",
          title: "Orange"
     },
}

export default function ColorToggler(){
     const {theme: currTheme} = useCurrentTheme();
     const {themeColor, setThemeColor} = useThemeColors()
     return (
          <Select
               onValueChange={color=>setThemeColor(color as ThemeColors)}
               defaultValue={themeColor}
          >
               <SelectTrigger>
                    <SelectValue placeholder="Choose a Color"/>
               </SelectTrigger>
               <SelectContent>
                    {Object.entries(availableColors).map(([key,color])=>(
                         <SelectItem key={key} value={key}>
                              <div className="flex items-center justify-center flex-wrap gap-2">
                                   <div
                                        className={cn(
                                             "rounded-full",
                                             "size-3",
                                             currTheme==="light" ? color.light : color.dark
                                        )}
                                   />
                                   <div className="text-sm">{color.title}</div>
                              </div>
                         </SelectItem>
                    ))}
               </SelectContent>
          </Select>
     )
}