"use client"

/*
jonobase by @joncoded (aka @jonchius)
/app/components/base/util/lite-dark.tsx
the next.js themes to lite/dark mode provider
*/

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}