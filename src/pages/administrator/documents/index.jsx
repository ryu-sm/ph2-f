import { AdListFilterIcon } from '@/assets/icons/ad-list-filter';
// import { SortListButton } from '@/components/admin/case-list-filter/sort-list-button';
// import { AdDocsWrapper } from '@/containers/ad-layout/ad-doc-wrapper';
import { AdMainWrapper } from '@/containers';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
// import { DocItem } from './doc-item';
// import { Fragment } from 'react';

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
// import { DocsFilter } from './docs-filter';

export const AdDocumentsPage = () => {
  const authInfo = useRecoilValue(authAtom);
  const isManager = useIsManager();

  const filterList = [
    {
      label: 'ファイルID',
      width: widthConfig[1],
    },
    {
      label: 'ファイル名',
      width: widthConfig[2],
    },
    {
      label: '登録日',
      width: widthConfig[3],
    },
    ...(isManager
      ? [
          {
            label: '提携先',
            width: widthConfig[4],
          },
          {
            label: '担当者',
            width: widthConfig[5],
          },
        ]
      : []),
    {
      label: 'ファイル数',
      width: widthConfig[6],
    },
    {
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
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      let res;
      if (isManager) {
        res = await adGetManagerDocs();
      } else {
        res = await adGetSalesPersonDocs(authInfo.salesPerson.orgs[0]?.s_sales_company_org_id);
      }
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
                <AdSortListButton />
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
                onClick={handleOpenModal}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* body */}

        <Stack width={1} minWidth={isManager ? minWidth + 300 : minWidth + 24}>
          {data.map((item) => (
            <ListItem key={item.id} doc={item} refecth={fetchData} />
          ))}
        </Stack>
      </Stack>
      {/* <DocsFilter open={openModal} onClose={handleCloseModal} isManager={isManager} /> */}
    </AdMainWrapper>
  );
};
