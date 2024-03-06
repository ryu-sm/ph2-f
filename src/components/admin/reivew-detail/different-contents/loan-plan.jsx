import { Stack } from '@mui/material';
import { EditRow } from '../content/content-edit-row';
import { MonthPicker } from '../form/month-picker';
import { SelectCheckbox } from '../form/select-checkbox';
import { EditInput } from '../form/edit-input';
import { DayPicker } from '../form/day-picker';
import dayjs from 'dayjs';

export const LoanPlan = () => {
  const mockOptions = [
    { id: 1, label: '物件の購入・建築' },
    {
      id: 2,
      label: '建売住宅の購入',
    },
    {
      id: 3,
      label: '中古住宅の購入',
    },
    {
      id: 4,
      label: '新築マンションの購入',
    },
    {
      id: 5,
      label: '中古マンションの購入',
    },
  ];

  const minDate = dayjs().startOf('year');
  const maxDate = dayjs().add(4, 'year').endOf('year');
  return (
    <Stack flexGrow={1} overflow={'auto'} pb={'10px'}>
      <EditRow
        item={{ content: '2024（令和6）年2月26日 21:31', isRequired: true }}
        label="申込日時"
        requiredSupply={false}
      />
      <EditRow
        item={{ content: '2024（令和6）年2月26日 21:31', isRequired: true, isUpdated: true }}
        label="同意日"
        requiredSupply={true}
      />
      <EditRow
        item={{ content: '2024（令和6）年2月26日 21:31', isRequired: true, isUpdated: true }}
        label="同意日"
        requiredSupply={true}
      />
      <EditRow
        item={{ content: '2024（令和6）年2月26日 21:31', isRequired: true, isUpdated: true }}
        label="同意日"
        requiredSupply={true}
      />
      <EditRow
        item={{ content: '2024（令和6）年2月26日 21:31', isRequired: true, isUpdated: true }}
        label="同意日"
        requiredSupply={true}
      />
      <EditRow
        item={{ isRequired: false, isUpdated: false }}
        component=<DayPicker minDate={minDate} maxDate={maxDate} content="2024-03-20T15:00:00.000Z" />
        hasDropDown={true}
      />

      <EditRow
        item={{ isRequired: true, isUpdated: true }}
        component=<MonthPicker content="2024（令和6）年2月26日 21:31" />
        label="入居予定年月"
        requiredSupply={true}
        hasDropDown={true}
      />
      <EditRow
        item={{ isRequired: false, isUpdated: false }}
        component=<SelectCheckbox content="建物だけ新築(既に土地をお持ちの方)" options={mockOptions} />
        hasDropDown={true}
      />
      <EditRow
        item={{ isRequired: false, isUpdated: false }}
        component=<EditInput content="xxxx" isMultiline={true} />
        supplyComponent=<EditInput content="xxxx" isMultiline={true} isSupply={true} />
      />
      <EditRow
        item={{ isRequired: false, isUpdated: false }}
        component=<DayPicker minDate={minDate} maxDate={maxDate} content="2024-03-20T15:00:00.000Z" />
        hasDropDown={true}
      />
      <EditRow
        item={{ isRequired: false, isUpdated: false }}
        component=<SelectCheckbox content="建物だけ新築(既に土地をお持ちの方)" options={mockOptions} />
        hasDropDown={true}
      />
    </Stack>
  );
};
