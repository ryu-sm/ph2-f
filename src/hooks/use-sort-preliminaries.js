import { preliminarieListAtom, tabStatusAtom } from '@/store';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useSortPreliminaries = () => {
  const tabStatus = useRecoilValue(tabStatusAtom);
  const [preliminariesData, setPreliminariesData] = useRecoilState(preliminarieListAtom);

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
  }, [tabStatus]);

  useEffect(() => {
    const sortedData = [...preliminariesData].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setPreliminariesData(sortedData);
  }, [sortBy, sortOrder]);

  return {
    sortBy: sortBy,
    sortOrder: sortOrder,
    handleSort: handleSort,
  };
};
