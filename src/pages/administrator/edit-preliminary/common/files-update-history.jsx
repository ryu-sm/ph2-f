import { API_500_ERROR } from '@/constant';
import { adGetUpdateHistory } from '@/services';

import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';

export const FilesUpdateHistoryModal = ({ open, onClose, title, upConfig }) => {
  const theme = useTheme();

  const headers = [
    {
      id: 'date',
      label: '日時',
      width: 155,
    },
    {
      id: 'company',
      label: '区分',
      width: 80,
    },
    {
      id: 'person',
      label: '担当',
      width: 105,
    },
    {
      id: 'content',
      label: '入力内容',
      width: 280,
    },
  ];

  const [data, setData] = useState([]);

  const fetch = useCallback(async () => {
    try {
      const res = await adGetUpdateHistory(upConfig.p_application_header_id, upConfig.key);
      setData(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  }, [upConfig]);

  const parseType = (operator_type) => {
    const basic = {
      1: '申込人',
      2: '業者',
      3: '銀行代理',
    };
    return basic[operator_type];
  };

  const parseOperator = (row) => {
    if (row.operator_type === 1) return row.p_applicant_person_name;
    if (row.operator_type === 2) return row.s_sales_person_name;
    if (row.operator_type === 3) return row.s_manager_name;
  };

  useEffect(() => {
    if (open) fetch();
  }, [upConfig, open]);

  const tableCellStyles = {
    fontFamily: 'Hiragino Sans',
    fontSize: '10px',
    lineHeight: '24px',
    letterSpacing: '1px',
    fontWeight: 300,
    color: theme.palette.gray[100],
    textAlign: 'center',
    borderRight: `1px solid ${theme.palette.gray[70]}`,
    '&:last-child': {
      borderRight: 'none',
    },
    padding: 0,
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      disableAutoFocus
    >
      <Box>
        <Draggable>
          <Stack
            sx={{
              cursor: 'move',
              width: 640,
              height: 460,
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
              overflowY: 'auto',
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              position={'relative'}
              width={'100%'}
              height={50}
              borderBottom={'1px solid'}
              borderColor={'gray.70'}
            >
              <Typography variant="ad_modal_title">{`${upConfig?.title || title}の修正履歴`}</Typography>
              <IconButton onClick={onClose} sx={{ position: 'absolute', right: 1, top: 3 }}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Stack padding={2}>
              <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableCell
                            key={header.id}
                            sx={{
                              ...tableCellStyles,
                              fontWeight: 600,
                              minWidth: header.width,
                              borderBottom: '1px solid',
                              borderBottomColor: 'gray.100',
                              backgroundColor: theme.palette.gray[20],
                            }}
                          >
                            {header.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              ...tableCellStyles,
                            }}
                          >
                            {row?.created_at}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableCellStyles,
                            }}
                          >
                            {parseType(row?.operator_type)}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableCellStyles,
                            }}
                          >
                            {parseOperator(row)}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableCellStyles,
                              textAlign: 'start',
                              pl: 1,
                            }}
                          >
                            {row?.content ? row?.content : ''}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </Stack>
        </Draggable>
      </Box>
    </Modal>
  );
};
