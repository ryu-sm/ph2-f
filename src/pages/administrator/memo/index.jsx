import { Icons } from '@/assets';
import { AdMainWrapper } from '@/containers';
import { useBoolean, useCurrSearchParams } from '@/hooks';
import { adGetMemo, adNewMemo, adUpdateMemo } from '@/services';
import { preliminarieListAtom } from '@/store';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AdMemoHeader } from './memo-header';
import { AdMemoItem } from './list-item';
import { AdMemoModal } from './memo-modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const AdMemo = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const modal = useBoolean(false);
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  const p_application_header_id = useCurrSearchParams().get('id');
  const name = useCurrSearchParams().get('name');
  const preliminarieList = useRecoilValue(preliminarieListAtom);
  const [memos, setMemos] = useState([]);
  const queryMemos = useCallback(async () => {
    try {
      const res = await adGetMemo(p_application_header_id);
      setMemos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(sortBy, sortOrder);
    const sortedData = [...memos].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setMemos(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    queryMemos();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: '',
      content: '',
    },
    onSubmit: async (values) => {
      try {
        if (!values.id) {
          await adNewMemo({
            p_application_header_id: p_application_header_id,
            content: values.content.replace(/\n/g, '<br/>'),
          });
          modal.onFalse();
          formik.setFieldValue('id', '');
          formik.setFieldValue('content', '');
          await queryMemos();
          toast.success('メモを作成しました。');
        } else {
          await adUpdateMemo({ id: values.id, content: values.content.replace(/\n/g, '<br/>') });
          modal.onFalse();
          formik.setFieldValue('id', '');
          formik.setFieldValue('content', '');
          await queryMemos();
          toast.success('メモを更新しました。');
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <AdMainWrapper
      leftContent={
        <Stack direction={'row'} alignItems={'center'} spacing={3}>
          <Typography variant="main_page_title" fontWeight={600} color="text.normal">
            {`申込一覧　お客様名：${name}様`}
          </Typography>

          <Button
            sx={{
              p: 0,
              bgcolor: 'white',
              boxShadow: 'none',
              width: 95,
              minHeight: 25,
              height: 25,
              borderRadius: 1,
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'white',
                border: '1px solid',
                borderColor: (theme) => theme.palette.primary.main,
                opacity: 0.8,
              },
            }}
          >
            <Stack spacing={2} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
              <Icons.AdNewApply sx={{ width: 9, height: 9 }} />
              <Typography variant="login_button" fontWeight={400} color="primary.main">
                新規追加
              </Typography>
            </Stack>
          </Button>
        </Stack>
      }
      rightAddItems={
        <Button
          sx={{
            p: 0,
            bgcolor: 'white',
            boxShadow: 'none',
            width: 140,
            minHeight: 25,
            height: 25,
            borderRadius: 1,
            border: '1px solid',
            borderColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              opacity: 0.8,
            },
          }}
          onClick={() => navigate(`${routeNames.adManagerEditPreliminaryPage.path}?id=${p_application_header_id}`)}
        >
          <Typography variant="login_button" fontWeight={400} color="primary.main">
            申込内容の修正・確認
          </Typography>
        </Button>
      }
    >
      <Stack sx={{ height: '100%', flexGrow: 1 }} overflow={'auto'} mb={8}>
        <AdMemoHeader sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
        <Stack>
          {memos.map((item) => (
            <AdMemoItem
              key={item.id}
              item={item}
              handleEdit={(id, content) => {
                formik.setFieldValue('id', id);
                formik.setFieldValue('content', content);
                modal.onTrue();
              }}
            />
          ))}
        </Stack>
      </Stack>
      <AdMemoModal
        isOpen={modal.value}
        onClose={() => {
          formik.setFieldValue('id', '');
          formik.setFieldValue('content', '');
          modal.onFalse();
        }}
        id={formik.values.id}
        content={formik.values.content}
        onChange={(e) => formik.setFieldValue('content', e.target.value)}
        handleSave={formik.handleSubmit}
      />
    </AdMainWrapper>
  );
};
