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
  if (s_sales_company_org_id) {
    return await service.get(`/orgs?s_sales_company_org_id=${s_sales_company_org_id}`);
  } else {
    return await service.get(`/orgs`);
  }
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

//
export const adManagerLogin = async (data) => {
  return await service.post('/manager/token', data);
};

export const adSalesPersonLogin = async (data) => {
  return await service.post('/sales-person/token', data);
};
export const adManagerResetPasswordVerifyEmail = async (data) => {
  return await service.post('/manager/password/verify-email', data);
};

export const adSalesPersonResetPasswordVerifyEmail = async (data) => {
  return await service.post('/sales-person/password/verify-email', data);
};

export const adManagerResetPassword = async (data) => {
  return await service.post('/manager/password', data);
};

export const adSalesPersonResetPassword = async (data) => {
  return await service.post('/sales-person/password', data);
};

export const adManagerUpdatePassword = async (data) => {
  return await service.put('/manager/password', data);
};

export const adSalesPersonUpdatePassword = async (data) => {
  return await service.put('/sales-person/password', data);
};

export const adManagerPreliminaries = async (status) => {
  return await service.get(`/manager/preliminaries?status=${status}`);
};

export const adSalesPersonPreliminaries = async (status) => {
  return await service.get(`/sales-person/preliminaries?status=${status}`);
};

export const adUpdatePreliminarieManagerId = async (data) => {
  return await service.put('/preliminarie/s_manager_id', data);
};

export const adUpdatePreliminarieSalesPersonId = async (data) => {
  return await service.put('/preliminarie/s_sales_person_id', data);
};

export const adUpdatePreliminarieSalesAreaId = async (data) => {
  return await service.put('/preliminarie/sales_area_id', data);
};

export const adUpdatePreliminarieSalesExhibitionHallId = async (data) => {
  return await service.put('/preliminarie/sales_exhibition_hall_id', data);
};

export const adGetSalesPersonOptions = async (parent_id) => {
  return await service.get(`/sales_person_options?parent_id=${parent_id}`);
};

export const adGetSalesExhibitionHallOptions = async (parent_id) => {
  return await service.get(`/sales_exhibition_hall_options?parent_id=${parent_id}`);
};

export const adGetPairLoanOptions = async (p_application_header_id) => {
  return await service.get(`/pair_loan_options?id=${p_application_header_id}`);
};

export const adUnPairLoan = async (data) => {
  return await service.put('/manager/un-pair-loan', data);
};

export const adSetPairLoan = async (data) => {
  return await service.put('/manager/set-pair-loan', data);
};

export const adGetMemo = async (p_application_header_id) => {
  return await service.get(`/manager/memos?id=${p_application_header_id}`);
};

export const adNewMemo = async (data) => {
  return await service.post(`/manager/memo`, data);
};

export const adUpdateMemo = async (data) => {
  return await service.put(`/manager/memo`, data);
};

export const adUpdateProvisionalAfterResult = async (data) => {
  return await service.put(`/manager/provisional_after_result`, data);
};

export const adGetPreliminary = async (p_application_header_id) => {
  return await service.get(`/preliminary/${p_application_header_id}`);
};

export const apGetPublicHolidays = async (year) => {
  return await service.get(`https://date.nager.at/api/v2/publicholidays/${year}/jp`);
};
