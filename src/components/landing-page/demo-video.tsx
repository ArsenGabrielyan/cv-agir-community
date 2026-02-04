import useDemoVideoSize from "@/hooks/use-demo-video-size"
import { cn } from "@/lib/utils"
import React from "react"

interface VideoProps{
     src: string,
     srcFallback?: string
     alt: string,
     className?: string,
     thumbnail?: string
}

export default function DemoVideo({src, srcFallback, alt, className, thumbnail}: VideoProps){
     const {width, height} = useDemoVideoSize()
     return (
          <div className={cn("overflow-hidden flex items-center justify-center",className)} style={{
               width: width,
               height: height
          }}>
               <video className="w-full h-full object-contain" autoPlay muted playsInline loop preload="auto" poster={thumbnail} aria-label={alt}>
                    <source src={src} type="video/webm"/>
                    {srcFallback && <source src={srcFallback} type="video/mp4"/>}
                    Your browser does not support the video tag.
               </video>
          </div>
     )
}