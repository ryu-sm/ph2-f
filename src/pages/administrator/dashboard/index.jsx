import { AdMainWrapper } from '@/containers';
import { ManagerList } from './manager-list';
import { useIsManager } from '@/hooks';
import { SalesPersonList } from './sales-person-list';
import { DashboardProvider } from '@/contexts/dashboard';

export const DashboardPage = () => {
  const isManager = useIsManager();
  return (
    <AdMainWrapper>
      <DashboardProvider>{isManager ? <ManagerList /> : <SalesPersonList />}</DashboardProvider>
    </AdMainWrapper>
  );
};
