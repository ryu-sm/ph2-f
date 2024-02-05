import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sp_solid = defineStyle({
  bg: 'sp.primary.100',
  color: 'white',
  borderRadius: '14px',
  fontFamily: 'Hiragino Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  _disabled: {
    opacity: 0.15,
    boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
    pointerEvents: 'none',
  },
  _hover: {
    opacity: 0.95,
    boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
  },
});

const sp_solid_secondary = defineStyle({
  bg: 'sp.primary.40',
  color: 'sp.primary.100',
  borderRadius: '14px',
  fontFamily: 'Hiragino Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  _disabled: {
    opacity: 0.15,
    boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
    pointerEvents: 'none',
  },
  _hover: {
    opacity: 0.95,
    boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
  },
});

const sp_outline = defineStyle({
  bg: 'white',
  color: 'sp.primary.100',
  border: '1px solid',
  borderColor: 'sp.primary.100',
  borderRadius: '14px',
  fontFamily: 'Hiragino Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  _disabled: {
    opacity: 0.3,
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  _hover: {
    opacity: 0.95,
    boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
  },
});

export const buttonStyle = defineStyleConfig({
  baseStyle: {
    w: '100%',
  },
  variants: {
    sp_solid,
    sp_outline,
    sp_solid_secondary,
  },
  sizes: {
    lg: {
      h: '54px',
    },
    md: {
      h: '40px',
    },
  },
});
