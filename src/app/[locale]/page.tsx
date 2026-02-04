import PageLayout from "@/components/layout/page-layout";
import MainPageContent from "@/components/landing-page/main-content";

export default function Home() {
  return (
    <PageLayout isLandingPage>
      <MainPageContent/>
    </PageLayout>
  )
}