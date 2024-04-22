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
      <div className={style.primarySection}>
        <div className={style.title}>{scheme?.name || ''}</div>
        {!!scheme ? (
          <>
            <ReferralDetail scheme={scheme} button={button} copyButton={copyButton} classes={{ scoop: style.scoop }} />
            <div className={style.genericNote}>{genericNote}</div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default View;
