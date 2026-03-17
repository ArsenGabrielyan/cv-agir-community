export interface ThemeColorMap {
     background: string,
     foreground: string,
     card: string,
     cardForeground: string,
     popover: string,
     popoverForeground: string,
     primary: string,
     parimaryForeground: string,
     secondary: string,
     secondaryForeground: string,
     muted: string,
     mutedForeground: string,
     accent: string,
     accentForeground: string,
     destructive: string,
     border: string,
     input: string,
     ring: string,
     chart: [string, string, string, string, string],
     sidebar: {
          background: string,
          foreground: string,
          primary: string,
          primaryForeground: string,
          accent: string,
          accentForeground: string,
          border: string,
          ring: string,
     }
}
export type Themes = "light" | "dark"
export type ThemeColors = "zinc" | "rose" | "blue" | "green" | "orange"
export type ThemeColor = Record<
     ThemeColors,
     Record<Themes,ThemeColorMap>
>
export interface AppTheme{
     theme: Themes,
     color: ThemeColors
}
export type ThemeColorsContext = {
     themeColor: ThemeColors,
     setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>,
}