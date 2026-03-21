import { IFeature } from "@/lib/types";
import { BrainCog, Edit, Palette, QrCode } from "lucide-react";
import { Features } from "@/lib/types/enums";

export const FEATURES: IFeature[] = [
     {
          feature: Features.AiSuggestions,
          Icon: BrainCog
     },
     {
          feature: Features.EasyEdit,
          Icon: Edit
     },
     {
          feature: Features.QrResume,
          Icon: QrCode
     },
     {
          feature: Features.Design,
          Icon: Palette
     }
]