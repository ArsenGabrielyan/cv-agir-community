"use client"
import { ButtonGroup } from "@/components/ui/button-group";
import ModeToggler from "./theme";
import ColorToggler from "./colors";

export default function ThemeToggler(){
     return (
          <ButtonGroup>
               <ModeToggler/>
               <ColorToggler/>
          </ButtonGroup>
     )
}