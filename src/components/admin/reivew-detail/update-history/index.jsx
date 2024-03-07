import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import {
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
  alpha,
} from '@mui/material';
import PropTypes from 'prop-types';
export const UpdateHistoryModal = ({ open, onClose }) => {
  const theme = useTheme();
  const headers = [
    {
      id: 'date',
      label: '日時',
      width: 155,
    },
    {
      id: 'company',
      label: '会社',
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

  const createData = (date, company, person, content) => ({
    date,
    company,
    person,
    content,
  });

  const rows = [
    createData('2022/01/01 10:00', '株式会社A', '田中 太郎', '入力内容A'),
    createData('2022/01/01 10:00', '株式会社A', '田中 太郎', '入力内容A'),
    createData('2022/01/01 10:00', '株式会社A', '田中 太郎', '入力内容A'),
    createData('2022/01/01 10:00', '株式会社A', '田中 太郎', '入力内容A'),
  ];

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
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.primary[60], 0.7),
        },
      }}
    >
      <Stack
        sx={{
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
          <Typography variant="ad_modal_title">入居予定年月の修正履歴</Typography>
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
                  {rows.map((row) => (
                    <TableRow key={row.date}>
                      {Object.keys(row).map((key) => (
                        <TableCell
                          key={key}
                          sx={{
                            ...tableCellStyles,
                          }}
                        >
                          {row[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Stack>
    </Modal>
  );
};

UpdateHistoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
