import { useState } from "react";

export default function useCRUD<T extends {id: string}>(items: T[]){
     const [data, setData] = useState(items);
     const createData = (data: T) => setData(prev=>[...prev,data]);
     const updateData = (data: Partial<T> & { id: string }) => setData(prev=>prev.map(val=>val.id===data.id ? {...val, ...data} : val))
     const deleteData = (id: string) => setData(prev=>prev.filter(val=>val.id!==id))
     const replaceAll = (items: T[]) => setData(items)
     const deleteAll = (ids: string[]) => setData(prev=>prev.filter(val=>!ids.includes(val.id)))
     return {
          data,
          create: createData,
          update: updateData,
          remove: deleteData,
          replace: replaceAll,
          bulkDelete: deleteAll
     }
}