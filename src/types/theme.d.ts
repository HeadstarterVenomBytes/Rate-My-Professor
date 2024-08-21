import { Theme, ThemeOptions } from "@mui/material/styles";

interface CustomPaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText?: string;
}

interface CustomPalette {
  tertiary: CustomPaletteColor;
  primaryContainer: CustomPaletteColor;
  secondaryContainer: CustomPaletteColor;
  tertiaryContainer: CustomPaletteColor;
  errorContainer: CustomPaletteColor;
  surface: CustomPaletteColor;
  surfaceDim: Omit<CustomPaletteColor, "contrastText">;
  surfaceBright: Omit<CustomPaletteColor, "contrastText">;
  surfaceContainerLowest: Omit<CustomPaletteColor, "contrastText">;
  surfaceContainerLow: Omit<CustomPaletteColor, "contrastText">;
  surfaceContainer: Omit<CustomPaletteColor, "contrastText">;
  surfaceContainerHigh: Omit<CustomPaletteColor, "contrastText">;
  surfaceContainerHighest: Omit<CustomPaletteColor, "contrastText">;
  onSurface: Omit<CustomPaletteColor, "contrastText">;
  onSurfaceVariant: Omit<CustomPaletteColor, "contrastText">;
  outline: Omit<CustomPaletteColor, "contrastText">;
  outlineVariant: Omit<CustomPaletteColor, "contrastText">;
  inverseSurface: Omit<CustomPaletteColor, "contrastText">;
  inverseOnSurface: Omit<CustomPaletteColor, "contrastText">;
  inversePrimary: Omit<CustomPaletteColor, "contrastText">;
  scrim: Omit<CustomPaletteColor, "contrastText">;
  shadow: Omit<CustomPaletteColor, "contrastText">;
}

interface CustomTheme extends Theme {
  palette: Theme["palette"] & CustomPalette;
}

interface CustomThemeOptions extends ThemeOptions {
  palette?: Partial<CustomTheme["palette"]>;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partial<CustomPalette> {}

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
