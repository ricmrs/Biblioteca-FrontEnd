import { BaseComponent } from "@/theme/BaseComponent";
import { StyleSheet } from "@/theme/StyleSheet";
import * as icons from './svgs/_index';

const iconSizes = {
  xs: 40,
  md: 48,
} as const;

interface IconProps {
  name: keyof typeof icons;
  styleSheet?: StyleSheet;
  viewBox?: [number, number];
}
export default function Icon({ name, styleSheet, viewBox, ...props }: IconProps) {
  const CurrentIcon = icons[name];
  return (
    <BaseComponent
      as="svg"
      styleSheet={{
        width: { xs: iconSizes.xs, md: iconSizes.md },
        height: { xs: iconSizes.xs, md: iconSizes.md },
        ...styleSheet,
      }}
      color="inherit"
      fill="currentColor"
      viewBox={`0 0 ${viewBox![0]} ${viewBox![1]}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <CurrentIcon />
    </BaseComponent>
  )
}

Icon.defaultProps = {
  name: 'default_icon',
  viewBox: [48, 48]
}
