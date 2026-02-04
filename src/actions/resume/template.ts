"use server"
import { getLanguageLevel } from "@/lib/helpers";
import { ResumeFormType } from "@/schemas/types";
import Handlebars from "handlebars"
import { marked } from "marked"
import DOMPurify from "isomorphic-dompurify"
import { getTranslations } from "next-intl/server";

export async function compileHTML(html: string, data: ResumeFormType){
     const t = await getTranslations("doc-preview.lang-levels")
     Handlebars.registerHelper({
          eq: (v1, v2) => v1 === v2,
          ne: (v1, v2) => v1 !== v2,
          lt: (v1, v2) => v1 < v2,
          gt: (v1, v2) => v1 > v2,
          lte: (v1, v2) => v1 <= v2,
          gte: (v1, v2) => v1 >= v2,
          and(...args) {
               return Array.prototype.every.call(args, Boolean);
          },
          or(...args) {
               return Array.prototype.slice.call(args, 0, -1).some(Boolean);
          },
          getProficiency(value){
               const level = +value;
               return t(getLanguageLevel(level));
          },
          mdToHtml(content){
               const markdown = marked(content,{
                    async: false
               })
               return new Handlebars.SafeString(DOMPurify.sanitize(markdown,{
                    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|blob):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
               }))
          }
     })
     const htmlTemplate = Handlebars.compile<ResumeFormType>(html,{ noEscape: true });
     return htmlTemplate(data)
}