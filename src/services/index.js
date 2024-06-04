import { service } from '@/libs';

export const apRegisterVerifyEmail = async (data) => {
  return await service.post('/user/verify-email', data);
};

export const apSalesPersonRegisterVerifyEmail = async (data) => {
  return await service.post('/sales-person/verify-email', data);
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

export const apSalesPersonRegister = async (data) => {
  return await service.post('/sales-person', data);
};

export const apSalesPersonAzureRegister = async (data) => {
  return await service.post('/azure/sales-person', data);
};

export const apLogin = async (data) => {
  return await service.post('/user/token', data);
};

export const apLogout = async () => {
  return await service.delete(`/user/token`);
};

export const adManagerLogout = async () => {
  return await service.delete(`/manager/token`);
};

export const adSalesPersonLogout = async () => {
  return await service.delete(`/sales-person/token`);
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

export const apSaveDraft = async (data) => {
  return await service.post('/user/draft', data);
};

export const apGetDraft = async () => {
  return await service.get('/user/draft');
};

export const apAgentSend = async (data) => {
  return await service.post('/application', data);
};

export const apGetSendedApplication = async (c_user_id) => {
  return await service.get(`/application/${c_user_id}`);
};
export const apUpdateSendedInfo = async (c_user_id, data) => {
  return await service.put(`/application/${c_user_id}`, data);
};

//
export const adUpdatePreliminary = async (p_application_header_id, data) => {
  return await service.put(`/preliminary/${p_application_header_id}`, data);
};

export const adManagerLogin = async (data) => {
  return await service.post('/manager/token', data);
};

export const adSalesPersonLogin = async (data) => {
  return await service.post('/sales-person/token', data);
};

export const adSalesPersonAzureLogin = async (code) => {
  return await service.post(`/azure/sales-person/login/${code}`);
};

export const adSalesPersonSalesCompanyOrgId = async (data) => {
  return await service.post('/azure/sales-person/s_sales_company_org', data);
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

export const adManagerPreliminariesFile = async (status) => {
  return await service.get(`/manager/preliminaries/file?status=${status}`);
};

export const adSalesPersonPreliminaries = async (status) => {
  return await service.get(`/sales-person/preliminaries?status=${status}`);
};

export const adSalesPersonPreliminariesFile = async (status) => {
  return await service.get(`/sales-person/preliminaries/file?status=${status}`);
};

export const adGetPairLoanOptions = async (p_application_header_id, is_seted) => {
  return await service.get(`/pair_loan_options?id=${p_application_header_id}&is_seted=${is_seted}`);
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

export const adGetUpdateHistory = async (p_application_header_id, key) => {
  return await service.get(`/edit_histories/${p_application_header_id}?update_history_key=${key}`);
};

export const adGetFilesView = async (p_application_header_id, type, category) => {
  return await service.get(`/files-view/${p_application_header_id}?type=${type}&category=${category}`);
};

export const adGetPborrowingsFilesView = async (p_application_header_id) => {
  return await service.get(`/p_borrowings/files-view/${p_application_header_id}`);
};

export const adUpdateProvisionalResult = async (data) => {
  return await service.put(`/manager/provisional_result`, data);
};

export const adUpdateApproverConfirmation = async (data) => {
  return await service.put(`/manager/approver_confirmation`, data);
};

export const adUpdatePreExaminationStatus = async (data) => {
  return await service.put(`/manager/pre_examination_status`, data);
};

export const adDeleteProvisionalResult = async (data) => {
  return await service.post(`/manager/provisional_result`, data);
};

export const adAddArchiveFiles = async (data) => {
  return await service.post('/sales-person/c_archive_files', data);
};

export const adGetSalesPersonDocs = async () => {
  return await service.get(`/sales-person/c_archive_files`);
};

export const adGetManagerDocs = async () => {
  return await service.get(`/manager/c_archive_files`);
};

export const adGetArchiveFile = async (id) => {
  return await service.get(`/c_archive_files/${id}`);
};

export const adDeleteArchiveFiles = async (id) => {
  return await service.delete(`/c_archive_files/${id}`);
};

export const adUpdateArchiveFile = async (id) => {
  return await service.delete(`/c_archive_file/${id}`);
};

export const adUpdateArchiveFileNote = async (id, data) => {
  return await service.put(`/c_archive_file/${id}/note`, data);
};

export const adGetSalesCompanyOptionsCategory = async (category) => {
  return await service.get(`/s_sales_company_options/${category}`);
};

export const adGetSalesPersonOptionsAll = async () => {
  return await service.get(`/sales_person_options/all`);
};

export const apGetMessages = async () => {
  return await service.get(`/user/messages`);
};

export const insertNewMessage = async (data) => {
  return await service.post(`/message`, data);
};

export const updateMessages = async (data) => {
  return await service.put(`/messages`, data);
};

export const adGetManagerMessages = async () => {
  return await service.get(`/manager/messages`);
};

export const adGetSalesPersonMessages = async () => {
  return await service.get(`/sales-person/messages`);
};

export const adGetMessage = async (id, type) => {
  return await service.get(`/message?id=${id}&type=${type}`);
};

export const adDeleteMessage = async (id) => {
  return await service.delete(`/message/${id}`);
};

export const adGetRowData = async (p_application_header_id) => {
  return await service.get(`/row_data/${p_application_header_id}`);
};

export const adGetSalesPersonInfo = async (s_sales_person_id) => {
  return await service.get(`/sales-person/${s_sales_person_id}`);
};

export const adGetSalesPersonHostOrg = async () => {
  return await service.get(`/sales-person/host-org`);
};

// ap org
export const getOrgsInfos = async (s_sales_company_org_id) => {
  if (s_sales_company_org_id) {
    return await service.get(`/orgs-info?s_sales_company_org_id=${s_sales_company_org_id}`);
  } else {
    return await service.get(`/orgs-info`);
  }
};

export const getOrgsCategoryCWithID = async (s_sales_company_org_id) => {
  if (s_sales_company_org_id) {
    return await service.get(`/orgs/category-c?s_sales_company_org_id=${s_sales_company_org_id}`);
  } else {
    return await service.get(`/orgs/category-c`);
  }
};

export const getOrgsWithCategories = async (categories) => {
  return await service.get(`/orgs/category?categories=${categories}`);
};

export const getRegisterOrgsWithCategory = async (s_sales_company_org_id, category) => {
  return await service.get(`/register/orgs/${category}?s_sales_company_org_id=${s_sales_company_org_id}`);
};

export const getChildrenOrgsWithCategory = async (parent_id, category) => {
  if (parent_id) {
    return await service.get(`/orgs/children?parent_id=${parent_id}&category=${category}`);
  } else {
    return await service.get(`/orgs/children?category=${category}`);
  }
};

// TODO:
export const apGetSalesCompanyOrgs = async (s_sales_company_org_id) => {
  if (s_sales_company_org_id) {
    return await service.get(`/orgs?s_sales_company_org_id=${s_sales_company_org_id}`);
  } else {
    return await service.get(`/orgs`);
  }
};

// ad org

export const adUpdatePreliminaryManagerId = async (data) => {
  return await service.put('/preliminary/s_manager_id', data);
};

export const adGetAccessSalesPersonOptions = async (orgs_id) => {
  if (orgs_id) {
    return await service.get(`/orgs/s_sales_persons?orgs_id=${orgs_id}`);
  } else {
    return await service.get(`/orgs/s_sales_persons`);
  }
};

export const adUpdatePreliminarySalesAreaId = async (data) => {
  return await service.put('/preliminary/sales_area_id', data);
};

export const adUpdatePreliminarySalesPersonId = async (data) => {
  return await service.put('/preliminary/s_sales_person_id', data);
};

export const adUpdatePreliminarySalesExhibitionHallId = async (data) => {
  return await service.put('/preliminary/sales_exhibition_hall_id', data);
};

// TODO:delete
export const adGetSalesPersonOptions = async (parent_id) => {
  return await service.get(`/sales_person_options?parent_id=${parent_id}`);
};

// files
export const apGetPapplicationHeadersFiles = async (c_user_id) => {
  return await service.get(`/p_application_headers/files?c_user_id=${c_user_id}`);
};

export const apGetPapplicantPersonsFiles = async (c_user_id, type) => {
  return await service.get(`/p_applicant_persons/files?c_user_id=${c_user_id}&type=${type}`);
};

export const apGetPborrowingsFiles = async (c_user_id) => {
  return await service.get(`/p_borrowings/files?c_user_id=${c_user_id}`);
};

// c_access_logs

export const apGetCaccessLogs = async (start, end) => {
  if (start && end) {
    return await service.get(`/c_access_logs?start=${start}&end=${end}`);
  }
  if (!start && end) {
    return await service.get(`/c_access_logs?end=${end}`);
  }
  if (start && !end) {
    return await service.get(`/c_access_logs?start=${start}`);
  }
  if (!start && !end) {
    return await service.get(`/c_access_logs`);
  }
};

export const apGetPreExaminationStatus = async (apply_no) => {
  return await service.get(`/pre_examination_status?apply_no=${apply_no}`);
};

export const adGetProvisionalStatus = async (p_application_header_id) => {
  return await service.get(`/provisional_status/${p_application_header_id}`);
};

export const adGetUploadFile = async (p_application_header_id) => {
  return await service.get(`/s_sales_company_orgs/upload_file/${p_application_header_id}`);
};

export const adGetSalesCompanyId = async (sales_person_id) => {
  return await service.get(`/s_sales_company_org_id?sales_person_id=${sales_person_id}`);
};

export const adGetSalesPersonBelowOrgs = async () => {
  return await service.get(`/sales-person/below-orgs`);
};

export const adGetSalesPersonPreliminariyAccess = async (p_application_header_id) => {
  return await service.get(`/sales-person/preliminariy/access/${p_application_header_id}`);
};

export const adGetManagerRole = async () => {
  return await service.get(`/manager/role`);
};

export const adGetUserSalesCompanyOrgId = async () => {
  return await service.get(`/user/s_sales_company_org_id`);
};

// /sales-person/orgs

export const adGetSalesPersonOrgs = async (s_sales_person_id) => {
  return await service.get(`/sales-person/orgs?s_sales_person_id=${s_sales_person_id}`);
};

export const apTranslteOrgId = async (code) => {
  return await service.get(`/translate-host-org/${code}`);
};
