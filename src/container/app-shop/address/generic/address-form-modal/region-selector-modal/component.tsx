import classNames from 'classnames';

import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import AddressModal from '../../../../../../components/address/modal';

interface RegionSelectorModalProps {
  isOpen: boolean;
  classes?: { container?: string };
  onSubmit: (data: any) => any;
  onRequestClose: () => any;
}
const RegionSelectorModal = ({ isOpen, classes, onSubmit, onRequestClose }: RegionSelectorModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Địa chỉ nhận hàng'}
      leftTitle=""
      leftIcon="angle-left"
      rightIcon={'close'}
      fullHeight={true}
      className={classNames(classes && classes.container)}
      isShowHeading={false}
      onLeftActionClick={() => onRequestClose()}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <AddressModal
        getFromDistrict={false}
        onRequestClose={() => onRequestClose()}
        onSaveAddressSelected={(data) => onSubmit(data)}
      />
    </GeneralModal>
  );
};

export default RegionSelectorModal;
