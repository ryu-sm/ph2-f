export const clearStorage = () => localStorage.clear();
export const setToken = (token) => localStorage.setItem('accessToken', token);
export const setSalesCompanyOrgId = (id) => localStorage.setItem('s_sales_company_org_id', id);
export const getSalesCompanyOrgId = () => localStorage.getItem('s_sales_company_org_id');
