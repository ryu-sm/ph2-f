import { AdListFilterIcon } from '@/assets/icons/ad-list-filter';
import { AdMainWrapper } from '@/containers';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { useLocation, useNavigate } from 'react-router-dom';
import { useBoolean, useIsManager } from '@/hooks';
import { AdSortListButton } from '@/components/administrator/button';
import { ListItem } from './list-item';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { routeNames } from '@/router/settings';
import { widthConfig } from './widthConfig';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adGetManagerDocs, adGetSalesPersonDocs } from '@/services';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { DocsFilter } from './docs-filter';
import { FormikProvider, useFormik } from 'formik';
import { REGEX } from '@/constant';
import { yup } from '@/libs';

export const AdDocumentsPage = () => {
  const authInfo = useRecoilValue(authAtom);
  const isManager = useIsManager();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    setSortBy(null);
    setSortOrder('');
  }, []);

  const initialValues = {
    file_names: '',
    created_at_from: '',
    created_at_to: '',
    file_types: [],
    ...(isManager ? { org_id: [], s_sales_person_id: [] } : {}),
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      created_at_from: yup.string().matches(REGEX.YMD),
      created_at_to: yup.string().matches(REGEX.YMD),
    }),
    onSubmit: (values) => {
      let temp = [...data];
      if (values.file_names) {
        temp = temp.filter((item) => {
          return item.file_names
            .map((item) => item['name'])
            .join(', ')
            .includes(values.file_names);
        });
      }
      if (values.created_at_from) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] >= values.created_at_from;
        });
      }
      if (values.created_at_to) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] <= values.created_at_to;
        });
      }
      if (values.file_types.length > 0) {
        temp = temp.filter((item) => {
          return values.file_types.some((file_type) =>
            item.file_names
              .map((fileItem) => fileItem['name'])
              .join(', ')
              .includes(file_type)
          );
        });
      }
      if (isManager && values.org_id.length > 0) {
        temp = temp.filter((item) => values.org_id.includes(item.org_id));
      }
      if (isManager && values.s_sales_person_id.length > 0) {
        temp = temp.filter((item) => values.s_sales_person_id.includes(item.s_sales_person_id));
      }
      setFilterData(temp);
    },
  });

  useEffect(() => {
    const sortedData = [...filterData].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setFilterData(sortedData);
  }, [sortBy, sortOrder]);

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filterList = [
    {
      name: 'id',
      label: 'ファイルID',
      width: widthConfig[1],
    },
    {
      name: 'file_names',
      label: 'ファイル名',
      width: widthConfig[2],
    },
    {
      name: 'created_at',
      label: '登録日',
      width: widthConfig[3],
    },
    ...(isManager
      ? [
          {
            name: 'org_name',
            label: '提携先',
            width: widthConfig[4],
          },
          {
            name: 's_sales_person_name',
            label: '担当者',
            width: widthConfig[5],
          },
        ]
      : []),
    {
      name: 'files_num',
      label: 'ファイル数',
      width: widthConfig[6],
    },
    {
      name: 'note',
      label: '備考',
      width: widthConfig[7],
    },
  ];

  const { value: openModal, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);
  const navigator = useNavigate();

  const minWidth = useMemo(() => {
    let width = 0;
    filterList.forEach((item) => {
      width += item?.width;
    });
    return width;
  }, [widthConfig, filterList]);

  const fetchData = async () => {
    try {
      let res;
      if (isManager) {
        res = await adGetManagerDocs();
      } else {
        res = await adGetSalesPersonDocs();
      }

      setData(res.data);
      setFilterData(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormikProvider value={formik}>
      <AdMainWrapper
        leftContent={
          <Typography variant="main_page_title" color="text.normal">
            アップロード書類一覧
          </Typography>
        }
      >
        <Stack overflow={'auto'}>
          {/* header */}
          <Stack sx={{ p: 2 }}>
            <Stack
              bgcolor={'white'}
              direction={'row'}
              boxShadow={'rgba(59, 118, 129, 0.15) 0px 2px 8px'}
              height={'40px'}
              width={1}
              minWidth={isManager ? minWidth + 284 : minWidth}
            >
              {filterList.map((item) => (
                <Stack
                  key={item.label}
                  alignItems={'center'}
                  direction={'row'}
                  // pl={'10px'}
                  justifyContent={'center'}
                  width={item.width}
                  minWidth={item.width}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Hiragino Sans',
                      fontSize: '12px',
                      fontWeight: 300,
                      lineHeight: '16.8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <AdSortListButton name={item.name} sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
                </Stack>
              ))}
              <Stack
                flex={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={isManager ? 'flex-end' : 'space-between'}
                px={3}
              >
                {!isManager && (
                  <Button
                    sx={{
                      bgcolor: 'secondary.main',
                      width: '180px',
                      height: '30px',
                      borderRadius: '2px',
                      '&:hover': {
                        bgcolor: 'secondary.main',
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => navigator(routeNames.adSalesPersonNewDocumentsPage.path)}
                  >
                    アップロード
                  </Button>
                )}
                <AdListFilterIcon
                  sx={{
                    width: 14,
                    height: 14,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    formik.resetForm();
                    handleOpenModal();
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* body */}

          <Stack width={1} minWidth={isManager ? minWidth + 300 : minWidth + 24}>
            {filterData.map((item) => (
              <ListItem key={item.id} doc={item} refecth={fetchData} />
            ))}
          </Stack>
        </Stack>
        <DocsFilter
          open={openModal}
          onClose={handleCloseModal}
          onCleare={formik.resetForm}
          handleSearch={formik.handleSubmit}
          errors={formik.errors}
        />
      </AdMainWrapper>
    </FormikProvider>
  );
};
