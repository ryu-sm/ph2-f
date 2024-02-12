export const clearStorage = () => localStorage.clear();
export const removeToken = () => localStorage.removeItem('accessToken');
export const setToken = (token) => localStorage.setItem('accessToken', token);
export const setSalesCompanyOrgId = (id) => localStorage.setItem('s_sales_company_org_id', id);
export const removeSalesCompanyOrgId = () => localStorage.removeItem('s_sales_company_org_id');
export const getSalesCompanyOrgId = () => localStorage.getItem('s_sales_company_org_id');
