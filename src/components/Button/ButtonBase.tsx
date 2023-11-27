import React from "react";
import styled from 'styled-components';
import { ThemeTypographyVariants } from "@/theme/theme";
import Text from "../Text";
import { StyleSheet } from "@/theme/StyleSheet";
import { useRouter } from "next/router";

const StyledButton = styled(Text)<any>``;

export interface ButtonBaseProps {
  href?: string;
  children: React.ReactNode;
  textVariant?: ThemeTypographyVariants;
  styleSheet?: StyleSheet;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ButtonBase({
  children,
  textVariant,
  styleSheet,
  href,
  ...props
}: ButtonBaseProps) {
  const router = useRouter();
  const ref = React.useRef();
  const isLink = Boolean(href);
  const Tag = isLink ? 'a' : 'button';
  
  return (  
    <StyledButton
      ref={ref}
      tag={Tag}
      href={href}
      styleSheet={{
        border: '0',
        backgroundColor: 'transparent',
        color: 'inherit',
        outline: '0',
        cursor: 'pointer',
        textDecoration: 'none',
        ...styleSheet
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        isLink && event.preventDefault();
        isLink && router.push(href!);
        !isLink && props.onClick && props.onClick(event);
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
