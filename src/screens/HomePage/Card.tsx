import Button from "@/components/Button";
import { ColorVariant } from "@/components/Button/colorVariantBy";
import { useTheme } from "@/theme/ThemeProvider";

interface CardProps {
  title: string;
  href: string;
  colorVariant: ColorVariant;
}

export default function Card({ title, href, colorVariant }: CardProps) {
  const theme = useTheme();
  return (
    <Button 
      href={href}
      colorVariant={colorVariant}
      colorVariantEnabled
      styleSheet={{
        padding: 25,
        fontSize: { xs: 24, md: 32 },
        border: `3px solid ${theme.colors[colorVariant].x300}`
      }}
    >
      {title}
    </Button>
  )
}
