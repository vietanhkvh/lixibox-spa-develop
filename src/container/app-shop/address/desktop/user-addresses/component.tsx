// TODO: Provide navigation
import { useState } from 'react';
import classNames from 'classnames';

import SvgIcon from '../../../../../presentation-component/ui/icon';
// import { navigationTracking } from '../../tracking';
import AddressEntry from '../address-entry';
import AddressFormModal from '../../generic/address-form-modal';
import style from './style.module.scss';

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
  className?: string;
  addressStore: any;
  addUserAddressAction: (data: any) => any;
  deleteUserAddressAction: (data: any) => any;
  editUserAddressAction: (data: any) => any;
  setPrimaryAddressAction: (data: any) => any;
}
const UserAddresses = ({
  className,
  addressStore: {
    userAddressList: { list: addresses }
  },
  setPrimaryAddressAction,
  addUserAddressAction,
  deleteUserAddressAction,
  editUserAddressAction
}: IProps) => {
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

  return (
    <div className={classNames(style.userAddresses, className)}>
      {addresses.map(({ id, full_name, phone, full_address, is_primary_address }) => (
        <AddressEntry
          key={id}
          id={id}
          title={`${full_name}, ${phone}`}
          description={full_address}
          selectable={false}
          clickable={false}
          primary={is_primary_address}
          actions={otherActionEntries.filter((entry) =>
            is_primary_address ? ![ENTRY_ACTION_TYPE.SET_PRIMARY, ENTRY_ACTION_TYPE.DELETE].includes(entry.type) : true
          )}
          onAction={({ id, type }) => {
            switch (type) {
              case ENTRY_ACTION_TYPE.EDIT:
                updateAddressFormModalState({
                  mode: 'edit',
                  visibility: true,
                  initialAddress: addresses.find((address) => address.id === id)
                });
                break;
              case ENTRY_ACTION_TYPE.DELETE:
                deleteUserAddressAction(id);
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
        submitButtonText="Lưu địa chỉ"
        classes={{ container: style.addressFormModal, regionSelectorModalContainer: style.regionSelectorModal }}
        onSubmit={({ mode, data }) => {
          switch (mode) {
            case 'new':
              addUserAddressAction(data);
              break;
            case 'edit':
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

export default UserAddresses;
