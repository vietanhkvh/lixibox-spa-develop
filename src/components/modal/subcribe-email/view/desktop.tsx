import { Heading, Message, InputForm } from './view-general';
import styles from './style.module.scss';

const MinimalSticky = ({ handleToggleMinial }) => (
  <div className={styles.minimalContainer} onClick={() => handleToggleMinial(false)}>
    <Heading />
  </div>
);

const FullContent = ({ isSuccess, handleSubmit, isSubmitLoading, handleToggleMinial }) => (
  <div className={styles.desktopContainer}>
    <div className={styles.mainForm}>
      <Heading isOpen={true} onClick={() => handleToggleMinial(true)} />
      <Message isSuccess={isSuccess} />
      {!isSuccess && <InputForm {...{ handleSubmitForm: handleSubmit, isSubmitLoading }} />}
    </div>
  </div>
);

const View = ({ handleSubmit, isSubmitLoading, isMinimal, isSuccess, handleToggleMinial }) => {
  return isMinimal ? (
    <MinimalSticky {...{ handleToggleMinial }} />
  ) : (
    <FullContent
      {...{
        handleSubmit,
        isSuccess,
        isSubmitLoading,
        handleToggleMinial
      }}
    />
  );
};

export default View;
