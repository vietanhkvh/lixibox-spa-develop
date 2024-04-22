import { useState } from 'react';

import MobileConfirmation from '../../../../../components/ui/mobile-confirmation';
import SubmitButton from '../../../../../presentation-component/ui/submit-button';
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

const CONFIRMATION_TYPE = Object.freeze({
  ADDRESS_DELETE: 'address_delete'
});

const UserAddressIndex = ({ addresses, onAction }) => {
  const contextMenuEntries = [
    { type: ENTRY_ACTION_TYPE.SET_PRIMARY, name: 'Đặt làm mặc định', icon: 'mark-location' },
    { type: ENTRY_ACTION_TYPE.EDIT, name: 'Chỉnh sửa', icon: 'edit' },
    { type: ENTRY_ACTION_TYPE.DELETE, name: 'Xóa địa chỉ', icon: 'trash' }
  ];
  return (
    <div className={style.userAddressIndex}>
      {addresses.map(({ id, full_name, phone, full_address, is_primary_address }) => (
        <AddressEntry
          key={id}
          id={id}
          title={`${full_name}, ${phone}`}
          description={full_address}
          selectable={false}
          primary={is_primary_address}
          className={style.userAddressEntry}
          actions={contextMenuEntries.filter((entry) =>
            is_primary_address ? ![ENTRY_ACTION_TYPE.SET_PRIMARY, ENTRY_ACTION_TYPE.DELETE].includes(entry.type) : true
          )}
          onAction={(data) => data.repeat || onAction(data)}
        />
      ))}
      <div className={style.stickyAddAddressSection}>
        <SubmitButton
          icon={{ name: 'add', position: 'left' }}
          title={'Thêm địa chỉ mới'}
          color="black"
          classes={{ container: style.button, icon: style.icon }}
          onSubmit={() => onAction({ type: ENTRY_ACTION_TYPE.ADD })}
        />
      </div>
    </div>
  );
};

interface IProps {
  addressStore: any;
  addUserAddressAction: (data: any) => any;
  deleteUserAddressAction: (data: any) => any;
  editUserAddressAction: (data: any) => any;
  setPrimaryAddressAction: (data: any) => any;
}

const UserAddresses = ({
  addressStore: {
    userAddressList: { list }
  },
  addUserAddressAction,
  deleteUserAddressAction,
  editUserAddressAction,
  setPrimaryAddressAction
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
  const [confirmationState, setConfirmationState] = useState({
    type: CONFIRMATION_TYPE.ADDRESS_DELETE,
    visibility: false,
    title: '',
    prompt: '',
    button: { text: '', icon: '' },
    data: null
  });
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));

  return (
    <>
      <UserAddressIndex
        addresses={list}
        onAction={({ type, id }) => {
          switch (type) {
            case ENTRY_ACTION_TYPE.ADD:
              updateAddressFormModalState({ mode: 'new', visibility: true });
              break;
            case ENTRY_ACTION_TYPE.EDIT:
              updateAddressFormModalState({
                mode: 'edit',
                visibility: true,
                initialAddress: list.find((address) => address.id === id)
              });
              break;
            case ENTRY_ACTION_TYPE.DELETE:
              updateConfirmationState({
                type: CONFIRMATION_TYPE.ADDRESS_DELETE,
                title: 'Xóa địa chỉ',
                prompt: 'Bạn có muốn xóa địa chỉ này ra khỏi sổ địa chỉ?',
                button: { text: 'Xóa', icon: 'trash' },
                visibility: true,
                data: { id }
              });
              break;
            case ENTRY_ACTION_TYPE.SET_PRIMARY:
              setPrimaryAddressAction({ addressId: id, fetchAddressesOnSuccess: true });
              break;
          }
        }}
      />
      <AddressFormModal
        isOpen={addressFormModalState.visibility}
        mode={addressFormModalState.mode}
        initialAddress={addressFormModalState.initialAddress}
        id={addressFormModalState.id}
        submitButtonText="Lưu địa chỉ"
        classes={{
          container: style.addressFormModal,
          regionSelectorModalContainer: style.regionSelectorModal
        }}
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
      <MobileConfirmation
        isOpen={confirmationState.visibility}
        title={confirmationState.title}
        prompt={confirmationState.prompt}
        confirmationButton={confirmationState.button}
        data={confirmationState.data}
        onCancel={() => updateConfirmationState({ visibility: false })}
        onConfirm={({ id }) => {
          switch (confirmationState.type) {
            case CONFIRMATION_TYPE.ADDRESS_DELETE:
              deleteUserAddressAction(id);
              break;
          }
          updateConfirmationState({ visibility: false });
        }}
      />
    </>
  );
};

export default UserAddresses;
