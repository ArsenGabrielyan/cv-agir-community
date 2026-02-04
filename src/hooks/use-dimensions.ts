import { UseDimensionsReturnType } from "@/lib/types";
import React, { useEffect, useState } from "react";

export default function useDimensions<T extends HTMLElement>(containerRef: React.RefObject<T | null>){
     const [dimensions, setDimensions] = useState<UseDimensionsReturnType>({width: 0, height: 0});
     useEffect(()=>{
          const currRef = containerRef.current;

          const getDimensions = (): UseDimensionsReturnType => ({
               width: currRef?.offsetWidth || 0,
               height: currRef?.offsetHeight || 0
          })

          const resizeObserver = new ResizeObserver(entries=>{
               const entry = entries[0];
               if(entry){
                    setDimensions(getDimensions());
               }
          })

          if(currRef){
               resizeObserver.observe(currRef)
               setDimensions(getDimensions());
          }

          return () => {
               if(currRef){
                    resizeObserver.unobserve(currRef);
               }
               resizeObserver.disconnect();
          }
     },[containerRef])

     return dimensions
}