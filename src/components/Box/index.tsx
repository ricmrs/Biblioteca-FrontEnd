import { BaseComponent } from "@/theme/BaseComponent";
import { StyleSheet } from "@/theme/StyleSheet";
import React from 'react';

interface BoxProps {
  tag?: 'main' | 'div' | 'article' | 'section' | 'ul' | string;
  id?: string;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
}
export default function Box({ styleSheet, children, tag, id, ...props }: BoxProps) {
  const Tag = tag || 'div';
  return (
    <BaseComponent as={Tag} styleSheet={styleSheet} id={id} {...props}>
      {children}
    </BaseComponent>
  );
}
