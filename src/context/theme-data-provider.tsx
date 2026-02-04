"use client"
import setGlobalColorTheme, { getSavedThemeColor } from "@/lib/theme-colors"
import { ThemeColors, ThemeColorStateParams } from "@/lib/types"
import { useTheme } from "next-themes"
import { ThemeProviderProps } from "next-themes"

import React, { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext<ThemeColorStateParams>({} as ThemeColorStateParams)

export default function ThemeDataProvider({children}: ThemeProviderProps){
     const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor())
     const [isMounted, setIsMounted] = useState(false);
     const { resolvedTheme } = useTheme();

     useEffect(()=>{
          if (!isMounted) {
               setIsMounted(true);
          }
          if (isMounted && resolvedTheme) {
               localStorage.setItem("themeColor", themeColor);
               setGlobalColorTheme(resolvedTheme as "light" | "dark", themeColor);
          }
     },[themeColor, resolvedTheme, isMounted])

     if(!isMounted) return null
     return <ThemeContext.Provider value={{themeColor,setThemeColor}}>
          {children}
     </ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)