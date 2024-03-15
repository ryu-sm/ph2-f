import { AdListFilterIcon } from '@/assets/icons/ad-list-filter';
import { SortListButton } from '@/components/admin/case-list-filter/sort-list-button';
import { AdDocsWrapper } from '@/containers/ad-layout/ad-doc-wrapper';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DocItem } from './doc-item';
import { Fragment } from 'react';
import { useIsManager } from '@/hooks/use-is-manager';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBoolean } from '@/hooks';
import { DocsFilter } from './docs-filter';

export const DocsUpload = () => {
  const pathname = useLocation().pathname;
  const isManager = useIsManager(pathname);

  const filterList = [
    {
      label: 'ファイルID',
      width: '100px',
    },
    {
      label: 'ファイル名',
      width: '350px',
    },
    {
      label: '登録日',
      width: '120px',
    },
    ...(isManager
      ? [
          {
            label: '提携先',
            width: '220px',
          },
          {
            label: '担当者',
            width: '140px',
          },
        ]
      : []),
    {
      label: 'ファイル数',
      width: '100px',
    },
    {
      label: '備考',
      width: '200px',
    },
  ];

  const mockData = [
    {
      id: '9',
      file_name: ['その他書類.pdf'],
      created_at: '2024-01-23T17:50:14.000Z',
      size: 1,
      note: '11112222',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '営業担当者１',
    },
    {
      id: '8',
      file_name: ['その他書類 2.pdf', 'その他書類.pdf'],
      created_at: '2024-01-15T13:11:34.000Z',
      size: 2,
      note: '',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '営業担当者１',
    },
    {
      id: '7',
      file_name: ['仮審査申込システムハイム様向け説明会資料.pdf'],
      created_at: '2023-12-01T19:44:01.000Z',
      size: 1,
      note: '',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '鄒　業者',
    },
    {
      id: '4',
      file_name: [
        'thien-nhien-1.jpeg',
        'thien-nhien-7.jpeg',
        'thien-nhien-5.jpg',
        'thien-nhien-4.jpeg',
        'thien-nhien-2.jpeg',
      ],
      created_at: '2023-09-25T10:31:29.000Z',
      size: 5,
      note: '',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '担当者　B1-001名前',
    },
    {
      id: '3',
      file_name: ['2.png'],
      created_at: '2023-09-23T04:23:44.000Z',
      size: 1,
      note: 'test12',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '担当者　B1-001名前',
    },
    {
      id: '2',
      file_name: [
        '個人情報の取扱いに関する同意書兼表明および確約書.pdf',
        'QR_STG環境＿東京セキスイハイム株式会社.png',
      ],
      created_at: '2023-09-22T19:17:36.000Z',
      size: 2,
      note: '',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '営業担当者１',
    },
    {
      id: '1',
      file_name: [
        'スクリーンショット 2023-09-18 5.32.14.png',
        'スクリーンショット 2023-09-18 6.03.21.png',
        'スクリーンショット 2023-09-18 6.04.46.png',
        'スクリーンショット 2023-09-18 6.21.50.png',
        'スクリーンショット 2023-09-18 21.53.19.png',
      ],
      created_at: '2023-09-22T18:46:35.000Z',
      size: 5,
      note: 'test',
      company_name: '東京セキスイハイム株式会社',
      name_kanji: '営業担当者１',
    },
  ];

  const { value: openModal, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);
  const navigator = useNavigate();
  return (
    <AdDocsWrapper>
      <Stack overflow={'auto'}>
        {/* header */}
        <Stack
          bgcolor={'white'}
          direction={'row'}
          boxShadow={'rgba(59, 118, 129, 0.15) 0px 2px 8px'}
          margin={'52px 12px 8px 12px'}
          height={'40px'}
          minWidth={'max-content'}
        >
          {filterList.map((item) => (
            <Stack
              key={item.label}
              alignItems={'center'}
              direction={'row'}
              p={'10px'}
              justifyContent={'center'}
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
              <SortListButton />
            </Stack>
          ))}
          <Stack
            width={isManager ? '420px' : '550px'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={isManager ? 'center' : 'space-between'}
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
                onClick={() => navigator('/sale-person/upload-new-document')}
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

        {/* body */}

        <Stack bgcolor={'white'} marginTop={1} minWidth={'max-content'} width={'100%'}>
          {mockData.map((item) => (
            <Fragment key={item.id}>
              <DocItem doc={item} />
            </Fragment>
          ))}
        </Stack>
      </Stack>
      <DocsFilter open={openModal} onClose={handleCloseModal} isManager={isManager} />
    </AdDocsWrapper>
  );
};
