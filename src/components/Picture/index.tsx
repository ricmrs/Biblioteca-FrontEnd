import { BaseComponent } from "@/theme/BaseComponent";
import { StyleSheet } from "@/theme/StyleSheet";

interface PictureProps {
  srcset?: { xs?: string, sm?: string , md?: string, lg?: string, xl?: string }
  alt: string;
  styleSheet?: StyleSheet; 
}
export default function Picture({ alt, srcset, styleSheet, ...props }: PictureProps) {
  return (
    <BaseComponent
      as='picture'
      styleSheet={{...styleSheet}}
    >
      {srcset?.xl && <BaseComponent as="source" srcSet={srcset?.xl} media="(min-width: 1200px)"/>}
      {srcset?.lg && <BaseComponent as="source" srcSet={srcset?.lg} media="(min-width: 992px)"/>}
      {srcset?.md && <BaseComponent as="source" srcSet={srcset?.md} media="(min-width: 768px)"/>}
      {srcset?.sm && <BaseComponent as="source" srcSet={srcset?.sm} media="(min-width: 480px)"/>}
      <BaseComponent 
        as="img"
        src={srcset?.xs}
        alt={alt}
        styleSheet={{...styleSheet}}
        {...props}
      />
    </BaseComponent>
  )
}
