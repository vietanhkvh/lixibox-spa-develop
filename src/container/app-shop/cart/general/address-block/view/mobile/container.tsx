import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import GeneralModal from 'presentation-component/modal/general-modal';
import SvgIcon from 'presentation-component/ui/icon';
import MobileConfirmation from 'components/ui/mobile-confirmation';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { PAYMENT_PHASES } from 'constants/application/payment';
import { changeAlias } from 'utils/format';
import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import { auth } from 'utils/auth';
import { setCustomReferrer } from 'utils/navigate';
import { ROUTING_AUTH_CHECKOUT_FAST_TRACK, ROUTING_CHECK_OUT } from 'routings/path';
import { navigationTracking } from 'container/app-shop/cart/payment/tracking';
import TabView from 'container/app-shop/address/mobile/tab-view';
import AddressEntry from 'container/app-shop/address/mobile/address-entry';
import AddressFormModal from 'container/app-shop/address/generic/address-form-modal';
import BuyerPhoneFormModal from './buyer-phone-form-modal';
import { PropsFromRedux } from './store';
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

const UserAddressIndex = ({ addresses, selectedAddressId, onAction }) => {
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
          selected={selectedAddressId === id}
          primary={is_primary_address}
          actions={contextMenuEntries.filter((entry) =>
            is_primary_address
              ? ![ENTRY_ACTION_TYPE.SET_PRIMARY, ENTRY_ACTION_TYPE.DELETE].includes(entry.type as any)
              : selectedAddressId === id
              ? ENTRY_ACTION_TYPE.DELETE !== entry.type
              : true
          )}
          onAction={(data) => onAction(data)}
        />
      ))}
      <div
        {...generateTestId({ name: 'btn-add-new-address-checkout' })}
        className={style.addAddressSection}
        onClick={() => onAction({ type: ENTRY_ACTION_TYPE.ADD })}
      >
        <div className={style.iconContainer}>
          <SvgIcon name="add" className={style.icon} />
        </div>
        <div className={style.title}>Thêm địa chỉ mới</div>
      </div>
    </div>
  );
};

const StoreIndex = ({ stores, selectedAddressId, onSelect }) => {
  const [filteredStores, setFilteredStores] = useState(stores);

  return (
    <div className={style.storeIndex}>
      <div className={style.searchSection}>
        <input
          className={style.searchInput}
          type="text"
          placeholder="Tìm kiếm cửa hàng Tỉnh / Thành phố"
          autoComplete="off"
          onChange={(event) =>
            setFilteredStores(
              stores.filter((store) => changeAlias(store.name).includes(event.target.value.toLocaleLowerCase()))
            )
          }
        />
        <div className={style.iconContainer}>
          <SvgIcon name="search" className={style.icon} />
        </div>
      </div>
      {filteredStores
        .filter((store) => store.pickupable)
        .map(({ id, name, full_address }) => (
          <AddressEntry
            key={id}
            id={id}
            title={name}
            description={full_address}
            selected={selectedAddressId === id}
            onAction={(data) => data.type === ENTRY_ACTION_TYPE.SELECT && onSelect(data)}
          />
        ))}
    </div>
  );
};

interface ModalProps {
  tabs: Array<any>;
  initialTabId: number;
  isOpen: boolean;
  onSubmit: (val: string) => any;
  onRequestClose: () => any;
}

const AddressModal = ({ tabs, initialTabId, isOpen, onSubmit, onRequestClose }: ModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Chọn hình thức giao hàng'}
      leftTitle=""
      rightIcon={'close'}
      fullHeight={true}
      className={style.addressModal}
      testId={{ name: 'address-modal' }}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <TabView entries={tabs} initialEntryId={initialTabId} />
    </GeneralModal>
  );
};

interface IProps extends PropsFromRedux {
  classes?: { container?: string };
}

