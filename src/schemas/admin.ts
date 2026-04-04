import { languages } from "@/i18n/config"
import * as z from "zod"

export const CategoryFormSchema = z.object({
     name: z.string().min(1,"Պարտադիր է գրել կատեգորիայի անունը").max(100,"Կատեգորիայի անունը շատ երկար է")
})

export const TemplateFormSchema = z.object({
     locale: z.enum([languages.map(val=>val.code)[0],...languages.map(val=>val.code).slice(1)]),
     name: z.string().min(1,"Պարտադիր է գրել շաբլոնի անունը").max(200,"Շաբլոնի անունը շատ երկար է"),
     description: z.string().min(5,"Նկարագրությունը շատ կարճ է").max(1000,"Նկարագրությունը շատ երկար է"),
     categoryId: z.string().min(1,"Կատեգորիան պարտադիր է").max(100,"Կատեգորիան շատ երկար է"),
     imageName: z.string().min(1,"Նկարի անունը պարտադիր է").max(100,"Նկարի անունը շատ երկար է"),
     htmlTemplate: z.string().min(10,"Պարտադիր է տեղադրել HTML Կոդը"),
     cssStyle: z.string().min(10,"Պարտադիր է տեղադրել CSS Կոդը"),
})