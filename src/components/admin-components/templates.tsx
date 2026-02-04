import { useMediaQuery } from "@mui/material";
import { List, Datagrid, TextField, Create, SimpleForm, Edit, TextInput, required, ReferenceField, ReferenceInput, AutocompleteInput, FunctionField, Show, DateField, EditButton, DeleteButton, SimpleList, SearchInput, BooleanField, BooleanInput, TabbedShowLayout, InfiniteList, useTranslate, SelectInput, SelectField } from "react-admin"
import StarIcon from "@mui/icons-material/Star"
import { QuickFilter, CodeField, ImageUrlField, TemplatesPanel } from ".";
import { langChoices } from "@/i18n/react-admin";

const templateFilters = [
     <SearchInput key="search" source="name" alwaysOn/>,
     <ReferenceInput key="filter-categories" source="categoryId" reference="categories" alwaysOn>
          <AutocompleteInput/>
     </ReferenceInput>,
]

export const TemplatesList = () => {
     const isSmall = useMediaQuery(theme=>theme.breakpoints.down("md"));
     return isSmall ? (
          <InfiniteList filters={templateFilters}>
               <SimpleList
                    primaryText={record=>record.name}
                    secondaryText={record=>record.description}
                    tertiaryText={record=>new Date(record.createdAt).toLocaleDateString()}
               />
          </InfiniteList>
     ) : (
          <List filters={templateFilters}>
               <Datagrid expand={<TemplatesPanel/>}>
                    <SelectField optionValue="id" optionText="name" source="locale" choices={langChoices}/>
                    <TextField source="name"/>
                    <TextField source="description"/>
                    <ReferenceField source="categoryId" reference="categories"/>
                    <ImageUrlField source="imageName"/>
                    <FunctionField source="htmlTemplate" render={(record)=>`${record.htmlTemplate.substring(0,50)}...`}/>
                    <FunctionField source="cssStyle" render={(record)=>`${record.cssStyle.substring(0,50)}...`}/>
                    <EditButton/>
                    <DeleteButton/>
               </Datagrid>
          </List>
     )
}

export const TemplatesCreate = () => (
     <Create>
          <SimpleForm>
               <SelectInput validate={[required()]} optionValue="id" optionText="name" source="locale" choices={langChoices} resettable/>
               <TextInput validate={[required()]} source="name"/>
               <TextInput validate={[required()]} source="description"/>
               <TextInput validate={[required()]} source="imageName"/>
               <ReferenceInput source="categoryId" reference="categories">
                    <AutocompleteInput/>
               </ReferenceInput>
               <TextInput validate={[required()]} multiline source="htmlTemplate"/>
               <TextInput validate={[required()]} multiline source="cssStyle"/>
          </SimpleForm>
     </Create>
)

export const TemplatesEdit = () => (
     <Edit>
          <SimpleForm>
               <TextInput disabled source="id"/>
               <SelectInput validate={[required()]} optionValue="id" optionText="name" source="locale" choices={langChoices} resettable/>
               <TextInput validate={[required()]} source="name"/>
               <TextInput validate={[required()]} source="description"/>
               <TextInput validate={[required()]} source="imageName"/>
               <ReferenceInput source="categoryId" reference="categories">
                    <AutocompleteInput/>
               </ReferenceInput>
               <TextInput validate={[required()]} multiline source="htmlTemplate"/>
               <TextInput validate={[required()]} multiline source="cssStyle"/>
          </SimpleForm>
     </Edit>
)

export const TemplateShow = () => {
     const t = useTranslate()
     return (
          <Show>
               <TabbedShowLayout>
                    <TabbedShowLayout.Tab label={t("tabs.info")}>
                         <TextField source="id"/>
                         <SelectField optionValue="id" optionText="name" source="locale" choices={langChoices}/>
                         <TextField source="name"/>
                         <TextField source="description"/>
                         <ReferenceField source="categoryId" reference="categories"/>
                         <ImageUrlField source="imageName"/>
                         <DateField source="createdAt"/>
                         <DateField source="updatedAt"/>
                    </TabbedShowLayout.Tab>
                    <TabbedShowLayout.Tab label={t("tabs.htmlTemplate")}>
                         <CodeField source="htmlTemplate" language="hbs"/>
                    </TabbedShowLayout.Tab>
                    <TabbedShowLayout.Tab label={t("tabs.cssStyle")}>
                         <CodeField source="cssStyle" language="css"/>
                    </TabbedShowLayout.Tab>
               </TabbedShowLayout>
          </Show>
     )
}