import React from "react";

interface SectionHeroProps{
     title: string,
     children?: React.ReactNode
}
export default function SectionHero({title, children}: SectionHeroProps){
     return (
          <section className="flex justify-center items-center text-center flex-col space-y-6 py-16 px-4 w-full bg-background bg-linear-to-br from-primary to-background to-40%" id="hero">
               <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">{title}</h1>
               {children}
          </section>
     )
}