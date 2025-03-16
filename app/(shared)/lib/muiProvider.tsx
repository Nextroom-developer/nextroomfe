"use client";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";

import themeMui from "@/(shared)/styles/ThemeMUI.json";

function MuiProvider({ children }: PropsWithChildren) {
  const theme = createTheme(themeMui as any);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default MuiProvider;
