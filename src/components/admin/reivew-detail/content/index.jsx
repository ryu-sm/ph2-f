import { Stack } from '@mui/material';
import { InfoTitleTab } from './info-title-tab';
import { ContentEditList } from './content-edit-list';

export const ContentDetail = () => {
  return (
    <Stack width={'100%'} bgcolor={'white'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 0px 5px'} padding={'14px 20px'}>
      <InfoTitleTab />
      <ContentEditList />
    </Stack>
  );
};
