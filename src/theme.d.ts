// src/theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      bodyBG: string;
      royalBlue: string;
      celestialBlue: string;
      ghostWhite: string;
      cerise: string;
      smallListing: string;
      inputBG: string;
      turquoise: string;
      listBoxBG1: string;
      listBoxBG2: string;
      priceSticker: string;
      soldSticker: string;
      submitButton: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      bodyBG?: string;
      royalBlue?: string;
      celestialBlue?: string;
      ghostWhite?: string;
      cerise?: string;
      smallListing?: string;
      inputBG?: string;
      turquoise?: string;
      listBoxBG1?: string;
      listBoxBG2?: string;
      priceSticker?: string;
      soldSticker?: string;
      submitButton?: string;
    };
  }
}
