import { Button } from "@/components/ui/button"
import { Circle, Square, Squircle } from "lucide-react"
import {BorderStyles} from "@db"
import { useTranslations } from "next-intl";

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps{
     borderStyle: BorderStyles | undefined
     onChange: (borderStyle: BorderStyles) => void
}
export default function BorderStyleButton({borderStyle, onChange}: BorderStyleButtonProps){
     const handleClick = () => {
          const currStyle = borderStyle ?? borderStyles[0]
          const currIndex = borderStyles.indexOf(currStyle);
          const nextIndex = (currIndex+1) % borderStyles.length;
          onChange(borderStyles[nextIndex])
     }
     const Icon = borderStyle === "square" ? Square : borderStyle === "circle" ? Circle : Squircle;
     const t = useTranslations("editor.change-style")
     return (
          <Button
               variant="outline"
               size="icon"
               title={t("border-style")}
               onClick={handleClick}
          >
               <Icon className="size-5"/>
          </Button>
     )
}