import {BorderStyles} from "@db"

export function getLanguageLevel(
     level: number
): "fluent" | "intermediate" | "beginner" | "few-words" {
     if(level>=90 && level <= 100) return "fluent"
     if(level>=70 && level <= 90) return "intermediate"
     if(level>=40 && level <= 70) return "beginner"
     return "few-words"
}

export function getBorderRadius(borderStyle: BorderStyles,type: "default" | "badge" = "default"){
     if(borderStyle===BorderStyles.square) return "0px"
     if(borderStyle===BorderStyles.circle) return "9999px"
     return type==="default" ? "10%" : "8px"
}

export function fileReplacer(_: unknown, value: unknown){
     return value instanceof File ? {
          name: value.name,
          size: value.size,
          type: value.type,
          lastModified: value.lastModified,
     } : value
}