const AddressBlock = ({
  classes,
  addressStore: {
    userAddressList: { list: _list }
  },
  cartStore: {
    cartDetail,
    cartDetail: { shipping_package, warehouse_id, contact_phone, phone },
    constants,
    deliveryConfig,
    deliveryConfig: { giftMessage, noteMessage },
    stores,
    paymentHighlightErrorBlock
  },
  authStore: { profile, signInStatus },
  addUserAddressAction,
  checkout,
  checkoutAddressAction,
  checkSameDayShippingAction,
  deleteUserAddressAction,
  deliveryChooseAddress,
  deliverySetDeliveryMethod,
  deliveryUserPickupStoreAddressAction,
  editUserAddressAction,
  setPrimaryAddressAction,
  updateContactPhoneAction,
  setAddressReadiness
}: IProps) => {
  const history = useHistory();
  const list = _list || [];
  const buyerPhoneNumber = contact_phone || profile?.phone || phone || '';

  const PRIMARY_MODAL_TAB = Object.freeze({
    userAddress: 1,
    userPickup: 2
  });
  type PrimayModalTabType = (typeof PRIMARY_MODAL_TAB)[keyof typeof PRIMARY_MODAL_TAB];

  const [primaryModalVisibility, setPrimaryModalVisibility] = useState<{
    visible: boolean;
    selectedTab: PrimayModalTabType;
  }>({
    visible: false,
    selectedTab: PRIMARY_MODAL_TAB.userAddress
  });
  const updatePrimaryModalVisibility = (
    visibility: boolean,
    tabId: PrimayModalTabType = PRIMARY_MODAL_TAB.userAddress
  ) => setPrimaryModalVisibility({ visible: visibility, selectedTab: tabId });
  const [addressFormModalState, setAddressFormModalState] = useState<{
    mode: 'new' | 'edit' | 'pickup';
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
  const [buyerContactModalVisibility, setBuyerContactModalVisibility] = useState(false);
  const [confirmationState, setConfirmationState] = useState({
    type: CONFIRMATION_TYPE.ADDRESS_DELETE,
    visibility: false,
    title: '',
    prompt: '',
    button: { text: '', icon: '' },
    data: null
  });
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.address.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.address.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.address.id;
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));

  /** TODO: Check if address should be get from cart instead of deliveryConfig */
  const isUserPickup = (shipping_package || deliveryConfig.shippingPackage) === SHIPPING_TYPE.USER_PICKUP;
  const providedShippingOrPickupAddress = isUserPickup
    ? !!cartDetail.warehouse_id
    : deliveryConfig.addressId !== 0 && !!list.find((address) => address.id === deliveryConfig.addressId);
  const selectedAddressId = providedShippingOrPickupAddress
    ? isUserPickup
      ? cartDetail.warehouse_id
      : deliveryConfig.addressId
    : null;
  const pickupAddress = isUserPickup ? stores.find((store) => store.id === warehouse_id) : null;
  const userAddress = isUserPickup ? null : list.find((address) => address.id === deliveryConfig.addressId);
  const modalTabEntries: { id: number; name: string; component: any }[] = [
    {
      id: PRIMARY_MODAL_TAB.userAddress,
      name: 'Giao hàng tận nơi',
      component: (
        <UserAddressIndex
          addresses={list}
          selectedAddressId={selectedAddressId}
          onAction={({ type, id, repeat }) => {
            switch (type) {
              case ENTRY_ACTION_TYPE.ADD:
                updatePrimaryModalVisibility(false);
                updateAddressFormModalState({ mode: 'new', visibility: true });
                break;
              case ENTRY_ACTION_TYPE.EDIT:
                updatePrimaryModalVisibility(false);
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
              case ENTRY_ACTION_TYPE.SELECT:
                if (repeat) {
                  updatePrimaryModalVisibility(false);
                  break;
                }
                const selectedAddress = list.find((address) => address.id === id);
                deliveryChooseAddress({ addressId: id });
                checkout({
                  saveNewAddress: false,
                  addressId: id,
                  isGift: giftMessage && !!giftMessage.length,
                  giftMessage,
                  note: noteMessage
                });
                checkoutAddressAction({
                  firstName: selectedAddress.first_name,
                  lastName: selectedAddress.last_name,
                  phone: selectedAddress.phone,
                  addressId: id
                });
                constants &&
                  constants.enabled_same_day_shipping &&
                  checkSameDayShippingAction({ districtId: selectedAddress.district_id });
                updatePrimaryModalVisibility(false);
                break;
              case ENTRY_ACTION_TYPE.SET_PRIMARY:
                setPrimaryAddressAction({ addressId: id, fetchAddressesOnSuccess: true });
                break;
            }
          }}
        />
      )
    }
  ];
  constants.enabled_user_pickup_shipping_package &&
    modalTabEntries.push({
      id: PRIMARY_MODAL_TAB.userPickup,
      name: 'Nhận tại cửa hàng',
      component: (
        <StoreIndex
          stores={stores}
          selectedAddressId={selectedAddressId}
          onSelect={({ id }) => {
            updatePrimaryModalVisibility(false);
            updateAddressFormModalState({ mode: 'pickup', visibility: true, id });
            updatePrimaryModalVisibility(false);
          }}
        />
      )
    });
  useEffect(() => {
    setAddressReadiness(Boolean(providedShippingOrPickupAddress));
  }, [providedShippingOrPickupAddress, signInStatus, profile, cartDetail?.address_id]);

  return (
    <>
      <div
        id={PAYMENT_PHASES.address.id}
        className={classNames(
          style.addressBlock,
          isBlockValid || style.blockError,
          classes?.container,
          !providedShippingOrPickupAddress && style.addressBlockEmpty
        )}
        ref={blockRef}
        onClick={() => {
          if (!auth.loggedIn()) {
            setCustomReferrer({ value: ROUTING_CHECK_OUT });
            history.push({ pathname: ROUTING_AUTH_CHECKOUT_FAST_TRACK, state: { referrer: ROUTING_CHECK_OUT } });
            return;
          }

          navigationTracking('block', 'Address');
          updatePrimaryModalVisibility(
            true,
            isUserPickup ? PRIMARY_MODAL_TAB.userPickup : PRIMARY_MODAL_TAB.userAddress
          );
        }}
        {...generateTestId({ name: 'address-block' })}
      >
        <div className={style.header}>
          <div className={style.status}>
            <SvgIcon name="mark-location" className={style.icon} />
          </div>
          <div className={classNames(style.title, 'lineClamp1')}>
            {providedShippingOrPickupAddress
              ? `${userAddress.full_name}, ${userAddress.phone}`
              : 'Vui lòng chọn địa chỉ'}
          </div>
          <div className={style.action}>
            <SvgIcon name="angle-right" className={style.icon} />
          </div>
        </div>
        {providedShippingOrPickupAddress && (
          <div className={style.brief}>
            <div className={classNames(style.address, 'lineClamp1')}>
              {isUserPickup ? pickupAddress.full_address : userAddress.full_address}
            </div>
          </div>
        )}
      </div>
      <AddressModal
        isOpen={primaryModalVisibility.visible}
        tabs={modalTabEntries}
        initialTabId={primaryModalVisibility.selectedTab}
        onSubmit={() => {
          updatePrimaryModalVisibility(false);
        }}
        onRequestClose={() => updatePrimaryModalVisibility(false)}
      />
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
              editUserAddressAction(Object.assign({}, data, { id: addressFormModalState.initialAddress.id }));
              break;
            case 'pickup':
              deliverySetDeliveryMethod({ deliveryMethod: SHIPPING_TYPE.USER_PICKUP });
              deliveryUserPickupStoreAddressAction({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
              });
              checkoutAddressAction({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                addressId: data.address_id
              });
              break;
          }
          updateAddressFormModalState({ visibility: false });
        }}
        onRequestClose={({ mode }) => {
          updateAddressFormModalState({ visibility: false });
          updatePrimaryModalVisibility(
            true,
            mode === 'pickup' ? PRIMARY_MODAL_TAB.userPickup : PRIMARY_MODAL_TAB.userAddress
          );
        }}
      />
      <BuyerPhoneFormModal
        isOpen={buyerContactModalVisibility}
        initialValue={buyerPhoneNumber}
        onSubmit={({ phone }) => {
          updateContactPhoneAction(phone);
          setBuyerContactModalVisibility(false);
        }}
        onRequestClose={() => setBuyerContactModalVisibility(false)}
      />
      <MobileConfirmation
        isOpen={confirmationState.visibility}
        title={confirmationState.title}
        prompt={confirmationState.prompt}
        confirmationButton={confirmationState.button}
        data={confirmationState.data}
        testId={{ name: 'address-block-confirmation-modal' }}
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

export default AddressBlock;
