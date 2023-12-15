import Box from "@/components/Box";
import { useTheme } from "@/theme/ThemeProvider";
import { CircularProgress } from "@mui/material";

interface CarregandoProps {
  colorVariant: 'positive' | 'negative' | 'warning'; 
}

export default function Carregando({ colorVariant }: CarregandoProps ) {
  const theme = useTheme();
  const circularProgressColor = { 
    positive: "success", 
    negative: "error", 
    warning: "warning" } as { positive: "success", negative: "error", warning: "warning" }

  return (
    <>
      {Array(8).fill('').map((el, i) => (
        <Box key={i}
          styleSheet={{
            backgroundColor: theme.colors[colorVariant].x100,
            alignItems: "center",
            paddingVertical: { xs: 8, md: 12 },
            paddingHorizontal: 10,
          }}
        >
          <CircularProgress size={25} color={circularProgressColor[colorVariant]} />
        </Box>))}
    </>
  )
}
