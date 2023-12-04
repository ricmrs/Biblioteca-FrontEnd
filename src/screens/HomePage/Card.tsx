import Button from "@/components/Button";
import Link from "@/components/Link";
import { useTheme } from "@/theme/ThemeProvider";

interface CardProps {
  title: string;
  href: string;
}

export default function Card({ title, href }: CardProps) {
  const theme = useTheme();
  return (
    <Button 
      href={href}
      colorVariant="warning"
      colorVariantEnabled
      styleSheet={{
        padding: 20,
        border: `3px solid ${theme.colors.warning.x300}`
      }}
    >
      {title}
    </Button>
  )
}
