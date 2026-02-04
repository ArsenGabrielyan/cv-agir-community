import useDemoVideoSize from "@/hooks/use-demo-video-size";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

export default function DemoVideoLoader(){
     const {width, height} = useDemoVideoSize();
     const t = useTranslations("loading");
     return (
          <Skeleton
               className="flex justify-center items-center"
               style={{
                    width,
                    height,
               }}
               aria-busy
               aria-label={t("video")}
          >
               <p className="text-muted-foreground text-lg">{t("original")}</p>
          </Skeleton>
     )
}