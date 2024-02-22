import { ApConfirmGroup, ApConfirmItemGroup, ApPageTitle } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom } from '@/store';
import { formatJapanDate } from '@/utils';
import { useRecoilValue } from 'recoil';
import { ApStep01Info } from '../step-01/step-01-info';
import { ApStep02Info } from '../step-02/step-02-info';
import { ApStep03Info } from '../step-03/step-03-info';
import { ApStep04Info } from '../step-04/step-04-info';
import { ApStep05Info } from '../step-05/step-05-info';
import { ApStep06Info } from '../step-06/step-06-info';
import { ApStep07Info } from '../step-07/step-07-info';
import { ApStep08Info } from '../step-08/step-08-info';
import { ApStep09Info } from '../step-09/step-09-info';
import { ApStep10Info } from '../step-10/step-10-info';
import { ApStep11Info } from '../step-11/step-11-info';
import { ApStep12Info } from '../step-12/step-12-info';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const ApStep13Page = () => {
  const application = useRecoilValue(applicationAtom);
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };
  return (
    <ApLayout hasMenu hasStepBar pb={38}>
      <ApPageTitle py={8}>{`最後に内容を確認し\nお申込を完了させましょう。`}</ApPageTitle>
      <ApConfirmGroup label={'はじめに'}>
        <ApConfirmItemGroup label={'同意日'}>
          {application.p_application_headers__apply_date
            ? formatJapanDate(application.p_application_headers__apply_date, true)
            : 'ー'}
        </ApConfirmItemGroup>
      </ApConfirmGroup>
      <ApStep01Info stepIndex={'01'} />
      <ApStep02Info stepIndex={'02'} />
      <ApStep03Info stepIndex={'03'} />
      <ApStep04Info stepIndex={'04'} />
      <ApStep05Info stepIndex={'05'} />
      <ApStep06Info stepIndex={'06'} />
      <ApStep07Info stepIndex={'07'} />
      <ApStep08Info stepIndex={'08'} />
      <ApStep09Info stepIndex={'09'} />
      <ApStep10Info stepIndex={'10'} />
      <ApStep11Info stepIndex={'11'} />
      <ApStep12Info stepIndex={'12'} />
      <ApStepFooter left={handelLeft} right={() => navigate(routeNames.apTopPage.path)} />
    </ApLayout>
  );
};
