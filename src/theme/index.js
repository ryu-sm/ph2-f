import { extendTheme } from '@chakra-ui/react';
import { textStyle } from './components/text';
import { buttonStyle } from './components/button';
import { checkboxStyle } from './components/checkbox';

export const theme = extendTheme({
  colors: {
    sp: {
      primary: {
        20: '#EEF0FF',
        40: '#E4E7FF',
        60: '#A9AFEA',
        80: '#979CCF',
        100: '#6C70F1',
      },
      secondary: {
        20: '#FFF4F7',
        100: '#E54E75',
      },
      gray: {
        50: '#FAFAFA',
        100: '#F2F2F2',
        200: '#4F4F4F',
        250: '#9F9F9F',
      },
      text: {
        main: '#333333',
      },
      focus: '#FFFAC5',
      placeholder: '#BDBDBD',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  background: {
    sp: {
      wrapper: 'rgba(0,0,0,.03)',
      gradation: 'linear-gradient(180deg, #F9F1F7 0%, #B8D3F3 100%)',
    },
  },
  components: {
    Text: textStyle,
    Button: buttonStyle,
    Checkbox: checkboxStyle,
  },
  styles: {
    global: () => ({
      'html, body, :root': {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overscrollBehavior: 'none',
        transition: ' none !important',
      },
      '.day-of-week-0, .day-of-week-6': {
        backgroundColor: '#E7E7E7',
      },
      '.is-public-holiday, .is-public-holiday:hover': {
        backgroundColor: '#FF8F8F',
      },
      '.is-public-holiday-desired, .is-public-holiday-desired:hover': {
        backgroundColor: '#E7E7E7',
      },
    }),
  },
});
