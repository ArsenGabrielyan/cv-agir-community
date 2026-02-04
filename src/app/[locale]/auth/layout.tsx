export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
     return (
          <div className="h-screen flex items-center justify-center bg-linear-to-br from-primary via-accent to-background p-3">
               {children}
          </div>
     )
}