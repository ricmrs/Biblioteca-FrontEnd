import { BaseComponent } from "@/theme/BaseComponent";
import { StyleSheet } from "@/theme/StyleSheet";

interface ImageProps {
  src: string
  alt: string;
  styleSheet?: StyleSheet;
}
export default function Image({ alt, src, styleSheet, ...props }: ImageProps) {
  return (
    <BaseComponent
      as="img"
      src={src}
      alt={alt}
      styleSheet={{ ...styleSheet }}
      {...props}
    />
  )
}
