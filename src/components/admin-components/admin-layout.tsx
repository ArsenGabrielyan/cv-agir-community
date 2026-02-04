import { Box, Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { AppBar, Layout, TitlePortal } from "react-admin";
import Logo from "../layout/logo";

const AdminAppBar = () => {
     const isLargeEnough = useMediaQuery<Theme>(theme=>theme.breakpoints.up("md"));
     return (
          <AppBar color="secondary">
               <TitlePortal/>
               {isLargeEnough && <Logo width={200} height={40} isAdmin isDark/>}
               {isLargeEnough && <Box component="span" sx={{flex: 1}}/>}
          </AppBar>
     )
}

export const AdminLayout = ({children}: {children: React.ReactNode}) => (
     <Layout appBar={AdminAppBar}>
          {children}
     </Layout>
)