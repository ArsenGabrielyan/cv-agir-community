import { ARR_FIELD_INITIAL_VALUES } from "@/lib/constants";
import { IResumeDynamicFields } from "@/lib/types";
import { ArrayPath, FieldArray, FieldValues, useFieldArray, UseFormReturn } from "react-hook-form";
import {DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable"

export function useResumeDynamicField<TSchema extends FieldValues>(form: UseFormReturn<TSchema>, name: ArrayPath<TSchema>){
     const {fields, append, remove, move} = useFieldArray({
          control: form.control,
          name,
     })
     function addValue<K extends keyof IResumeDynamicFields>(){
          const value: IResumeDynamicFields[K] = ARR_FIELD_INITIAL_VALUES[name as K];
          append(value as FieldArray<TSchema, ArrayPath<TSchema>>)
     }
     const sensors = useSensors(
          useSensor(PointerSensor),
          useSensor(KeyboardSensor,{
               coordinateGetter: sortableKeyboardCoordinates
          })
     )

     function handleDragEnd(e: DragEndEvent){
          const {active,over} = e
          if(over && active.id!==over.id){
               const oldI = fields.findIndex(field=>field.id===active.id);
               const newI = fields.findIndex(field=>field.id===over.id);
               move(oldI,newI);
               return arrayMove(fields,oldI,newI);
          }
     }

     return {
          fields,
          remove,
          addValue,
          sensors,
          handleDragEnd
     }
}