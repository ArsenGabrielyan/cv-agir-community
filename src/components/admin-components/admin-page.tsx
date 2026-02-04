"use client"
import {Admin, Resource, bwLightTheme, bwDarkTheme} from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import { TemplatesCreate, TemplatesEdit, TemplatesList, TemplateShow } from "./templates";
import { CategoriesCreate, CategoriesEdit, CategoriesList, CategoryShow } from "./categories";
import { AdminLayout } from "./admin-layout";
import DescriptionIcon from "@mui/icons-material/Description"
import CategoryIcon from "@mui/icons-material/Category"
import AdminHomePage from "./admin-homepage";
import FactCheckIcon from "@mui/icons-material/FactCheck"
import { AuditLogsList } from "./logs";
import { LangCodeType } from "@/i18n/types";
import { getI18nProvider } from "@/i18n/react-admin";

const dataProvider = simpleRestProvider("/api");

interface Props{
     locale: LangCodeType
}
export default function App({locale}: Props){
     const i18nProvider = getI18nProvider(locale);
     return (
          <Admin
               i18nProvider={i18nProvider}
               dataProvider={dataProvider}
               theme={bwLightTheme}
               darkTheme={bwDarkTheme}
               layout={AdminLayout}
               dashboard={AdminHomePage}
          >
               <Resource
                    name="categories"
                    list={CategoriesList}
                    edit={CategoriesEdit}
                    create={CategoriesCreate}
                    show={CategoryShow}
                    icon={CategoryIcon}
               />
               <Resource
                    name="templates"
                    list={TemplatesList}
                    edit={TemplatesEdit}
                    create={TemplatesCreate}
                    show={TemplateShow}
                    icon={DescriptionIcon}
               />
               <Resource
                    name="logs"
                    list={()=>AuditLogsList({locale})}
                    icon={FactCheckIcon}
               />
          </Admin>
     )
}