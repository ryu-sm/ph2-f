import { AdMainWrapper } from '@/containers';
import { useCurrSearchParams } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { authAtom } from '@/store';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adGetProvisionalStatus } from '@/services';
import { useEffect, useState } from 'react';
export const AdUnderPreliminaryExamination = () => {
  const p_application_header_id = useCurrSearchParams().get('id');
  const [provisionalStatusInfo, setProvisionalStatusInfo] = useState(null);
  const fetchData = async () => {
    try {
      const res = await adGetProvisionalStatus(p_application_header_id);

      setProvisionalStatusInfo(res.data);
    } catch (error) {
      console.debug(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [p_application_header_id]);

  const tableHeaderStyles = {
    fontFamily: 'Hiragino Sans',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '24px',
    color: 'rgb(51, 51, 51)',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    borderRight: '1px solid #EFEFEF',
    '&:last-child': {
      borderRight: 'none',
    },
    padding: 2,
  };

  const tableCellStyles = {
    backgroundColor: 'white',
    borderColor: '#EFEFEF',
    borderRight: '1px solid #EFEFEF',
    '&:last-child': {
      borderRight: 'none',
    },
    fontFamily: 'Hiragino Sans',
    fontWeight: 400,
    fontSize: '12px',
    height: '25px',
    padding: '4px 16px 4px 10px',
    color: 'rgb(51, 51, 51)',
  };

  const getTableBodyStyles = (index, total, isLast) => ({
    ...tableCellStyles,
    borderBottom: index === total - 1 && !isLast && '1px solid #333',
  });

  const titleList = [
    { label: '現況', width: 113, align: 'center' },
    {
      label: 'No.',
      width: 70,
    },
    {
      label: 'フェーズID',
      width: 140,
    },
    {
      label: 'フェーズ名',
      width: 'calc(100% - 113px - 70px - 140px)',
    },
  ];

  const createData = (status, number, id, name) => ({ status, number, id, name });
  function createDataGroup(status, data) {
    return { status, data };
  }

  const dataGroups = [
    createDataGroup('1', [
      createData('1', 1, 'PP060', '個信照会待ち（仮審査：債務者）'),
      createData('1', 2, 'PP061', '個信照会待ち（仮審査：連保人）'),
      createData('1', 3, 'PP062', '個信照会結果（仮審査）'),
      createData('1', 4, 'PP063', '個信エラー（仮審査）'),
      createData('1', 5, 'PP064', '仮審査後反社照会'),
    ]),
    createDataGroup('2', [
      createData('2', 6, 'PP069', '個信サマリー再計算（仮審査）'),
      createData('2', 7, 'PP006', '仮審査②（自動審査情報設定）'),
      createData('2', 8, 'PP043', '仮審査①（EUC審査データ作成）'),
      createData('2', 9, 'PP005', '仮審査①'),
      createData('2', 10, 'PP035', '仮審査②（自動審査依頼）'),
      createData('2', 11, 'PP036', '仮審査②（自動審査結果取得）'),
      createData('2', 12, 'PP007', 'P仮審査_申請'),
    ]),
    createDataGroup('3', [
      createData('3', 13, 'PP008', '仮審査（審査役）'),
      createData('3', 14, 'PP009', '仮審査（審査部長）'),
      createData('3', 15, 'PP010', '仮審査（審査役員）'),
      createData('3', 16, 'PP011', '仮審査（経営会議）'),
    ]),
    createDataGroup('4', [
      createData('4', 17, 'PP091', '通知先・保証判定（仮審査）'),
      createData('4', 18, 'PP092', '保証会社審査依頼（仮審査）'),
      createData('4', 19, 'PP093', '保証会社審査依頼エラー（仮審査）'),
      createData('4', 20, 'PP094', '保証会社審査結果待ち（仮審査）'),
    ]),
    createDataGroup('5', [
      createData('5', 21, 'PP095', '保証決裁（業務）（仮審査）'),
      createData('5', 22, 'PP096', '保証決裁（審査）（仮審査）'),
      createData('5', 23, 'PP012', 'P仮審査_終了案内'),
    ]),
  ];

  const renderTableRows = (dataGroup, isLast) =>
    dataGroup.data.map((row, index) => (
      <TableRow key={row.id}>
        {index === 0 && (
          <TableCell
            rowSpan={dataGroup.data.length}
            sx={{
              ...tableCellStyles,
              borderBottom: !isLast && '1px solid #333',
              bgcolor: (theme) =>
                provisionalStatusInfo?.p_application_banks?.provisional_status === row.status
                  ? theme.palette.primary.main
                  : 'white',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {provisionalStatusInfo?.p_application_banks?.provisional_status === row.status ? '▼' : ''}
          </TableCell>
        )}
        <TableCell
          sx={{ ...getTableBodyStyles(index, dataGroup.data.length, isLast), textAlign: 'center', padding: 0 }}
        >
          {row.number}
        </TableCell>
        <TableCell sx={getTableBodyStyles(index, dataGroup.data.length, isLast)}>{row.id}</TableCell>
        <TableCell sx={getTableBodyStyles(index, dataGroup.data.length, isLast)}>{row.name}</TableCell>
      </TableRow>
    ));

  return (
    <AdMainWrapper
      leftContent={
        <Stack spacing={7} direction={'row'} alignItems={'center'}>
          <Typography variant="main_page_title" color="text.normal" fontWeight={600}>
            審査状況
          </Typography>
          <Typography variant="main_page_title" color="text.normal" fontWeight={600}>
            {`[ ${provisionalStatusInfo?.p_applicant_persons__0?.last_name_kanji}${provisionalStatusInfo?.p_applicant_persons__0?.first_name_kanji} 様 ]`}
          </Typography>
        </Stack>
      }
      style={{ backgroundColor: '#F8F8F8' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {titleList.map((item) => (
              <TableCell
                key={item.label}
                sx={{
                  width: item.width,
                  ...tableHeaderStyles,
                }}
              >
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataGroups.map((group, index) => renderTableRows(group, index === dataGroups.length - 1))}
        </TableBody>
      </Table>
    </AdMainWrapper>
  );
};
