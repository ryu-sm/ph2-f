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

export const apGetBanks = async () => {
  return await service.get('/banks');
};

export const apGetSalesCompanyOrgs = async (s_sales_company_org_id) => {
  return await service.get(`/orgs?s_sales_company_org_id=${s_sales_company_org_id}`);
};

export const apSaveDraft = async (data) => {
  return await service.post('/user/draft', data);
};

export const apGetDraft = async () => {
  return await service.get('/user/draft');
};

export const apAgentSend = async (data) => {
  return await service.post('/application', data);
};

export const apApplication = async (apply_no) => {
  return await service.get(`/application?apply_no=${apply_no}`);
};

export const apApplicationImg = async (apply_no) => {
  return await service.get(`/application/img?apply_no=${apply_no}`);
};

export const apPborrowings = async (apply_no) => {
  return await service.get(`/p_borrowings?apply_no=${apply_no}`);
};

export const apUpdateApplyInfo = async (apply_no, data) => {
  return await service.put(`/application?apply_no=${apply_no}`, data);
};
