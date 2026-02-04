"use client"
import dynamic from "next/dynamic";
import AdminLoader from "../loaders/admin-loader";
import { LangCodeType } from "@/i18n/types";

const App = dynamic(()=>import("@/components/admin-components/admin-page"),{
     ssr: false,
     loading: AdminLoader
});
interface AdminPageWrapperProps{
     locale: LangCodeType
}
const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({locale}) => <App locale={locale}/>

export default AdminPageWrapper;