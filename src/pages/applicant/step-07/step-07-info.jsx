import { ApConfirmGroup, ApConfirmItemGroup, ApImgItem, ApLighterButton } from '@/components';
import { agentSendedSelector, applicationAtom, isMcjSelector } from '@/store';
import { formatJapanDate } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import {
  currHouseLoanBalanceTypeOptions,
  currHouseResidenceTypeOptions,
  currHouseScheduleDisposalTypeOptions,
  loanFromJapanHouseFinanceAgencyOptions,
  nationalityOptions,
  newHouseAcquireReasonOptions,
  propertyBusinessTypeOptions,
  propertyFlat35PlanOptions,
  propertyFlat35TechOptions,
  propertyLandTypeOptions,
  propertyMaintenanceTypeOptions,
  propertyPlanningAreaOptions,
  propertyPurchaseTypeOptions,
  propertyRebuildingReasonOptions,
  propertyRegionTypeOptions,
} from './options';

export const ApStep07Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const { isMCJ, p_uploaded_files, p_residents, p_application_headers } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：お住まい`}>
      <ApConfirmItemGroup label={'現在のお住まいの居住年数'}>
        <Stack spacing={1} alignItems={'start'}>
          {p_application_headers.curr_house_lived_year && p_application_headers.curr_house_lived_month && (
            <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
              {formatJapanDate(
                `${p_application_headers.curr_house_lived_year}/${p_application_headers.curr_house_lived_month}`
              )}
            </Typography>
          )}
        </Stack>
      </ApConfirmItemGroup>

      <ApConfirmItemGroup label={'現在のお住まいの種類'}>
        <Stack spacing={1} alignItems={'start'}>
          {p_application_headers.curr_house_residence_type ? (
            <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
              {
                currHouseResidenceTypeOptions.find(
                  (item) => item.value === p_application_headers.curr_house_residence_type
                ).label
              }
            </Typography>
          ) : (
            'ー'
          )}
        </Stack>
      </ApConfirmItemGroup>
      {p_application_headers.curr_house_residence_type === '4' && (
        <Stack>
          <ApConfirmItemGroup label={'所有者の氏名'}>
            {p_application_headers.curr_house_owner_name ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.curr_house_owner_name}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'続柄'}>
            {p_application_headers.curr_house_owner_rel ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.curr_house_owner_rel}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
        </Stack>
      )}

      {p_application_headers.curr_house_residence_type === '5' && (
        <Stack>
          <ApConfirmItemGroup label={'持ち家の処分方法'}>
            {p_application_headers.curr_house_schedule_disposal_type ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  currHouseScheduleDisposalTypeOptions.find(
                    (item) => item.value === p_application_headers.curr_house_schedule_disposal_type
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          {p_application_headers.curr_house_schedule_disposal_type === '99' && (
            <ApConfirmItemGroup label={'その他の詳細'}>
              {p_application_headers.curr_house_schedule_disposal_type_other ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {p_application_headers.curr_house_schedule_disposal_type_other}
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}
          {p_application_headers.curr_house_schedule_disposal_type === '1' && (
            <Stack>
              <ApConfirmItemGroup label={'売却予定時期'}>
                {p_application_headers.curr_house_shell_scheduled_date ? (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    {formatJapanDate(p_application_headers.curr_house_shell_scheduled_date)}
                  </Typography>
                ) : (
                  'ー'
                )}
              </ApConfirmItemGroup>
              <ApConfirmItemGroup label={'売却予定価格'}>
                {p_application_headers.curr_house_shell_scheduled_price ? (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    {Number(p_application_headers.curr_house_shell_scheduled_price).toLocaleString()}
                  </Typography>
                ) : (
                  'ー'
                )}
              </ApConfirmItemGroup>
            </Stack>
          )}
          <ApConfirmItemGroup label={'ローン残高'}>
            {p_application_headers.curr_house_loan_balance_type ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  currHouseLoanBalanceTypeOptions.find(
                    (item) => item.value === p_application_headers.curr_house_loan_balance_type
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
        </Stack>
      )}

      {isMCJ && (
        <ApConfirmItemGroup label={'現在のお住まいの床面積(MCJ固有項目)'}>
          {p_application_headers.curr_house_floor_area ? (
            <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
              {p_application_headers.curr_house_floor_area}
            </Typography>
          ) : (
            'ー'
          )}
        </ApConfirmItemGroup>
      )}

      <ApConfirmItemGroup label={'物件情報の画像添付'}>
        {p_uploaded_files.G.length ? <ApImgItem files={p_uploaded_files.G} /> : '〈 書類はまだ添付されません。〉'}
      </ApConfirmItemGroup>

      <ApConfirmItemGroup label={'物件情報が掲載されたURL'}>
        {p_application_headers.property_publish_url ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {p_application_headers.property_publish_url}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>

      {p_application_headers.loan_target !== '7' && (
        <Stack>
          <ApConfirmItemGroup label={'新しい住居を必要とする理由'}>
            {p_application_headers.new_house_acquire_reason ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  newHouseAcquireReasonOptions.find(
                    (item) => item.value === p_application_headers.new_house_acquire_reason
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          {p_application_headers.new_house_acquire_reason === '99' && (
            <ApConfirmItemGroup label={'その他の詳細'}>
              {p_application_headers.new_house_acquire_reason_other ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {p_application_headers.new_house_acquire_reason_other}
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}

          <ApConfirmItemGroup label={'新しい住居に、あなたは居住しますか？'}>
            {p_application_headers.new_house_self_resident ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.new_house_self_resident}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          {p_application_headers.new_house_self_resident === '0' && (
            <ApConfirmItemGroup label={'「いいえ」の方は理由を入力ください'}>
              {p_application_headers.new_house_self_not_resident_reason ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {p_application_headers.new_house_self_not_resident_reason}
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}
        </Stack>
      )}

      <ApConfirmItemGroup label={'あなた以外の入居予定者'}>
        {p_application_headers.new_house_planned_resident_overview.spouse_umu ||
        p_application_headers.new_house_planned_resident_overview.children_umu ||
        p_application_headers.new_house_planned_resident_overview.father_umu ||
        p_application_headers.new_house_planned_resident_overview.mother_umu ||
        p_application_headers.new_house_planned_resident_overview.brothers_sisters_umu ||
        p_application_headers.new_house_planned_resident_overview.fiance_umu ||
        p_application_headers.new_house_planned_resident_overview.others_umu ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {[
              p_application_headers.new_house_planned_resident_overview.spouse && '配偶者',
              p_application_headers.new_house_planned_resident_overview.children &&
                `子ども${p_application_headers.new_house_planned_resident_overview.children}人`,
              p_application_headers.new_house_planned_resident_overview.father && '父',
              p_application_headers.new_house_planned_resident_overview.mother && '母',
              p_application_headers.new_house_planned_resident_overview.brothers_sisters &&
                `兄弟姉妹${p_application_headers.new_house_planned_resident_overview.brothers_sisters}人`,
              p_application_headers.new_house_planned_resident_overview.fiance && '婚約者',
              p_application_headers.new_house_planned_resident_overview.others &&
                `その他${p_application_headers.new_house_planned_resident_overview.others}人`,
            ]
              .filter((item) => !!item)
              .join(',')}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      {p_application_headers.new_house_planned_resident_overview.others_umu &&
        p_application_headers.new_house_planned_resident_overview.others && (
          <ApConfirmItemGroup label={'その他の続柄'}>
            {p_application_headers.new_house_planned_resident_overview.others_rel ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.new_house_planned_resident_overview.others_rel}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
        )}

      {isMCJ && p_application_headers.new_house_self_resident === '0' && (
        <Stack>
          <ApConfirmItemGroup label={'入居予定者の氏名'}>
            {p_residents.last_name_kanji && p_residents.first_name_kanji ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {`${p_residents.last_name_kanji}${p_residents.first_name_kanji}`}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>

          <ApConfirmItemGroup label={'入居予定者の氏名（フリガナ）'}>
            {p_residents.last_name_kana && p_residents.first_name_kana ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {`${p_residents.last_name_kana}${p_residents.first_name_kana}`}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'続柄'}>
            {p_residents.rel_to_applicant_a_name ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_residents.rel_to_applicant_a_name}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>

          <ApConfirmItemGroup label={'国籍'}>
            {p_residents.nationality ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {nationalityOptions.find((item) => item.value === p_residents.nationality).label}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'生年月日'}>
            {p_residents.birthday ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {formatJapanDate(p_residents.nationality)}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>

          <ApConfirmItemGroup label={'住宅金融支援機構（旧：公庫）からの融資の有無'}>
            {p_residents.loan_from_japan_house_finance_agency ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  loanFromJapanHouseFinanceAgencyOptions.find(
                    (item) => item.value === p_residents.loan_from_japan_house_finance_agency
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>

          <ApConfirmItemGroup label={'電話番号'}>
            {p_residents.contact_phone ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_residents.contact_phone}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'住所'}>
            {p_residents.postal_code ? (
              <Stack spacing={1} alignItems={'start'}>
                <Typography variant="modal_label" color={'text.main'}>
                  {`〒${p_residents.postal_code}`}
                </Typography>
                <Typography variant="modal_label" color={'text.main'}>
                  {`${p_residents.prefecture_kanji}${p_residents.city_kanji}${p_residents.district_kanji}`}
                </Typography>
                <Typography variant="modal_label" color={'text.main'}>
                  {p_residents.other_address_kanji}
                </Typography>
              </Stack>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
        </Stack>
      )}

      <ApConfirmItemGroup label={'新しい住居（融資対象物件）の事業性'}>
        {p_application_headers.property_business_type.length ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {p_application_headers.property_business_type
              .map((item) => propertyBusinessTypeOptions.find((i) => i.value === item).label)
              .join(',')}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>

      <ApConfirmItemGroup label={'ご購入物件の所在地'}>
        {p_application_headers.property_prefecture ||
        p_application_headers.property_city ||
        p_application_headers.property_district ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {`${p_application_headers.property_prefecture}${p_application_headers.property_city}${p_application_headers.property_district}`}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'マンション名・部屋番号'}>
        {p_application_headers.property_apartment_and_room_no ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {p_application_headers.property_apartment_and_room_no}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>

      {['3', '4'].includes(p_application_headers.loan_target) ? (
        <ApConfirmItemGroup label={'ご購入物件の面積'}>
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            〈専有面積〉
            {p_application_headers.property_private_area ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.property_private_area}
              </Typography>
            ) : (
              'ー'
            )}
            ㎡
          </Typography>
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            〈マンション全体の延べ床面積〉
            {p_application_headers.property_total_floor_area ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.property_total_floor_area}
              </Typography>
            ) : (
              'ー'
            )}
            ㎡
          </Typography>
        </ApConfirmItemGroup>
      ) : (
        <ApConfirmItemGroup label={'ご購入物件の面積'}>
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            〈土地の敷地面積〉
            {p_application_headers.property_land_area ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.property_land_area}
              </Typography>
            ) : (
              'ー'
            )}
            ㎡
          </Typography>
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            〈建物の延べ床面積〉
            {p_application_headers.property_floor_area ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_application_headers.property_floor_area}
              </Typography>
            ) : (
              'ー'
            )}
            ㎡
          </Typography>
        </ApConfirmItemGroup>
      )}
      {isMCJ && (
        <Stack>
          <ApConfirmItemGroup label={'ご購入物件の土地権利'}>
            {p_application_headers.property_land_type ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {propertyLandTypeOptions.find((item) => item.value === p_application_headers.property_land_type).label}
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'買戻・保留地・仮換地'}>
            {p_application_headers.property_purchase_type ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  propertyPurchaseTypeOptions.find(
                    (item) => item.value === p_application_headers.property_purchase_type
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={'都市計画区域等 (MCJ固有項目)'}>
            {p_application_headers.property_planning_area ? (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {
                  propertyPlanningAreaOptions.find(
                    (item) => item.value === p_application_headers.property_planning_area
                  ).label
                }
              </Typography>
            ) : (
              'ー'
            )}
          </ApConfirmItemGroup>
          {p_application_headers.property_planning_area === '99' && (
            <ApConfirmItemGroup label={'その他の詳細'}>
              {p_application_headers.property_planning_area_other ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {p_application_headers.property_planning_area_other}
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}

          {['1', '2'].includes(p_application_headers.property_planning_area) && (
            <ApConfirmItemGroup label={'再建築理由'}>
              {p_application_headers.property_rebuilding_reason ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {
                    propertyRebuildingReasonOptions.find(
                      (item) => item.value === p_application_headers.property_rebuilding_reason
                    ).label
                  }
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}
          {p_application_headers.property_rebuilding_reason === '99' && (
            <ApConfirmItemGroup label={'その他の詳細'}>
              {p_application_headers.property_rebuilding_reason_other ? (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  {p_application_headers.property_rebuilding_reason_other}
                </Typography>
              ) : (
                'ー'
              )}
            </ApConfirmItemGroup>
          )}
        </Stack>
      )}
      <ApConfirmItemGroup label={'フラット35S（優良住宅取得支援制度）対象項目'}>
        {p_application_headers.property_flat_35_plan ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {propertyFlat35PlanOptions.find((item) => item.value === p_application_headers.property_flat_35_plan).label}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'維持保全型'}>
        {p_application_headers.property_maintenance_type ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {
              propertyMaintenanceTypeOptions.find(
                (item) => item.value === p_application_headers.property_maintenance_type
              ).label
            }
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      {p_application_headers.property_flat_35_plan === '2' && (
        <ApConfirmItemGroup label={'フラット35S（優良住宅取得支援制度）対象項目②'}>
          {p_application_headers.property_flat_35_tech ? (
            <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
              {
                propertyFlat35TechOptions.find((item) => item.value === p_application_headers.property_flat_35_tech)
                  .label
              }
            </Typography>
          ) : (
            'ー'
          )}
        </ApConfirmItemGroup>
      )}

      <ApConfirmItemGroup label={'地域連携型・地方移住支援型'}>
        {p_application_headers.property_region_type ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {propertyRegionTypeOptions.find((item) => item.value === p_application_headers.property_region_type).label}
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>

      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep07Page.path)}
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
