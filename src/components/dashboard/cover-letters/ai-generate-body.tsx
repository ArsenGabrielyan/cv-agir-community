import { generateCoverLetterBody } from "@/actions/ai";
import LoadingButton from "@/components/buttons/loading-button";
import { CoverLetterFormType } from "@/schemas/types";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface GenerateLetterBodyButtonProps{
     coverLetterData: CoverLetterFormType,
     onBodyGenerated: (body: string) => void,
     disabled?: boolean
}
export default function GenerateLetterBodyButton({coverLetterData, onBodyGenerated, disabled}: GenerateLetterBodyButtonProps){
     const errMsg = useTranslations("error-messages")
     const [loading, setLoading] = useState(false);
     const buttonTxt = useTranslations("buttons.ai")

     const handleClick = async()=>{
          try{
               setLoading(true);
               const aiResponse = await generateCoverLetterBody(coverLetterData);
               onBodyGenerated(aiResponse);
          } catch (error){
               console.error(error);
               toast.error(errMsg("unknownError"))
          } finally{
               setLoading(false)
          }
     }

     return (
          <LoadingButton
               loading={loading}
               disabled={disabled}
               variant="outline"
               type="button"
               onClick={handleClick}
          >
               <Sparkles className="size-4"/>
               {buttonTxt("generate")}
          </LoadingButton>
     )
}