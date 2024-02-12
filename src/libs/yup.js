import * as yup from 'yup';

yup.setLocale({ mixed: { required: () => `この項目を入力してください。` } });
export { yup };
