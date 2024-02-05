import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sp_24_130_bold = defineStyle({
  color: 'sp.primary.100',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '130%',
  textAlign: 'center',
});

const sp_24_100_bold = defineStyle({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '100%',
  fontFamily: 'Barlow',
});

const sp_20_130_bold = defineStyle({
  color: 'sp.primary.100',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '130%',
  textAlign: 'center',
});

const sp_18_100_bold = defineStyle({
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '100%',
  fontFamily: 'Barlow',
});

const sp_16_170 = defineStyle({
  fontSize: '16px',
  fontWeight: 300,
  lineHeight: '170%',
});

const sp_16_130_bold = defineStyle({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '130%',
});

const sp_16_100_bold = defineStyle({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '100%',
});

const sp_16_100 = defineStyle({
  fontSize: '16px',
  fontWeight: 300,
  lineHeight: '100%',
});

const sp_14_100_bold = defineStyle({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '100%',
});

const sp_14_150_bold = defineStyle({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '150%',
});

const sp_14_170 = defineStyle({
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '170%',
});

const sp_14_130 = defineStyle({
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '130%',
});

const sp_14_100 = defineStyle({
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '100%',
});

const sp_12_150 = defineStyle({
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '150%',
});

const sp_12_130_blod = defineStyle({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '130%',
});

const sp_12_120_blod = defineStyle({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '120%',
});

const sp_12_100 = defineStyle({
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '100%',
});

const sp_10_100_bold = defineStyle({
  fontSize: '10px',
  fontWeight: 500,
  lineHeight: '100%',
});

const sp_16_100_link = defineStyle({
  color: 'sp.primary.100',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  _hover: {
    cursor: 'pointer',
  },
});
const sp_14_130_link = defineStyle({
  color: 'sp.primary.100',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  textDecorationLine: 'underline',
  _hover: {
    cursor: 'pointer',
  },
});
const sp_14_100_link = defineStyle({
  color: 'sp.primary.100',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  textDecorationLine: 'underline',
  _hover: {
    cursor: 'pointer',
  },
});

const sp_12_100_link = defineStyle({
  color: 'sp.primary.100',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.6px',
  textDecorationLine: 'underline',
  _hover: {
    cursor: 'pointer',
  },
});

export const textStyle = defineStyleConfig({
  baseStyle: {
    color: 'sp.text.main',
    letterSpacing: '0.6px',
    fontFamily: 'Hiragino Sans',
    fontStyle: 'normal',
    whiteSpace: 'pre-wrap',
  },
  variants: {
    sp_24_130_bold,
    sp_24_100_bold,
    sp_20_130_bold,
    sp_18_100_bold,
    sp_16_170,
    sp_16_130_bold,
    sp_16_100_bold,
    sp_16_100_link,
    sp_16_100,
    sp_14_170,
    sp_14_130,
    sp_14_100_bold,
    sp_14_150_bold,
    sp_14_130_link,
    sp_14_100_link,
    sp_14_100,
    sp_12_150,
    sp_12_130_blod,
    sp_12_120_blod,
    sp_12_100_link,
    sp_12_100,
    sp_10_100_bold,
  },
});
