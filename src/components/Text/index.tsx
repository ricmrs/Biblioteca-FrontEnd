import { BaseComponent } from "@/theme/BaseComponent";
import { StyleSheet } from "@/theme/StyleSheet";
import { ThemeColors, ThemeTypographyVariants } from "@/theme/theme";
import { useTheme } from "@/theme/ThemeProvider";
import React from 'react';

interface TextProps {
  variant?: ThemeTypographyVariants;
  tag?: 'p' | 'li' | 'h1' | 'h2' | 'h2' | string;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  ref: any;
  colorVariant?: ThemeColors;
  colorVariantEnabled?: boolean;
  htmlFor?: string;
}
const Text = React.forwardRef(({
  tag,
  styleSheet, 
  variant,
  colorVariant,
  colorVariantEnabled,
  ...props
}: TextProps, ref) => {
  const theme = useTheme();
  const textVariant = theme.typography.variants[variant!];

  return (
    <BaseComponent
      as={tag}
      styleSheet={{
        ...textVariant,
        ...colorVariantEnabled && {
          color: theme.colors[colorVariant!].x050,
        },
        ...styleSheet,
      }}
      {...props}
    />
  )
})

Text.displayName = 'Text';

Text.defaultProps = {
  tag: 'p',
  variant: 'body',
  colorVariant: 'neutral',
  colorVariantEnabled: false
};

export default Text;
