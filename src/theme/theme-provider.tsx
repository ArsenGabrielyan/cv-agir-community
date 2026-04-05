"use client"
import { ThemeProviderProps, useTheme } from "next-themes"
import { ThemeColorsContext, ThemeColors, Themes } from "@/lib/types/theme"
import { createContext, useContext, useEffect, useState } from "react"
import setTheme, { getSavedColor } from "./helpers";

const ThemeContext = createContext<ThemeColorsContext>({} as ThemeColorsContext);

export default function ThemeColorsProvider({children}: ThemeProviderProps){
     const [themeColor, setThemeColor] = useState<ThemeColors>(()=>getSavedColor() || "zinc");
     const [isMounted, setIsMounted] = useState(false);
     const {resolvedTheme} = useTheme()

     useEffect(()=>{
          if(!isMounted) setIsMounted(true)
          if(isMounted && typeof window !== 'undefined'){
               const contrastQuery = window.matchMedia('(prefers-contrast: more)');
               const handleContrastChange = (e: MediaQueryListEvent) => {
                    if(e.matches) console.info('High contrast mode enabled');
               };
               contrastQuery.addEventListener('change', handleContrastChange);
               
               if(resolvedTheme){
                    localStorage.setItem("theme-color",themeColor);
                    setTheme(
                         resolvedTheme as Themes,
                         themeColor,
                    );
               }
               
               return () => contrastQuery.removeEventListener('change', handleContrastChange);
          }
     },[isMounted, resolvedTheme, themeColor])

     return isMounted ? (
          <ThemeContext.Provider value={{themeColor, setThemeColor}}>
               {children}
          </ThemeContext.Provider>
     ) : null
}

export const useThemeColors = () => useContext(ThemeContext)

export function useCurrentTheme(): {
     type: Themes | "system",
     theme: Themes    
}{
     const { theme, systemTheme } = useTheme();
     if(!theme || !systemTheme)
          throw new Error("useCurrentTheme should use with ThemesProvider");
     return {
          type: theme==="system" ? "system" : theme as Themes,
          theme: theme === "system" ? systemTheme : theme as Themes
     }
}