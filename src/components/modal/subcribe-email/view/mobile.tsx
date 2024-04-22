import GeneralModal from '../../../../presentation-component/modal/general-modal';
import SvgIcon from 'presentation-component/ui/icon';

import { Heading, Message, InputForm } from './view-general';
import styles from './style.module.scss';

const View = ({ isMinimal, isSuccess, handleToggleMinial, handleSubmit, isSubmitLoading }) => (
  <>
    {!!isMinimal && (
      <div className={styles.stickyContainer}>
        <SvgIcon name={'gift'} className={styles.giftIcon} onClick={() => handleToggleMinial(false)} />
      </div>
    )}
    <GeneralModal
      isOpen={!isMinimal}
      isShowHeading={false}
      title={''}
      leftTitle={''}
      rightIcon={''}
      className={styles.confirmationModal}
      onRightActionClick={() => {
        handleToggleMinial(true);
      }}
      onRequestClose={() => {
        handleToggleMinial(true);
      }}
    >
      <div className={styles.mobileContainer}>
        <div className={styles.modelHeading}>
          <Heading isOpen={true} onClick={() => handleToggleMinial(true)} />
        </div>
        <div className={styles.mainContent}>
          <Message isSuccess={isSuccess} />
          {!isSuccess && (
            <InputForm
              {...{
                handleSubmitForm: handleSubmit,
                isSubmitLoading
              }}
            />
          )}
        </div>
      </div>
    </GeneralModal>
  </>
);
export default View;
