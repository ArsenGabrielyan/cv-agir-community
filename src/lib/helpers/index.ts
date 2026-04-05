import {AuditAction, BorderStyles} from "@db"
import { AuditLogServerData, AuditMetadata, TypedAuditRecord } from "../types/admin"

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

export function escapeCSV(value: unknown) {
     if (value == null) return "";
     const str = String(value);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
     }
     return value
}

export function asTypedAuditRecord<A extends AuditAction>(
     record: AuditLogServerData,
     action: A
): TypedAuditRecord<A> {
     return {
          ...record,
          action,
          metadata: record.metadata as unknown as AuditMetadata<A>,
     };
}

export function isWithinDateRange(date: Date, from?: string, to?: string ) {
     const start = from ? new Date(`${from}T00:00:00`) : null;
     const end = to ? new Date(`${to}T23:59:59.999Z`) : null;
     return (!start || date >= start) && (!end || date <= end);
}