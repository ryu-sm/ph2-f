export const APP_MODE = 'dev'; // dev || stg || prd
export const APP_SERVER_URL = 'http://0.0.0.0:8000';

// スタティック資源
export const TERM_OF_SERVICE = '/pdfs/利用規約.pdf';
export const CONFIRMATION_URL = '/pdfs/銀行代理業にかかる確認書.pdf';
export const CONSENT_URL = '/pdfs/個人情報の取扱いに関する同意書兼表明および確約書.pdf';

// 業務関連
export const MCJ_CODE = '0039';

export const BANK_NOT_VALID_DAYS = ['01/01', '01/02', '01/03', '12/31'];

export const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': ['.jpeg'],
  'image/jpg': ['.jpg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
};

export const MAX_SIZE_FILE = 35 * 1000 * 1000;
