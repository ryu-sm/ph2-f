import { AdMainWrapper } from '@/containers';
import { ManagerList } from './manager-list';
import { useIsManager } from '@/hooks';
import { SalesPersonList } from './sales-person-list';

export const DashboardPage = () => {
  const isManager = useIsManager();
  return <AdMainWrapper>{isManager ? <ManagerList /> : <SalesPersonList />}</AdMainWrapper>;
};
