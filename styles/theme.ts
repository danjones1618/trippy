import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "brand.secondary",
        borderColor: "brand.secondary",
      },
    }
  },
  colors: {
    brand: {
      primary: {
        50:  "#F8C2B4",
        100: "#F7B2A1",
        200: "#F5A38F",
        300: "#F3947C",
        400: "#F1856A",
        500: "#EE6C4D",
        600: "#EE6644",
        700: "#EC5732",
        800: "#EA481F",
        900: "#E03D15",
      },
      secondary: "#293241",
    }
  }
});

