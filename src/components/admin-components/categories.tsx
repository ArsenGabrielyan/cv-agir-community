import { Create, Datagrid, DateField, DeleteButton, Edit, EditButton, InfiniteList, List, required, SearchInput, Show, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput } from "react-admin";
import {useMediaQuery} from "@mui/material"

export const CategoryShow = () => (
     <Show>
          <SimpleShowLayout>
               <TextField source="id"/>
               <TextField source="name"/>
               <DateField source="createdAt"/>
               <DateField source="updatedAt"/>
          </SimpleShowLayout>
     </Show>
);

const categoriesFilter = [
     <SearchInput source="name" key="search" alwaysOn/>
]

export const CategoriesList = () => {
     const isSmall = useMediaQuery(theme=>theme.breakpoints.down("sm"));
     return isSmall ? (
          <InfiniteList filters={categoriesFilter}>
               <SimpleList
                    primaryText={record=>record.name}
                    tertiaryText={record=>new Date(record.createdAt).toLocaleDateString()}
               />
          </InfiniteList>
     ) : (
          <List filters={categoriesFilter}>
               <Datagrid>
                    <TextField source="name"/>
                    <EditButton/>
                    <DeleteButton/>
               </Datagrid>
          </List>
     )
}

export const CategoriesCreate = () => (
     <Create>
          <SimpleForm>
               <TextInput validate={[required()]} source="name"/>
          </SimpleForm>
     </Create>
)

export const CategoriesEdit = () => (
     <Edit>
          <SimpleForm>
               <TextInput source="id" disabled/>
               <TextInput validate={[required()]} source="name"/>
          </SimpleForm>
     </Edit>
)