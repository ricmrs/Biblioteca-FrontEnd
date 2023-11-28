import { useTheme } from "@/theme/ThemeProvider";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import { ButtonSize, buttonSize } from "./buttonSize";
import { ColorVariant, colorVariantBy, Variant } from "./colorVariantBy";

interface ButtonProps extends ButtonBaseProps {
  fullWidth?: boolean;
  children: React.ReactNode;
  colorVariant?: ColorVariant;
  colorVariantEnabled?: boolean;
  variant?: Variant;
  size?: ButtonSize;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Button({
  styleSheet,
  children,
  fullWidth,
  colorVariant,
  colorVariantEnabled,
  variant,
  size,
  onClick,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      styleSheet={{
        alignItems: 'center',
        justifyContent: 'center',
        transition: "transform 150ms ease-out",
        // [Color + Variant]
        ...(colorVariantEnabled && {...colorVariantBy(theme, colorVariant!, variant!)}),
        // [Size]
        ...buttonSize[size!],
        // [FullWidth]
        ...(fullWidth && {
          alignSelf: 'initial',
        }),
        ...styleSheet,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

Button.defaultProps = {
  fullWidth: false,
  colorVariantEnabled: false,
  size: 'auto',
  variant: 'contained',
  colorVariant: 'primary',
}

Button.Base = ButtonBase;
