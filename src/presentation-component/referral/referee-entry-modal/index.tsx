import classNames from 'classnames';

import Loading from '../../../components/ui/loading';
import ReferralCode from '../../../presentation-component/referral/referral-code';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../presentation-component/general/mobile/no-content-placeholder';
import { isMobileVersion } from '../../../utils';
import { generateSchemeTimelineNote } from '../../../utils/referral';
import { ReferralSchemeDetailResponse } from '../../../types/api/referral';
import GeneralModal from '../../modal/general-modal';
import SvgIcon from '../../ui/icon';
import RefereeScheme from '../referee-scheme';
import style from './style.module.scss';
import { useEffect } from 'react';
import { gatewayTrackViewReferralCode } from 'tracking/gateway';
import { usePrevious } from 'utils/hook';

interface RefereeEntryModalProps {
  code: string;
  referrerName: string;
  schemes: Array<ReferralSchemeDetailResponse>;
  button: {
    title: string;
    onClick: () => any;
  };
  isLoaded: boolean;
  isLoadFailed: boolean;
  isOpen: boolean;
  onCopy: () => any;
  onSchemeClick: (scheme: ReferralSchemeDetailResponse) => any;
  onRequestClose?: () => any;
  onRetry?: () => any;
  classes?: { modal?: string; container?: string };
}
const RefereeEntryModal = ({
  code,
  referrerName,
  schemes,
  button,
  isLoaded,
  isLoadFailed,
  isOpen,
  onCopy,
  onSchemeClick,
  onRequestClose,
  onRetry,
  classes
}: RefereeEntryModalProps) => {
  const wasOpen = usePrevious(isOpen);
  useEffect(() => {
    wasOpen !== undefined && !wasOpen && isOpen && gatewayTrackViewReferralCode({ code });
  }, [isOpen, wasOpen, code]);
  const getTimelineNote = (scheme: ReferralSchemeDetailResponse) => {
    const timelineNote = generateSchemeTimelineNote(scheme);
    return timelineNote.value;
  };

  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Mã giới thiệu'}
      leftTitle=""
      rightIcon={'close'}
      className={classNames(
        style.refereeEntryModal,
        isMobileVersion() || style.refereeEntryModalDesktop,
        classes && classes.modal
      )}
      testId={{ name: 'referee-entry-modal', id: code }}
      onRightActionClick={() => onRequestClose && onRequestClose()}
      onRequestClose={() => onRequestClose && onRequestClose()}
    >
      {isLoaded || isLoadFailed ? (
        <div className={classNames(style.refereeEntry, classes && classes.container)}>
          <div className={style.title}>Bạn nhận được mã giới thiệu từ {referrerName}</div>
          <SvgIcon name="color-gift" className={style.icon} />
          <ReferralCode
            code={code}
            title="Nhập mã giới thiệu"
            button={{
              title: button.title,
              onClick: () => button.onClick && button.onClick()
            }}
            classes={{ container: style.referralCode, button: { container: style.button } }}
            onCopy={() => onCopy && onCopy()}
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
              <div className={style.offerTitle}>Chương trình giới thiệu</div>
              {!!schemes.length && (
                <div className={style.refereeSchemes}>
                  {schemes.map((scheme, index) => (
                    <RefereeScheme
                      {...{
                        key: index,
                        scheme: {
                          code: code,
                          description: scheme.referee_scheme_name || scheme.name,
                          guideline: scheme.referee.reward_message,
                          expiry: scheme.end_at,
                          timelineNote: getTimelineNote(scheme)
                        },
                        action: { text: 'Xem thêm', withIcon: true },
                        classes: { container: style.refereeScheme },
                        onBodyClick: () => onSchemeClick && onSchemeClick(scheme),
                        onApplyClick: () => onSchemeClick && onSchemeClick(scheme)
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </GeneralModal>
  );
};

export type { RefereeEntryModalProps };
export default RefereeEntryModal;
