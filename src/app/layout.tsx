import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/styles/theme";

export const metadata: Metadata = {
  title: "ProfPick",
  description: "Unlock your learning potential with the right Professor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <Analytics />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
