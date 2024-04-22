import classNames from 'classnames';

import Loading from '../../../components/ui/loading';
import ReferralCode from '../../../presentation-component/referral/referral-code';
import ReferralSchemeConditions from '../../../presentation-component/referral/referral-scheme-conditions';
import SubmitButton from '../../../presentation-component/ui/submit-button';
import GeneralModal from '../../modal/general-modal';
import { isMobileVersion } from '../../../utils/responsive';
import { generateSchemeTimelineNote } from '../../../utils/referral';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../presentation-component/general/mobile/no-content-placeholder';
import { ReferralSchemeDetailResponse, ReferralSchemeValidatedDetailResponse } from '../../../types/api/referral';
import { ReferralUser } from '../../../types/api/referral';
import { generateRewardMessage } from './util';
import style from './style.module.scss';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  onClick?: () => any;
}
interface RefereeSchemeDetailModalProps {
  schemeInfo: { code: string; schemeId: number };
  referrer: ReferralUser;
  scheme: ReferralSchemeDetailResponse;
  validatedScheme: ReferralSchemeValidatedDetailResponse;
  codeButton: ButtonProps;
  applyButton: ButtonProps;
  backAction?: { title?: string; icon?: string; onClick?: () => any };
  isLoadFailed: boolean;
  isLoaded: boolean;
  isOpen: boolean;
  isLoggedIn: boolean;
  onCopy: (code: string) => any;
  onRequestClose: () => any;
  onRetry?: () => any;
  classes?: { modal?: string; container?: string };
}
const RefereeSchemeDetailModal = ({
  schemeInfo,
  referrer,
  scheme,
  validatedScheme,
  codeButton,
  applyButton,
  backAction,
  isLoadFailed,
  isLoaded,
  isOpen,
  isLoggedIn,
  onCopy,
  onRequestClose,
  onRetry,
  classes
}: RefereeSchemeDetailModalProps) => {
  let expiry = null;
  let isExpired = false;
  const shouldShowConditions =
    isLoggedIn && scheme?.status !== 'expired' && Array.isArray(validatedScheme?.conditions?.items);
  const timelineNote = generateSchemeTimelineNote(scheme);

  if (scheme) {
    expiry = scheme.end_at;
    isExpired = new Date(expiry * 1000) < new Date();
  }

  return (
    <GeneralModal
      isOpen={isOpen}
      title={scheme?.referee_scheme_name || scheme?.name}
      fullHeight
      leftTitle={backAction?.title}
      leftIcon={backAction?.icon}
      rightIcon={'close'}
      className={classNames(
        style.refereeSchemeDetailModal,
        isMobileVersion() || style.refereeSchemeDetailModalDesktop,
        classes && classes.modal
      )}
      testId={{ name: 'referee-scheme-detail-modal', id: scheme?.id }}
      onLeftActionClick={() => backAction?.onClick?.()}
      onRightActionClick={() => onRequestClose && onRequestClose()}
      onRequestClose={() => onRequestClose && onRequestClose()}
    >
      {isLoaded || isLoadFailed ? (
        <>
          <div
            className={classNames(
              style.refereeSchemeDetail,
              isExpired && style.refereeSchemeDetailNoButton,
              classes && classes.container
            )}
          >
            <ReferralCode
              code={schemeInfo.code}
              title={`Mã giới thiệu của ${(referrer && referrer.first_name) || ''}`}
              button={{
                title: codeButton.title,
                color: codeButton.color || 'borderWhite',
                disabled: codeButton.disabled,
                loading: codeButton.loading,
                onClick: () => codeButton.onClick && codeButton.onClick()
              }}
              classes={{ container: style.referralCode, button: { container: style.button } }}
              onCopy={() => onCopy && onCopy(schemeInfo.code)}
            />
            {isLoadFailed ? (
              <NoContentPlaceholder
                title="Đã có lỗi xảy ra"
                info="Mã giới thiệu bị lỗi"
                logo={NO_CONTENT_LOGO.ROBOT}
                action={{ text: 'Thử lại' }}
                onClick={() => onRetry?.()}
                classes={{ container: style.placeholder, logo: style.logo }}
              />
            ) : (
              <>
                <div className={style.offerTitle}>{generateRewardMessage(scheme)}</div>
                {!timelineNote.shouldHideOnSchemeDetail && !!timelineNote.value && (
                  <div className={classNames(style.timeline, timelineNote.isExpired && style.timelineExpired)}>
                    {timelineNote.value}
                  </div>
                )}
                {shouldShowConditions && (
                  <ReferralSchemeConditions
                    conditions={validatedScheme.conditions.items}
                    classes={{ container: style.referralSchemeConditions }}
                  />
                )}
              </>
            )}
          </div>
          {!isExpired && !isLoadFailed && (
            <div className={style.primaryButtonWrapper}>
              <SubmitButton
                title={applyButton.title}
                color={applyButton.color || 'black'}
                loading={applyButton.loading}
                disabled={applyButton.disabled}
                classes={{ container: style.primaryButton }}
                onSubmit={() => applyButton.onClick && applyButton.onClick()}
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

export type { RefereeSchemeDetailModalProps };
export default RefereeSchemeDetailModal;
