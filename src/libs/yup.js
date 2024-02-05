import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: () => `この項目を入力してください。`,
  },
  string: {
    min: (prm) => `${prm.min}文字でご入力ください。`,
    max: (prm) => `${prm.max}文字以内で入力してください。`,
    matches: () => `正しくご入力ください。"`,
  },
  number: {
    min: (prm) => `${prm.min}以上である必要があります`,
    max: (prm) => `${prm.max}以下でなければなりません`,
    integer: () => `整数でなければなりません`,
  },
});

export default Yup;
