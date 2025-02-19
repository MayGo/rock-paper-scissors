"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}
