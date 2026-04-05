
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { SiCss3, SiHtml5 } from "react-icons/si"

export type CodeTextAreaProps = React.ComponentProps<"textarea"> & {
     type: "html" | "css",
     label?: string
}
export function CodeTextArea({type, label, ...props}: CodeTextAreaProps) {
     return (
     <div className="grid w-full gap-4">
          <InputGroup className="w-full">
               <InputGroupTextarea
                    {...props}
                    id="textarea-code-32"
                    placeholder={type==="html" ? "<h2>Template</h2>" : ".template{\n\tcolor: blue\n}"}
                    className="min-h-[300px] font-mono"
                    rows={16}
               />
               <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText className="font-medium">
                         {type==="html" ? (
                              <SiHtml5/>
                         ) : (
                              <SiCss3/>
                         )}
                         {label}
                    </InputGroupText>
               </InputGroupAddon>
          </InputGroup>
     </div>
     )
}