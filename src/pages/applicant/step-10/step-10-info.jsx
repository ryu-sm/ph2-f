import { ApConfirmGroup, ApConfirmItemGroup, ApImgItem, ApLighterButton } from '@/components';
import { agentSendedSelector, applicationAtom } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useMemo } from 'react';

export const ApStep10Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const { p_applicant_persons__0, p_uploaded_files } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  const plan = useMemo(() => {
    if (
      p_applicant_persons__0.tax_return === '1' &&
      (p_applicant_persons__0.tax_return_reasons.includes('1') ||
        p_applicant_persons__0.tax_return_reasons.includes('2') ||
        p_applicant_persons__0.tax_return_reasons.includes('3') ||
        p_applicant_persons__0.tax_return_reasons.includes('6') ||
        p_applicant_persons__0.tax_return_reasons.includes('99'))
    ) {
      return 'B';
    } else {
      return 'A';
    }
  }, [p_applicant_persons__0.tax_return, p_applicant_persons__0.tax_return_reasons]);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：書類添付`}>
      <ApConfirmItemGroup label={'本人確認書類'}>
        {p_applicant_persons__0.identity_verification_type === '1' && (
          <Stack spacing={3}>
            <Stack>
              <Typography variant="label" color={'text.main'}>
                運転免許証
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈表面〉
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__A__01__a.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__A__01__a} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__A__01__b.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__A__01__b} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
        {p_applicant_persons__0.identity_verification_type === '2' && (
          <Stack spacing={3}>
            <Stack>
              <Typography variant="label" color={'text.main'}>
                マイナンバーカード
              </Typography>
            </Stack>

            <Stack spacing={'6px'}>
              <Typography variant="label" color={'text.main'}>
                〈表面〉
              </Typography>
              {p_uploaded_files?.p_applicant_persons__0__A__02.length ? (
                <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__A__02} />
              ) : (
                <Typography variant="label" color={'gray.150'}>
                  〈 書類はまだ添付されません。〉
                </Typography>
              )}
            </Stack>
          </Stack>
        )}

        {p_applicant_persons__0.identity_verification_type === '3' && (
          <Stack spacing={3}>
            <Stack>
              <Typography variant="label" color={'text.main'}>
                住民基本台帳カード
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈表面〉
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__A__03__a.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__A__03__a} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__A__03__b.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__A__03__b} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </ApConfirmItemGroup>

      <ApConfirmItemGroup label={'健康保険証'}>
        <Stack spacing={3}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            {p_uploaded_files?.p_applicant_persons__0__B__a.length ? (
              <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__B__a} />
            ) : (
              <Typography variant="label" color={'gray.150'}>
                〈 書類はまだ添付されません。〉
              </Typography>
            )}
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            {p_uploaded_files?.p_applicant_persons__0__B__b.length ? (
              <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__B__b} />
            ) : (
              <Typography variant="label" color={'gray.150'}>
                〈 書類はまだ添付されません。〉
              </Typography>
            )}
          </Stack>
        </Stack>
      </ApConfirmItemGroup>

      {plan === 'A' && p_applicant_persons__0.office_occupation === '1' && (
        <Stack>
          <ApConfirmItemGroup label={'収入に関する書類'}>
            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__01.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__01} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前々年度分）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__02.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__02} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'非上場企業の役員の方の会社の決算報告書'}>
            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  会社の決算報告書（1期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__D__01.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__01} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  会社の決算報告書（2期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__D__02.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__02} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  会社の決算報告書（3期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__D__03.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__03} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </ApConfirmItemGroup>
        </Stack>
      )}

      {plan === 'A' && ['6', '7', '8'].includes(p_applicant_persons__0.office_occupation) && (
        <Stack>
          <ApConfirmItemGroup label={'収入に関する書類'}>
            <Stack spacing={'6px'}>
              <Typography variant="label" color={'text.main'}>
                源泉徴収票（前年度分）
              </Typography>
              {p_uploaded_files?.p_applicant_persons__0__C__01.length ? (
                <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__01} />
              ) : (
                <Typography variant="label" color={'gray.150'}>
                  〈 書類はまだ添付されません。〉
                </Typography>
              )}
            </Stack>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'雇用契約に関する書類'}>
            <Stack spacing={'6px'}>
              <Typography variant="label" color={'text.main'}>
                雇用契約書
              </Typography>
              {p_uploaded_files?.p_applicant_persons__0__E.length ? (
                <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__E} />
              ) : (
                <Typography variant="label" color={'gray.150'}>
                  〈 書類はまだ添付されません。〉
                </Typography>
              )}
            </Stack>
          </ApConfirmItemGroup>
        </Stack>
      )}

      {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__0.office_occupation) && (
        <Stack>
          <ApConfirmItemGroup label={'収入に関する書類'}>
            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__01.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__01} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              {(p_applicant_persons__0.income_sources.includes('2') ||
                p_applicant_persons__0.income_sources.includes('3')) && (
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前々年度分）
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__C__02.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__02} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`親族経営の会社等にご勤務の方の会社の決算報告書\nまたは経営する親族の確定申告書`}>
            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__F__01.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__01} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__F__02.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__02} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__F__03.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__03} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </ApConfirmItemGroup>
        </Stack>
      )}

      {plan === 'B' && (
        <Stack>
          <ApConfirmItemGroup label={`収入に関する書類`}>
            <Stack spacing={3}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  確定申告書（1期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__03.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__03} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  確定申告書（2期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__04.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__04} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  確定申告書（3期前）
                </Typography>
                {p_uploaded_files?.p_applicant_persons__0__C__05.length ? (
                  <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__C__05} />
                ) : (
                  <Typography variant="label" color={'gray.150'}>
                    〈 書類はまだ添付されません。〉
                  </Typography>
                )}
              </Stack>
            </Stack>
          </ApConfirmItemGroup>

          {p_applicant_persons__0.office_occupation === '1' && (
            <ApConfirmItemGroup label={`非上場企業の役員の方の会社の決算報告書`}>
              <Stack spacing={3}>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（1期前）
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__D__01.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__01} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（2期前）
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__D__02.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__02} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（3期前）
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__D__03.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__D__03} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </ApConfirmItemGroup>
          )}

          {!['1', '5', '10'].includes(p_applicant_persons__0.office_occupation) && (
            <ApConfirmItemGroup
              label={`親族経営の会社等にご勤務の方の会社の決算報告書\nまたは経営する親族の確定申告書`}
            >
              <Stack spacing={3}>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__F__01.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__01} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__F__02.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__02} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                  </Typography>
                  {p_uploaded_files?.p_applicant_persons__0__F__03.length ? (
                    <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__F__03} />
                  ) : (
                    <Typography variant="label" color={'gray.150'}>
                      〈 書類はまだ添付されません。〉
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </ApConfirmItemGroup>
          )}
        </Stack>
      )}

      <ApConfirmItemGroup label={`その他の書類`}>
        {p_uploaded_files?.p_applicant_persons__0__K.length ? (
          <ApImgItem files={p_uploaded_files?.p_applicant_persons__0__K} />
        ) : (
          <Typography variant="label" color={'gray.150'}>
            〈 書類はまだ添付されません。〉
          </Typography>
        )}
      </ApConfirmItemGroup>

      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep10Page.path)}
          >
            <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
              <Icons.ApEditorIcon />
              <Typography variant="radio_checkbox_button">{`STEP${stepIndex}を修正する`}</Typography>
            </Stack>
          </ApLighterButton>
        </Stack>
      )}
    </ApConfirmGroup>
  );
};
