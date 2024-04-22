import classNames from 'classnames';

import SubmitButton from '../../../presentation-component/ui/submit-button';
import Loading from '../../../components/ui/loading';
import GeneralModal from '../../modal/general-modal';
import { isMobileVersion } from '../../../utils/responsive';
import { ReferralSchemeValidatedDetailResponse } from '../../../types/api/referral';
import {
  RefereeSchemesModalInvocationMode,
  REFEREE_SCHEMES_MODAL_INVOCATION_MODE
} from '../../../constants/application/referral';
import { generateSchemeTimelineNote } from '../../../utils/referral';
import RefereeScheme from '../referee-scheme';
import style from './style.module.scss';

interface PrimaryButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onSubmit?: () => any;
}
interface RefereeSchemesModalProps {
  mode: RefereeSchemesModalInvocationMode;
  code: string;
  schemes: Array<ReferralSchemeValidatedDetailResponse>;
  primaryButton?: PrimaryButtonProps;
  appliedScheme: ReferralSchemeValidatedDetailResponse | null;
  applyingId: number | null; // Scheme ID being applied
  isLoaded: boolean;
  isOpen: boolean;
  onRequestClose?: () => any;
  onSchemeClick: (scheme: ReferralSchemeValidatedDetailResponse) => any;
  onSchemeApply: (scheme: ReferralSchemeValidatedDetailResponse) => any;
  classes?: { modal?: string; container?: string };
}
const RefereeSchemesModal = ({
  mode,
  code,
  schemes,
  primaryButton,
  appliedScheme,
  applyingId,
  isLoaded,
  isOpen,
  onRequestClose,
  onSchemeClick,
  onSchemeApply,
  classes
}: RefereeSchemesModalProps) => {
  const shouldDisplayButton = mode === REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITH_BUTTON;
  const refereeSchemes = schemes
    .map((scheme) => {
      const timelineNote = generateSchemeTimelineNote(scheme);
      return {
        orignalScheme: scheme,
        derivedScheme: {
          code,
          description: scheme.referee_scheme_name || scheme.name,
          guideline: scheme.referee.reward_message,
          progress: !scheme.conditions?.count ? 1 : (scheme.conditions?.matched_count || 0) / scheme.conditions?.count,
          expiry: scheme.end_at,
          timelineNote: timelineNote.value,
          isApplying: applyingId === scheme.id
        }
      };
    })
    .sort((scheme1, scheme2) => scheme2.derivedScheme.progress - scheme1.derivedScheme.progress);

  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Chọn chương trình giới thiệu'}
      fullHeight
      leftTitle=""
      rightIcon={'close'}
      className={classNames(
        style.refereeSchemesModal,
        isMobileVersion() || style.refereeSchemesModalDesktop,
        classes && classes.modal
      )}
      testId={{ name: 'referee-schemes-modal', id: code }}
      onRightActionClick={() => onRequestClose && onRequestClose()}
      onRequestClose={() => onRequestClose && onRequestClose()}
    >
      {isLoaded ? (
        <>
          <div
            className={classNames(
              style.refereeSchemes,
              shouldDisplayButton || style.refereeSchemesWithoutPrimaryButton,
              classes && classes.container
            )}
          >
            {shouldDisplayButton && (
              <div className={style.title}>
                Vui lòng xác nhận chương trình giới thiệu sẽ được áp dụng vào giỏ hàng của bạn
              </div>
            )}
            {!!schemes.length && (
              <div className={style.schemes}>
                {refereeSchemes.map(({ orignalScheme: scheme, derivedScheme }, index) => (
                  <RefereeScheme
                    key={index}
                    scheme={derivedScheme}
                    action={{
                      text:
                        scheme.id === appliedScheme?.id
                          ? 'Đã áp dụng'
                          : derivedScheme.progress < 1
                          ? 'Chưa đủ điều kiện'
                          : 'Áp dụng',
                      withIcon: derivedScheme.progress < 1
                    }}
                    isApplied={scheme.id === appliedScheme?.id}
                    isApplying={derivedScheme.isApplying}
                    isGreyedOut={derivedScheme.progress < 1 || derivedScheme.expiry < new Date().getTime() / 1000}
                    classes={{ container: style.scheme }}
                    onBodyClick={() => onSchemeClick && onSchemeClick(scheme)}
                    onApplyClick={() => onSchemeApply && onSchemeApply(scheme)}
                  />
                ))}
              </div>
            )}
          </div>
          {shouldDisplayButton && !!primaryButton && (
            <div className={style.primaryButtonWrapper}>
              <SubmitButton
                title={primaryButton.title}
                color={'black'}
                loading={primaryButton.loading}
                disabled={primaryButton.disabled}
                classes={{ container: style.primaryButton }}
                onSubmit={() => primaryButton.onSubmit?.()}
              />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </GeneralModal>
  );
};

export type { RefereeSchemesModalProps };
export default RefereeSchemesModal;
