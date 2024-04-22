// TODO: Migrate to `UserAddresses`
// TODO: Provide navigation
import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { SHIPPING_TYPE } from '../../../../../constants/application/shipping';
import SvgIcon from '../../../../../presentation-component/ui/icon';
// import { navigationTracking } from '../../tracking';
import AddressEntry from '../address-entry';
import AddressFormModal from '../../generic/address-form-modal';
import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

const ENTRY_ACTION_TYPE = Object.freeze({
  SELECT: 'select',
  SET_PRIMARY: 'set_primary',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add'
});

const otherActionEntries = [
  { type: ENTRY_ACTION_TYPE.SET_PRIMARY, name: 'Đặt làm mặc định', icon: 'mark-location' },
  { type: ENTRY_ACTION_TYPE.EDIT, name: 'Chỉnh sửa', icon: 'edit' },
  {
    type: ENTRY_ACTION_TYPE.DELETE,
    name: 'Xóa địa chỉ',
    icon: 'trash',
    confirmation: { message: 'Bạn có muốn xóa địa chỉ này?' }
  }
];

interface IProps {
  onSelect: (param?: any) => any;

  addressStore: any;
  cartStore: any;
  addUserAddressAction: (data: any) => any;
  checkoutAction: (data: any) => any;
  checkoutAddressAction: (data: any) => any;
  checkSameDayShippingAction: (data: any) => any;
  deleteUserAddressAction: (data: any) => any;
  deliveryChooseAddressAction: (data: any) => any;
  editUserAddressAction: (data: any) => any;
  setPrimaryAddressAction: (data: any) => any;
}

const UserAddressSelector = ({
  onSelect,

  addressStore: {
    userAddressList: { list: addresses }
  },
  cartStore: {
    cartDetail,
    cartDetail: { shipping_package },
    constants,
    deliveryConfig,
    deliveryConfig: { giftMessage, noteMessage }
  },
  checkoutAction,
  checkoutAddressAction,
  checkSameDayShippingAction,
  deliveryChooseAddressAction,
  setPrimaryAddressAction,
  addUserAddressAction,
  deleteUserAddressAction,
  editUserAddressAction
}: IProps) => {
  useEffect(() => {
    if (addresses.length - numberOfAddress === 1) {
      const newAddressId = addresses[addresses.length - 1].id;
      onSelectAddressItem(newAddressId);
      setNumberOfAddress(addresses.length);
    }
  }, [addresses]);
  const [numberOfAddress, setNumberOfAddress] = useState(addresses.length);
  const [addressFormModalState, setAddressFormModalState] = useState<{
    mode: 'new' | 'edit';
    visibility: boolean;
    initialAddress: any;
    id?: number;
  }>({
    mode: 'new',
    visibility: false,
    initialAddress: null
  });
  const updateAddressFormModalState = (newState) =>
    setAddressFormModalState((prevState) => Object.assign({}, prevState, newState));

  const isUserPickup = (shipping_package || deliveryConfig.shippingPackage) === SHIPPING_TYPE.USER_PICKUP;
  const providedShippingOrPickupAddress = isUserPickup ? !!cartDetail.warehouse_id : deliveryConfig.addressId !== 0;
  const selectedUserAddressId = providedShippingOrPickupAddress
    ? isUserPickup
      ? null
      : deliveryConfig.addressId
    : null;

  const onSelectAddressItem = (selectedId) => {
    const selectedAddress = addresses.find((address) => address.id === selectedId);
    deliveryChooseAddressAction({ addressId: selectedId });
    checkoutAction({
      saveNewAddress: false,
      addressId: selectedId,
      isGift: giftMessage && !!giftMessage.length,
      giftMessage,
      note: noteMessage
    });

    checkoutAddressAction({
      firstName: selectedAddress.first_name,
      lastName: selectedAddress.last_name,
      phone: selectedAddress.phone,
      addressId: selectedAddress.id
    });
    constants &&
      constants.enabled_same_day_shipping &&
      checkSameDayShippingAction({ districtId: selectedAddress.district_id });
    onSelect(selectedId);
  };

  return (
    <div className={style.userAddressSelector}>
      {addresses.map(({ id, full_name, phone, full_address, is_primary_address }) => (
        <AddressEntry
          key={id}
          id={id}
          title={`${full_name}, ${phone}`}
          description={full_address}
          selected={selectedUserAddressId === id}
          primary={is_primary_address}
          actions={otherActionEntries.filter((entry) =>
            is_primary_address
              ? ![ENTRY_ACTION_TYPE.SET_PRIMARY, ENTRY_ACTION_TYPE.DELETE].includes(entry.type as any)
              : selectedUserAddressId === id
              ? ENTRY_ACTION_TYPE.DELETE !== entry.type
              : true
          )}
          onAction={({ id, type, repeat }) => {
            switch (type) {
              case ENTRY_ACTION_TYPE.EDIT:
                updateAddressFormModalState({
                  mode: 'edit',
                  visibility: true,
                  id,
                  initialAddress: addresses.find((address) => address.id === id)
                });
                break;
              case ENTRY_ACTION_TYPE.DELETE:
                deleteUserAddressAction(id);
                break;
              case ENTRY_ACTION_TYPE.SELECT:
                if (repeat) {
                  onSelect(id);
                  break;
                }
                onSelectAddressItem(id);
                break;
              case ENTRY_ACTION_TYPE.SET_PRIMARY:
                setPrimaryAddressAction({ addressId: id, fetchAddressesOnSuccess: true });
                break;
            }
          }}
          className={style.entry}
        />
      ))}
      <div
        {...generateTestId({ name: 'add-new-address' })}
        className={classNames(style.addAddressSection, style.entry)}
        onClick={() => {
          updateAddressFormModalState({ mode: 'new', visibility: true });
        }}
      >
        <SvgIcon name="add" className={style.icon} />
        <div className={style.title}>Thêm địa chỉ mới</div>
      </div>
      <AddressFormModal
        isOpen={addressFormModalState.visibility}
        mode={addressFormModalState.mode}
        initialAddress={addressFormModalState.initialAddress}
        id={addressFormModalState.id}
        submitButtonText="Giao đến địa chỉ này"
        classes={{
          container: style.addressFormModal,
          form: style.addressFormModalForm,
          regionSelectorModalContainer: style.regionSelectorModal
        }}
        onSubmit={({ mode, data }) => {
          switch (mode) {
            case 'new':
              addUserAddressAction(data);
              break;
            case 'edit':
              onSelectAddressItem(addressFormModalState.id);
              editUserAddressAction(Object.assign({}, data, { id: addressFormModalState.initialAddress.id }));
              break;
          }
          updateAddressFormModalState({ visibility: false });
        }}
        onRequestClose={() => {
          updateAddressFormModalState({ visibility: false });
        }}
      />
    </div>
  );
};

UserAddressSelector.defaultProps = {
  onSelect: () => {}
};

export default UserAddressSelector;
