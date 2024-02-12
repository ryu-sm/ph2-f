import { service } from '@/libs';

export const apRegisterVerifyEmail = async (data) => {
  return await service.post('/user/verify-email', data);
};

export const apResetPasswordVerifyEmail = async (data) => {
  return await service.post('/user/password/verify-email', data);
};

export const apChangeEmailVerifyEmail = async (data) => {
  return await service.post('/user/email/verify-email', data);
};

export const apRegister = async (data) => {
  return await service.post('/user', data);
};

export const apLogin = async (data) => {
  return await service.post('/user/token', data);
};

export const apResetPassword = async (data) => {
  return await service.post('/user/password', data);
};

export const apUnsubcribed = async () => {
  return await service.delete('/user');
};

export const apUpdatePassword = async (data) => {
  return await service.put('/user/password', data);
};

export const apChangeEmail = async (data) => {
  return await service.put('/user/email', data);
};
