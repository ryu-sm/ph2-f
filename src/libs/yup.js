import * as yup from 'yup';

yup.setLocale({ mixed: { required: () => `この項目を入力してください。` } });

yup.setLocale({
  mixed: {
    required: 'この項目を入力してください。',
  },
  string: {
    max: '${max}文字以内で入力してください。',
    min: '${min}文字でご入力ください。',
    matches: '正しくご入力ください。',
  },
  number: {
    max: '${max}以下の数値ご入力ください。',
    min: '${min}より大きい数値で入力ください。',
    integer: '正しくご入力ください。',
  },
});

export { yup };
