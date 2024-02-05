import { defineStyleConfig } from '@chakra-ui/react';

export const checkboxStyle = defineStyleConfig({
  baseStyle: {
    control: {
      h: '20px',
      w: '20px',
      border: '1px solid',
      borderColor: 'sp.primary.100',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      _checked: {
        bg: 'sp.primary.100',
        border: 'none',
        _before: {
          content: '""',
          color: 'white',
        },
      },
    },
  },
  variants: {
    password: {
      control: {
        h: '16px',
        w: '16px',
        border: '1px solid',
        borderColor: 'sp.primary.40',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        _checked: {
          bg: 'sp.secondary.100',
          border: 'none',
          _before: {
            content: '""',
            color: 'white',
          },
        },
      },
    },
  },
  checkitem: {
    control: {
      h: '24px',
      w: '24px',
      border: '1px solid',
      borderColor: 'sp.primary.40',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      _checked: {
        bg: 'sp.primary.100',
        border: 'none',
        _before: {
          content: '""',
          color: 'white',
        },
      },
    },
  },
});
