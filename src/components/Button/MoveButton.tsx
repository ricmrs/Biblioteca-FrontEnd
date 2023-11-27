import { useTheme } from "@/theme/ThemeProvider";
import Button from ".";
import Icon from "../Icon";
import { StyleSheet } from "@/theme/StyleSheet";

interface MoveButtonProps {
  type: "previous" | "next";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  arrowStyleSheets?: StyleSheet;
  backgroundStyleSheets?: StyleSheet;
}

export default function MoveButton({ type, arrowStyleSheets, backgroundStyleSheets, ...props }: MoveButtonProps) {
  const theme = useTheme();
  return (
      <Button 
        styleSheet={{ 
          alignSelf: "center", 
          backgroundColor: theme.colors.accent.x500, 
          boxShadow: { xs: "3px 3px 0px 0px #000", xl: "5px 5px 0px 0px #000"}, 
          ...backgroundStyleSheets 
        }}
        {...props}
      >
        <Icon name={type} viewBox={[40, 40]} styleSheet={{ color: theme.colors.accent.x100, ...arrowStyleSheets }} />
      </Button>
  );
}
