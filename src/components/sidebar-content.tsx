"use client"
interface SidebarContentWrapperProps{
     title: string,
     children: React.ReactNode
}
export default function SidebarContentWrapper({title, children}: SidebarContentWrapperProps){
     return (
          <>
          <div className="flex justify-between items-center gap-5 mb-2">
               <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">{title}</h1>
          </div>
          {children}
          </>
     )
}