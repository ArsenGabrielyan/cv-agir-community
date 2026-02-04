import { IEditorStep } from "@/lib/types";

export default function useEditorSteps<Props>(steps: IEditorStep<Props>[], currStep: string){
     const prevStep = steps.find(
          (_,i)=> steps[i+1]?.key===currStep
     )?.key
     const nextStep = steps.find(
          (_,i)=>steps[i-1]?.key===currStep
     )?.key;
     const lastStep = currStep === steps[steps.length-1].key;
     return {prevStep, nextStep, lastStep}
}