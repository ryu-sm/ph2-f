import service from '@/libs/axios';

export const spRegisterVerifyEmail = async (data) => {
  return await service.post('/user/verify-email', data);
};

export const spResetPasswordVerifyEmail = async (data) => {
  return await service.post('/user/password/verify-email', data);
};

export const spChangeEmailVerifyEmail = async (data) => {
  return await service.post('/user/email/verify-email', data);
};

export const spRegister = async (data) => {
  return await service.post('/user', data);
};

export const spResetPassword = async (data) => {
  return await service.post('/user/password', data);
};

export const spChangeEmail = async (data) => {
  return await service.put('/user/email', data);
};

export const spLogin = async (data) => {
  return await service.post('/user/token', data);
};

export const spLogout = async () => {
  return await service.delete('/user/token');
};

export const spUpdatePassword = async (data) => {
  return await service.put('/user/password', data);
};

export const spUnsubcribed = async () => {
  return await service.delete('/user');
};

export const spGetBanks = async () => {
  return await service.get('/banks');
};

export const spGetPublicHolidays = async (year) => {
  return await service.get(`https://date.nager.at/api/v2/publicholidays/${year}/jp`);
};
