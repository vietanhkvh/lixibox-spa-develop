import MobileAutoDisplayHeader from '../../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../../presentation-component/general/mobile-screen-header';
import ReferralDetail from '../../../../../presentation-component/referral/referral-detail';
import Loading from '../../../../../components/ui/loading';
import { generateTestId } from 'utils/test-utils';
import { ViewProps } from '../../component';
import style from './style.module.scss';

const View = ({ scheme, button, copyButton, genericNote }: ViewProps) => {
  return (
    <div
      className={style.referralDetailContainer}
      {...generateTestId({ name: 'referral-detail-container', id: scheme?.name })}
    >
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={scheme?.name || ''} />
      </MobileAutoDisplayHeader>
      {!!scheme ? (
        <>
          <ReferralDetail
            scheme={scheme}
            button={button}
            copyButton={copyButton}
            classes={{ container: style.referralDetail }}
          />
          <div className={style.genericNote}>{genericNote}</div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default View;
