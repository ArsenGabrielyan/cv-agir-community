import { ThemeColorMap, ThemeColors, Themes } from "@/lib/types/theme";
import { colors } from "./colors";
import { oklch, formatHex } from 'culori';

interface AccessibilityOptions {
     reducedContrast?: boolean;
     highContrast?: boolean;
     reducedMotion?: boolean;
}

const toKebab = (key: string) => key.replace(/([A-Z])/g, "-$1").toLowerCase();

export default function setTheme(
     themeType: Themes,
     color: ThemeColors,
     accessibility?: AccessibilityOptions
) {
     const theme = colors[color];
     if(!theme) 
          throw new Error(`Color "${color}" not found! Available themes: ${Object.keys(colors).join(", ")}`);
     const modeStyles = theme[themeType];
     if(!modeStyles)
          throw new Error(`Mode "${themeType}" not found in color "${color}"!`);
     const root = document.documentElement;

     const applyFilter = (oklchColor: string) => {
          const color = oklchColor.replace("oklch(","").replace(")","").split(" ").map(v=>parseFloat(v));
          let hex = formatHex(oklch({ mode: 'oklch', l: color[0], c: color[1], h: color[2] }));
          if(accessibility?.highContrast) {
               const oklchColor = oklch(hex);
               if(oklchColor) {
                    oklchColor.l = oklchColor.l > 0.5 ? Math.min(1, oklchColor.l + 0.1) : Math.max(0, oklchColor.l - 0.1);
                    hex = formatHex(oklchColor);
               }
          } else if(accessibility?.reducedContrast) {
               const oklchColor = oklch(hex);
               if(oklchColor) {
                    oklchColor.l = 0.5 + (oklchColor.l - 0.5) * 0.7;
                    hex = formatHex(oklchColor);
               }
          }
          return hex;
     }

     if(!accessibility?.reducedMotion) {
          root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease');
     } else {
          root.style.setProperty('transition', 'none');
     }
     const flattened: Record<string, string> = {};
     const entries = Object.entries(modeStyles) as [keyof ThemeColorMap, ThemeColorMap[keyof ThemeColorMap]][]
     for (const [key, value] of entries) {
          if (key === "sidebar" && typeof value === "object")
               for (const [k, v] of Object.entries(value))
                    flattened[`sidebar-${k}`] = v;
          else if (key === "chart" && Array.isArray(value))
               value.forEach((v, i) => (flattened[`chart-${i + 1}`] = v));
          else if (typeof value === "string")
               flattened[key] = value;
     }
     Object.entries(flattened).forEach(([key, value]) =>{
          if(key==="border" || key==="input") return;
          return root.style.setProperty(`--${toKebab(key)}`, applyFilter(value))
     });
}

export function getSavedColor(): ThemeColors{
     try {
          const saved = localStorage.getItem("theme-color") as ThemeColors
          return saved 
     } catch {
          return "blue"
     }
}