// src/theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      royalBlue: string;
      celestialBlue: string;
      ghostWhite: string;
      cerise: string;
      smallListing: string;
      tan: string;
      turquoise: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      royalBlue?: string;
      celestialBlue?: string;
      ghostWhite?: string;
      cerise?: string;
      smallListing?: string;
      tan?: string;
      turquoise?: string;
    };
  }
}
