import { useTheme } from "@/theme/ThemeProvider";
import Box from "../Box";
import Link from "../Link";
import { StyleSheet } from "@/theme/StyleSheet";

interface NavBarProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styleSheet?: StyleSheet;
}

export default function NavBar({ onClick, styleSheet }: NavBarProps) {
  const theme = useTheme();

  const linkStyles = {
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
    color: theme.colors.neutral.x000,
    hover: { color: theme.colors.accent.x100 },
    focus: { color: theme.colors.accent.x200 },
  }

  const boxStyles = {
    width: "10px",
    height: "10px",
    backgroundColor: theme.colors.primary.x200,
  }

  return (
    <Box tag="nav" styleSheet={{
      gap: { xs: "30px", md: "30px", xl: "60px" },
      ...styleSheet
    }}>
      <Link href="#skills" variant="heading3" styleSheet={{ ...linkStyles }} onClick={onClick}><Box styleSheet={{ ...boxStyles }}/>Skills</Link>
      <Link href="#projetos" variant="heading3" styleSheet={{ ...linkStyles }} onClick={onClick}><Box styleSheet={{ ...boxStyles }}/>Projetos</Link>
      <Link href="#sobre" variant="heading3" styleSheet={{ ...linkStyles }} onClick={onClick}><Box styleSheet={{ ...boxStyles }}/>Sobre</Link>
    </Box>
  )
}



