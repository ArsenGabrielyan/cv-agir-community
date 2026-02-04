import React from "react";
import {
     Card,
     CardHeader,
     CardTitle,
     CardDescription,
     CardContent,
     CardFooter
} from "@/components/ui/card"

interface EditorFormCardWrapperProps{
     title: string,
     description?: string,
     children?: React.ReactNode,
     renderFooter?: () => React.JSX.Element
}
export default function EditorFormCardWrapper({
     title,
     description,
     children,
     renderFooter
}: EditorFormCardWrapperProps){
     return (
          <Card>
               <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                         <CardDescription>{description}</CardDescription>
                    )}
               </CardHeader>
               {children && (
                    <CardContent className="space-y-4">
                         {children}
                    </CardContent>
               )}
               {renderFooter && (
                    <CardFooter>
                         {renderFooter()}
                    </CardFooter>
               )}
          </Card>
     )
}