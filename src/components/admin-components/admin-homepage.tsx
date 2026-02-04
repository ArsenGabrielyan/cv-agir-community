import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "@/i18n/routing";
import { useTheme, useTranslate } from "react-admin";
import { buttonVariants } from "@/components/ui/button";
import Logo from "../layout/logo";

export default function AdminHomePage(){
     const [theme] = useTheme();
     const t = useTranslate();
     return (
          <Box sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100dvh"
          }}>
               <Card sx={{maxWidth: 400, padding: 2, textAlign: "center"}}>
                    <CardContent sx={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexDirection: "column",
                         rowGap: 1
                    }}>
                         <Logo width={200} height={65} isAdmin isDark={theme==="dark"}/>
                         <Typography variant="h4" component="div" gutterBottom>{t("dashboard.title")}</Typography>
                         <Typography variant="body1" color="text.secondary">{t("dashboard.desc")}</Typography>
                         <Link href="/" className={buttonVariants({variant: "link"})}>{t("dashboard.goBack")}</Link>
                    </CardContent>
               </Card>
          </Box>
     )
}