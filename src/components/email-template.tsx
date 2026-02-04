import {Body, Container, Font, Head, Heading, Html, Img, Preview, Section, Tailwind, Text} from "@react-email/components"

interface TemplateLayoutProps{
     title: string,
     copyrightText: string,
     children: React.ReactNode,
}

export default function EmailTemplate({title, children, copyrightText}: TemplateLayoutProps){
     const year = new Date().getFullYear();
     return (
          <Html>
               <Head>
                    <Font
                         fontFamily="Segoe UI"
                         fallbackFontFamily="sans-serif"
                    />
               </Head>
               <Preview>{title}</Preview>
               <Tailwind>
                    <Body className="bg-blue-100">
                         <Container className="p-4 w-full" style={{ maxWidth: '672px' }}>
                              <Section className="text-center mt-8 mb-8">
                                   <Img
                                        src="https://nlufwtlc3xvedi7i.public.blob.vercel-storage.com/logo.png"
                                        alt="logo"
                                        width={200}
                                        height={70}
                                        className="inline-block"
                                   />
                              </Section>
                              <Section className="bg-white text-black border border-solid border-gray-300 shadow rounded-xl p-6 space-y-4">
                                   <Heading
                                        as="h1"
                                        className="scroll-m-20 border-solid border-slate-300 pb-2 text-3xl font-semibold tracking-tight m-0"
                                        style={{ borderWidth: 0, borderBottomWidth: "1px", }}
                                   >
                                        {title}
                                   </Heading>
                                   {children}
                              </Section>
                              <Section className="text-center mt-8 mb-8">
                                   <Text className="m-0 text-sm text-gray-600">
                                        &copy; {year} {copyrightText}
                                   </Text>
                              </Section>
                         </Container>
                    </Body>
               </Tailwind>
          </Html>
     )
}