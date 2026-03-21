import { generateSummary } from "@/actions/ai";
import LoadingButton from "@/components/buttons/loading-button";
import { ResumeFormType } from "@/lib/types/schemas";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface GenerateSummaryButtonProps{
     resumeData: ResumeFormType,
     onSummaryGenerated: (summary: string) => void
     disabled?: boolean
}
export default function GenerateSummaryButton({resumeData, onSummaryGenerated, disabled}: GenerateSummaryButtonProps){
     const errMsg = useTranslations("error-messages")
     const [loading, setLoading] = useState(false);

     const handleClick = async()=>{
          try{
               setLoading(true);
               const aiResponse = await generateSummary(resumeData);
               onSummaryGenerated(aiResponse);
          } catch (error){
               console.error(error);
               toast.error(errMsg("unknownError"))
          } finally{
               setLoading(false)
          }
     }
     const t = useTranslations("buttons.ai")
     return (
          <LoadingButton
               loading={loading}
               disabled={disabled}
               variant="outline"
               type="button"
               onClick={handleClick}
          >
               <Sparkles className="size-4"/>
               {t("generate")}
          </LoadingButton>
     )
}