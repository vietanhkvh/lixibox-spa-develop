// TODO: Provide tracking
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SHIPPING_TYPE } from '../../../../../constants/application/shipping';
import { changeAlias } from '../../../../../utils/format';
import { validationMessage } from '../../../../../utils/validate';
import { getFirstName, getLastName } from '../../../../../utils/validate';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import SubmitButton from '../../../../../components/ui/submit-button';
import FormEntry from '../../../../../presentation-component/ui/form-entry';
// import { navigationTracking } from '../../tracking';
import style from './style.module.scss';

const FieldTitle = {
  fullName: 'Tên công ty',
  phone: 'Số điện thoại'
};
const getFormSchema = () =>
  yup.object().shape({
    fullName: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .matches(/(.+[ ]+)+.+/, ({ path }) => validationMessage.pattern(FieldTitle[path]))
      .min(3, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)),
    phone: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(10, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .max(10, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
      .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(FieldTitle[path]))
  });
let formEntries = [
  {
    name: 'fullName',
    title: 'Tên công ty',
    placeholder: 'Nhập tên công ty',
    required: true,
    type: 'text'
  },
  {
    name: 'phone',
    title: 'Số điện thoại',
    placeholder: 'Nhập số điện thoại người nhận',
    required: true,
    inputMode: 'numeric',
    type: 'tel'
  }
];
interface IProps {
  onSelect: (param?: any) => any;
  cartStore: any;
  checkoutAddressAction: (data: any) => any;
  deliverySetDeliveryMethod: (data: any) => any;
  deliveryUserPickupStoreAddressAction: (data: any) => any;
}
const PickupStoreSelector = ({
  onSelect,
  cartStore: {
    cartDetail: { warehouse_id, first_name, last_name, phone },
    stores
  },
  checkoutAddressAction,
  deliverySetDeliveryMethod,
  deliveryUserPickupStoreAddressAction
}: IProps) => {
  const { register, setValue, getValues, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(getFormSchema())
  });
  const [filteredStores, setFilteredStores] = useState(stores);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(warehouse_id);
  useEffect(() => {
    setSelectedWarehouseId(warehouse_id);
  }, [warehouse_id]);
  const { errors } = formState;
  const isValid = () => !Object.keys(errors).length;

  useEffect(() => {
    setValue('fullName' as never, `${last_name || ''} ${first_name || ''}`);
    setValue('phone' as never, phone || '');
  }, [first_name, last_name, phone]);

  const isPrimaryActionDisabled = !isValid() || !selectedWarehouseId || !getValues('fullName') || !getValues('phone');

  return (
    <div className={style.pickupStoreSelector}>
      <div className={style.searchBar}>
        <input
          type="text"
          placeholder="Tìm kiếm cửa hàng Tỉnh / Thành phố"
          autoComplete="off"
          onChange={(event) =>
            setFilteredStores(
              stores.filter((store) => changeAlias(store.full_address).includes(event.target.value.toLocaleLowerCase()))
            )
          }
        />
        <SvgIcon name="search" className={style.icon} />
      </div>
      <div className={style.stores}>
        {filteredStores
          .filter((store) => store.pickupable)
          .map((store) => (
            <div
              key={store.id}
              className={style.store}
              onClick={() => {
                setSelectedWarehouseId(store.id);
              }}
            >
              <SvgIcon
                name={selectedWarehouseId === store.id ? 'radio-checked' : 'radio-empty'}
                className={classNames(style.status, selectedWarehouseId === store.id && style.statusSelected)}
              />
              <div className={style.address}>{store.full_address}</div>
            </div>
          ))}
      </div>
      <div className={style.recipientForm}>
        {formEntries.map((entry) => (
          <FormEntry
            {...{
              key: entry.name,
              classes: { container: style.field },
              error: errors[entry.name],
              ref: register,
              ...entry
            }}
          />
        ))}
      </div>
      <div className={style.actions}>
        <SubmitButton
          title="Hoàn thành"
          className={classNames(style.action, isPrimaryActionDisabled && style.actionDisabled)}
          titleClass={style.actionTitle}
          disabled={isPrimaryActionDisabled}
          onSubmit={() => {
            const { fullName, phone }: any = getValues();
            const formattedFields = {
              phone,
              firstName: getFirstName(fullName),
              lastName: getLastName(fullName)
            };
            const formattedFieldsWithStoreId = Object.assign({}, formattedFields, { warehouseId: selectedWarehouseId });
            deliverySetDeliveryMethod({ deliveryMethod: SHIPPING_TYPE.USER_PICKUP });
            deliveryUserPickupStoreAddressAction(formattedFields);
            checkoutAddressAction(formattedFieldsWithStoreId);
            onSelect(formattedFieldsWithStoreId);
          }}
        />
      </div>
    </div>
  );
};
PickupStoreSelector.defaultProps = {
  onSelect: () => {}
};

export default PickupStoreSelector;
