"use client";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";

import theme from "@/(shared)/styles/theme";

function StyledProvider({ children }: PropsWithChildren) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

export default StyledProvider;
