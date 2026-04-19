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

function escapeCSV(value: unknown) {
     if (value == null) return "";
     const str = String(value);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
     }
     return value
}

interface ExportCSVOptions<T>{
     headers: string[],
     data: T[],
     fileName?: string
}
export function exportCSV<T>({headers, data, fileName="data"}: ExportCSVOptions<T>){
     const csv = data.map(val=>headers.map(h=>escapeCSV(val[h as keyof typeof val])).join(","));
     const blob = new Blob([[headers.join(","), ...csv].join("\n")], {type : 'text/csv'});
     const a = document.createElement('a');
     a.download = `${fileName}.csv`;
     a.href = URL.createObjectURL(blob);
     a.addEventListener('click', () => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
     });
     a.click();
}

export function isWithinDateRange(date: Date, from?: string, to?: string ) {
     const start = from ? new Date(`${from}T00:00:00`) : null;
     const end = to ? new Date(`${to}T23:59:59.999Z`) : null;
     return (!start || date >= start) && (!end || date <= end);
}