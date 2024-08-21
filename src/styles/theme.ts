"use client";
import {
  createTheme,
  ThemeOptions,
  lighten,
  darken,
  responsiveFontSizes,
} from "@mui/material/styles";

import { Poppins, Mulish } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const mulish = Mulish({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#a0cafd",
      light: lighten("#a0cafd", 0.3),
      dark: darken("#a0cafd", 0.3),
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#535f70",
      light: lighten("#535f70", 0.3),
      dark: darken("#535f70", 0.3),
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#6b5778",
      light: lighten("#6b5778", 0.3),
      dark: darken("#6b5778", 0.3),
      contrastText: "#ffffff",
    },
    error: {
      main: "#ba1a1a",
      light: lighten("#ba1a1a", 0.3),
      dark: darken("#ba1a1a", 0.3),
      contrastText: "#ffffff",
    },
    primaryContainer: {
      main: "#d1e4ff",
      light: lighten("#d1e4ff", 0.3),
      dark: darken("#d1e4ff", 0.3),
      contrastText: "#001d36",
    },
    secondaryContainer: {
      main: "#d6e3f7",
      light: lighten("#d6e3f7", 0.3),
      dark: darken("#d6e3f7", 0.3),
      contrastText: "#101c2b",
    },
    tertiaryContainer: {
      main: "#f2daff",
      light: lighten("#f2daff", 0.3),
      dark: darken("#f2daff", 0.3),
      contrastText: "#251431",
    },
    errorContainer: {
      main: "#ffdad6",
      light: lighten("#ffdad6", 0.3),
      dark: darken("#ffdad6", 0.3),
      contrastText: "#410002",
    },
    surface: {
      main: "#f8f9ff",
      light: lighten("#f8f9ff", 0.3),
      dark: darken("#f8f9ff", 0.3),
      contrastText: "#191c20",
    },
    surfaceDim: {
      main: "#d8dae0",
      light: lighten("#d8dae0", 0.3),
      dark: darken("#d8dae0", 0.3),
    },
    surfaceBright: {
      main: "#f8f9ff",
      light: lighten("#f8f9ff", 0.3),
      dark: darken("#f8f9ff", 0.3),
    },
    surfaceContainerLowest: {
      main: "#ffffff",
      light: lighten("#ffffff", 0.3),
      dark: darken("#ffffff", 0.3),
    },
    surfaceContainerLow: {
      main: "#f2f3f9",
      light: lighten("#f2f3f9", 0.3),
      dark: darken("#f2f3f9", 0.3),
    },
    surfaceContainer: {
      main: "#eceef4",
      light: lighten("#eceef4", 0.3),
      dark: darken("#eceef4", 0.3),
    },
    surfaceContainerHigh: {
      main: "#e6e8ee",
      light: lighten("#e6e8ee", 0.3),
      dark: darken("#e6e8ee", 0.3),
    },
    surfaceContainerHighest: {
      main: "#e1e2e8",
      light: lighten("#e1e2e8", 0.3),
      dark: darken("#e1e2e8", 0.3),
    },
    onSurface: {
      main: "#191c20",
      light: lighten("#191c20", 0.3),
      dark: darken("#191c20", 0.3),
    },
    onSurfaceVariant: {
      main: "#42474e",
      light: lighten("#42474e", 0.3),
      dark: darken("#42474e", 0.3),
    },
    outline: {
      main: "#73777f",
      light: lighten("#73777f", 0.3),
      dark: darken("#73777f", 0.3),
    },
    outlineVariant: {
      main: "#c3c7cf",
      light: lighten("#c3c7cf", 0.3),
      dark: darken("#c3c7cf", 0.3),
    },
    inverseSurface: {
      main: "#2e3135",
      light: lighten("#2e3135", 0.3),
      dark: darken("#2e3135", 0.3),
    },
    inverseOnSurface: {
      main: "#eff0f7",
      light: lighten("#eff0f7", 0.3),
      dark: darken("#eff0f7", 0.3),
    },
    inversePrimary: {
      main: "#a0cafd",
      light: lighten("#a0cafd", 0.3),
      dark: darken("#a0cafd", 0.3),
    },
    scrim: {
      main: "#000000",
      light: lighten("#000000", 0.3),
      dark: darken("#000000", 0.3),
    },
    shadow: {
      main: "#000000",
      light: lighten("#000000", 0.3),
      dark: darken("#000000", 0.3),
    },
  },
  typography: {
    fontFamily: mulish.style.fontFamily,
    h1: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h6: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: poppins.style.fontFamily,
    },
    subtitle2: {
      fontFamily: poppins.style.fontFamily,
    },
    body1: {
      fontFamily: mulish.style.fontFamily,
    },
    body2: {
      fontFamily: mulish.style.fontFamily,
    },
    button: {
      fontFamily: mulish.style.fontFamily,
      textTransform: "none",
    },
    caption: {
      fontFamily: mulish.style.fontFamily,
    },
    overline: {
      fontFamily: mulish.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8f9ff",
          color: "#191c20",
        },
      },
    },
  },
};

const baseTheme = createTheme(themeOptions);
const theme = responsiveFontSizes(baseTheme);
export default theme;
