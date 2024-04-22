import CreateNewUnboxingFeed from '../../../unboxing-feedback-inner-block';
import MobileScreenHeader from '../../../../../../../presentation-component/general/mobile-screen-header';
import MobileAutoDisplayHeader from '../../../../../../../presentation-component/general/mobile-auto-display-header';

const View = () => {
  return (
    <>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Chia sẻ link đập hộp'} />
      </MobileAutoDisplayHeader>
      <CreateNewUnboxingFeed />
    </>
  );
};

export default View;
