import { DateInput, InfiniteList, SimpleList, useTranslate} from "react-admin"
import {formatDistanceToNow,} from "date-fns"
import React from "react"
import { QuickFilter } from "."
import { AUDIT_QUICK_FILTERS } from "@/lib/constants"
import Error from "@mui/icons-material/Error"
import { getFormattedAuditLog } from "@/lib/helpers/audit-logs"
import { LangCodeType } from "@/i18n/types"
import { dateFNSLocales } from "@/i18n/config"

const logFilters = [
     ...Object.entries(AUDIT_QUICK_FILTERS).map(([key,value])=>(
          <QuickFilter key={`${key}-search`} defaultValue={value} source={`action-${key}`}/>
     )),
     <DateInput key="from" source="fromDate"/>,
     <DateInput key="to" source="toDate"/>,
]

export const AuditLogsList = ({locale}: {locale: LangCodeType}) => {
     const t = useTranslate()
     return (
          <InfiniteList filters={logFilters}>
               <SimpleList
                    primaryText={(record) => {
                         const { primaryText, isError } = getFormattedAuditLog(record,t);
                         return <>{isError && <Error color="error" style={{marginRight: 5}}/>}{primaryText}</>;
                    }}
                    secondaryText={(record) => getFormattedAuditLog(record,t).secondaryText}
                    tertiaryText={(record) => formatDistanceToNow(record.createdAt, { locale: dateFNSLocales[locale] })}
               />
          </InfiniteList>
     )
}