export const typography = {
  letterSpacing: "-0.4px",
  variants: {
    display1: {
      fontFamily: "'Press Start 2P', sans-serif",
      fontSize: {
        xs: "40px",
        md: "48px",
        xl: "60px"
      }
    },
    heading1: {
      fontFamily: "'Press Start 2P', sans-serif",
      fontSize: {
        xs: "32px",
        md: "40px",
        xl: "48px"
      },
    },
    heading2: {
      fontFamily: "'Press Start 2P', sans-serif",
      fontSize: {
        xs: "20px",
        md: "24px",
        xl: "36px"
      }
    },
    heading3: {
      fontFamily: "'Fira Code', sans-serif",
      fontWeight: 500,
      fontSize: {
        xs: "20px",
        md: "24px",
        xl: "30px"
      }
    },
    heading4: {
      fontFamily: "'Fira Code', sans-serif",
      fontSize: {
        xs: "16px",
        md: "20px",
        xl: "20px"
      }
    },
    heading5: {
      fontFamily: "'Fira Code', sans-serif",
      fontSize: {
        xs: "14px",
        md: "16px",
        xl: "16px"
      }
    },
    body: {
      fontFamily: "'Fira Code', sans-serif",
      fontSize: {
        xs: "18px",
        md: "18px",
        xl: "24px"
      }
    },
  }
} as const;
