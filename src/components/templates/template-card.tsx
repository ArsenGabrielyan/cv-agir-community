"use client"
import { ResumeTemplate } from "@db";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { TFunction } from "@/i18n/types";

interface TemplateCardProps{
     data: ResumeTemplate,
     t: TFunction<"templates">
}
export default function TemplateCard({data, t}: TemplateCardProps){
     const [imageUrl] = useState(data.imageName ? `/templates/${data.imageName}` : `/template-img.webp`);
     return (
          <div className="group rounded-xl bg-card text-card-foreground border shadow max-w-[350px]">
               <Image src={imageUrl} alt="template-thumbnail" width={350} height={550}/>
               <div className="space-y-4 p-4">
                    <h2 className="text-lg font-semibold">
                         {data.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">{data.description}</p>
                    <Button className="w-full" asChild>
                         <Link href={`/editor?templateId=${data.id}`}>{t("useTemplate")}</Link>
                    </Button>
               </div>
          </div>
     )
}