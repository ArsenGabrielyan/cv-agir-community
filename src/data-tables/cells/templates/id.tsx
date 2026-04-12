"use client"
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function IdCell({id}: {id: string}){
     return (
          <Button variant="link" asChild className="p-0! max-w-xs truncate">
               <Link href={`/admin/templates/${id}`}>
                    {id}
               </Link>
          </Button>
     )
}