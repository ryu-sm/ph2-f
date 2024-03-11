import { dashboardTabStatusAtom, preliminarieListSelect } from '@/store';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const result = useRecoilValueLoadable(preliminarieListSelect);
  const refreshPreliminarieList = useRecoilRefresher_UNSTABLE(preliminarieListSelect);
  const dashboardTabStatus = useRecoilValue(dashboardTabStatusAtom);

  useEffect(() => {
    if (result.state === 'hasError') {
      toast.error(API_500_ERROR);
    }
  }, [result.state, dashboardTabStatus]);

  const [preliminarieList, setPreliminarieList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    setSortBy(null);
    setSortOrder('');
  }, [dashboardTabStatus]);

  useEffect(() => {
    if (result.state === 'hasValue') {
      const sortedData = [...result.contents].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortOrder === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      setPreliminarieList(sortedData);
    }
  }, [sortBy, sortOrder, result.state, result.contents]);

  return (
    <DashboardContext.Provider
      value={{
        status: result.state,
        preliminarieList: preliminarieList,
        refreshPreliminarieList: refreshPreliminarieList,
        sortBy: sortBy,
        sortOrder: sortOrder,
        handleSort: handleSort,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
