"use client"
import * as React from "react"
import { Progress } from "@/components/ui/progress"
import zxcvbn from "zxcvbn"
import {Eye, EyeOff} from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { useTranslations } from "next-intl"

export const PasswordInput: React.FC<React.ComponentProps<"input">> = (props) => {
     const [showText, setShowText] = React.useState(false);
     const t = useTranslations("auth.password-state")
     return (
          <InputGroup>
               <InputGroupInput {...props} type={showText ? "text" : "password"}/>
               <InputGroupAddon align="inline-end">
                    <InputGroupButton
                         variant="ghost"
                         title={t(showText ? "hide" : "show")}
                         onClick={()=>setShowText(!showText)}
                         size="icon-xs"
                    >
                         {showText ? <EyeOff/> : <Eye/>}
                    </InputGroupButton>
               </InputGroupAddon>
          </InputGroup>
     )
}

export const PasswordStrengthInput: React.FC<React.ComponentProps<"input">> = ({value,...props})=>{
     const {score} = zxcvbn(value as string);
     const t = useTranslations("auth.password-strength")
     const checkPassStrength = (score: zxcvbn.ZXCVBNScore) => {
          const returnData = {
               0: {color: "#a0a0a0", text: t("weakest")},
               1: {color: "#dc3545", text: t("weak")},
               2: {color: "#ffad00", text: t("medium")},
               3: {color: "#769246", text: t("strong")},
               4: {color: "#167051", text: t("strongest")},
          }
          return returnData[score] || {color: '', text: ''}
     }
     const passStrengthData = checkPassStrength(score)
     return (
          <>
               <PasswordInput {...props} value={value}/>
               <Progress value={score*25}/>
               <p className="font-semibold text-right" style={{color: passStrengthData.color}}>{passStrengthData.text}</p>
          </>
     )
}