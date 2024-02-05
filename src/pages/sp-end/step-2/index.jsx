import { FormikProvider, useFormik } from 'formik';
import { useSpContext } from '@/hooks';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SpGroup, SpLayout, SpStepFooter } from '@/layouts/sp-end';
import { Box, HStack, Stack, Text, useTheme } from '@chakra-ui/react';
import {
  SpGroupButton,
  SpInputField,
  SpInputPhone,
  SpInputPostCode,
  SpPageTitle,
  SpSelect,
  SpSelectYMD,
} from '@/components/sp-end';
import { userPaths } from '@/routers/users/paths';
import { parseStepId } from '@/utils';
import { ganderOptions, nationalityOptions, yearOptions } from './option';
import { PREFECTURES } from '@/constants';

export default function SpStep1() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    user,
    getPreStepUrl,
    getNextStepUrl,
    updateCurrCompletedStepID,
    //
    p_applicant_persons__0__last_name_kanji,
    p_applicant_persons__0__first_name_kanji,
    p_applicant_persons__0__last_name_kana,
    p_applicant_persons__0__first_name_kana,
    p_applicant_persons__0__gender,
    p_applicant_persons__0__birthday,
    p_applicant_persons__0__nationality,
    p_applicant_persons__0__mobile_phone,
    p_applicant_persons__0__home_phone,
    p_applicant_persons__0__postal_code,
    p_applicant_persons__0__prefecture_kanji,
    p_applicant_persons__0__city_kanji,
    p_applicant_persons__0__district_kanji,
    p_applicant_persons__0__other_address_kanji,
    p_applicant_persons__0__email,
  } = useSpContext();

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      p_applicant_persons__0__last_name_kanji,
      p_applicant_persons__0__first_name_kanji,
      p_applicant_persons__0__last_name_kana,
      p_applicant_persons__0__first_name_kana,
      p_applicant_persons__0__gender,
      p_applicant_persons__0__birthday,
      p_applicant_persons__0__nationality,
      p_applicant_persons__0__mobile_phone,
      p_applicant_persons__0__home_phone,
      p_applicant_persons__0__postal_code,
      p_applicant_persons__0__prefecture_kanji,
      p_applicant_persons__0__city_kanji,
      p_applicant_persons__0__district_kanji,
      p_applicant_persons__0__other_address_kanji,
      p_applicant_persons__0__email,
    },
    // validationSchema: Yup.object({
    //   p_application_headers__move_scheduled_date: Yup.string().matches(REGEX.ym, '入居予定年月を選択してください。'),
    //   p_application_banks__s_bank_ids: Yup.array().of(Yup.number()).min(1, 'どれか1つを選択してください。'),
    // }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const handleOnRight = useCallback(async () => {
    try {
      const stepId = parseStepId(pathname);
      if (user?.agent_sended) {
      } else {
        navigate(getNextStepUrl(stepId));
      }
      updateCurrCompletedStepID(stepId);
    } catch (error) {}
  }, []);

  const handleOnLeft = useCallback(() => {
    if (user?.agent_sended) {
      navigate(userPaths.top);
    } else {
      const stepId = parseStepId(pathname);
      navigate(getPreStepUrl(stepId));
    }
  }, []);

  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasStepHeader={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>{`あなたについて\n教えてください。`}</SpPageTitle>
        <SpGroup title={'お名前'}>
          <Stack spacing={'12px'}>
            <SpInputField name="p_applicant_persons__0__last_name_kanji" placeholder={'姓'} />
            <SpInputField name="p_applicant_persons__0__first_name_kanji" placeholder={'名'} />

            <Text variant={'sp_12_150'}>※ 外国籍のかたは、在留カード通りに入力ください。</Text>
            <Text variant={'sp_12_150'}>※ お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。</Text>
          </Stack>
        </SpGroup>
        <SpGroup title={'お名前（フリガナ）'}>
          <Stack spacing={'12px'}>
            <SpInputField name="p_applicant_persons__0__last_name_kana" placeholder={'セイ'} />
            <SpInputField name="p_applicant_persons__0__first_name_kana" placeholder={'メイ'} />
          </Stack>
        </SpGroup>
        <SpGroup title={'性別'}>
          <SpGroupButton name="p_applicant_persons__0__gender" options={ganderOptions} />
        </SpGroup>
        <SpGroup title={'生年月日'}>
          <SpSelectYMD name="p_applicant_persons__0__birthday" yearOptions={yearOptions} />
        </SpGroup>
        <SpGroup title={'現在の国籍'}>
          <SpGroupButton name="p_applicant_persons__0__nationality" options={nationalityOptions} />
        </SpGroup>
        <SpGroup title={'電話番号'}>
          <Stack>
            <HStack spacing={'8px'}>
              <Text variant={'sp_16_100'}>携帯</Text>
              <SpInputPhone name="p_applicant_persons__0__mobile_phone" />
            </HStack>

            <HStack spacing={'8px'}>
              <Text variant={'sp_16_100'}>携帯</Text>
              <SpInputPhone name="p_applicant_persons__0__home_phone" />
            </HStack>
            <Text variant={'sp_12_150'}>※ 半角数字でご入力ください。</Text>
          </Stack>
        </SpGroup>
        <SpGroup title={'現住所'} helper={'国内にお住まいの方がご利用できます。'}>
          <Stack spacing={'24px'}>
            <Stack spacing={'6px'}>
              <Text variant={'sp_14_150_blod'}>郵便番号</Text>
              <SpInputPostCode name="p_applicant_persons__0__postal_code" />
              <Text variant={'sp_12_150'}>※ 入力すると自動的に住所が表示されます。</Text>
            </Stack>

            <Stack spacing={'6px'}>
              <Text variant={'sp_14_150_blod'}>都道府県</Text>
              <SpSelect
                name="p_applicant_persons__0__prefecture_kanji"
                options={PREFECTURES}
                placeholder={'----'}
                width={'110px'}
                menuWidth={'130px'}
              />
            </Stack>

            <Stack spacing={'6px'}>
              <Text variant={'sp_14_150_blod'}>市区郡　（例：港区）</Text>
              <SpInputField name="p_applicant_persons__0__city_kanji" placeholder={'例：港区'} />
            </Stack>
            <Stack spacing={'6px'}>
              <Text variant={'sp_14_150_blod'}>町村丁目（例：芝浦４丁目）</Text>
              <SpInputField name="p_applicant_persons__0__district_kanji" placeholder={'例：芝浦４丁目'} />
            </Stack>
            <Stack spacing={'6px'}>
              <Text variant={'sp_14_150_blod'}>丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）</Text>
              <SpInputField
                name="p_applicant_persons__0__other_address_kanji"
                placeholder={'例：12-38　キャナルゲート芝浦605号室'}
              />
            </Stack>
          </Stack>
        </SpGroup>
        <SpGroup title={'ご連絡先用メールアドレス'}>
          <Stack>
            <SpInputField name="p_applicant_persons__0__email" placeholder={'例：12-38　キャナルゲート芝浦605号室'} />
            <Box>
              <Text
                variant={'sp_12_150'}
              >{`※ 会員登録メールアドレスを表示しています。別途、ご連絡先用のメールアドレスを登録したい方は修正してください。`}</Text>
            </Box>
          </Stack>
        </SpGroup>
        <Box h={'300px'}></Box>

        <SpStepFooter onLeft={handleOnLeft} onRight={handleOnRight} />
      </FormikProvider>
    </SpLayout>
  );
}
