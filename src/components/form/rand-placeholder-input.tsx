/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Input } from "../ui/input"

export default function RandomPlaceholderInput({placeholdersList, ...props}: React.ComponentProps<"input"> & {
     placeholdersList: string
}){
     const [placeholder, setPlaceholder] = useState("");
     const placeholders = placeholdersList.split(", ")
     useEffect(()=>{
          const randomIndex = Math.floor(Math.random()*placeholders.length);
          setPlaceholder(placeholders[randomIndex]);
     },[])
     return (
          <Input
               {...props}
               placeholder={placeholder}
          />
     )
}