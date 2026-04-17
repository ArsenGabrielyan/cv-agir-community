import AuditLogCard from "./audit-log-card";
import { AuditLogServerData } from "@/lib/types/admin"

interface AuditLogsListProps{
     auditLogs: AuditLogServerData[],
     page: number,
     pageSize: number,
}
export default function AuditLogsList({auditLogs, page, pageSize}: AuditLogsListProps){
     return (
          <div className="space-y-3">
               {auditLogs.slice((page - 1) * pageSize,pageSize*page).map(val=>(
                    <AuditLogCard
                         key={val.id}
                         data={val}
                    />
               ))}
          </div>
     )
}