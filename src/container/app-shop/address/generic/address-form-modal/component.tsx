import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GeneralModal from '../../../../../presentation-component/modal/general-modal';
import FormEntry from '../../../../../presentation-component/ui/form-entry';
import StickyActionButton from '../../../../../components/ui/sticky-action-button';
import RegionSelectorModal from './region-selector-modal';
import { LETTERS_ONLY } from 'constants/application/regexPattern';
import { getFirstName, getLastName } from '../../../../../utils/validate';
import { validationMessage } from '../../../../../utils/validate';
import style from './style.module.scss';

const FieldTitle = {
  address: 'Địa chỉ nhận hàng',
  districtId: 'Quận / Huyện',
  fullName: 'Tên người nhận',
  phone: 'Số điện thoại',
  provinceId: 'Tỉnh / Thành phố',
  wardId: 'Phường / Xã'
};
const getFormSchema = ({ mode }) =>
  yup.object().shape(
    Object.assign(
      {},
      {
        fullName: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(5, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .max(50, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
          .fullNameSegments(({ path }: { path: string }) => validationMessage.fullNameSegments(FieldTitle[path]))
          .fullNameSegmentMin(({ path }) => validationMessage.fullNameSegmentMin(FieldTitle[path]))
          .matches(LETTERS_ONLY, ({ path }) => validationMessage.letterOnly(FieldTitle[path])),
        phone: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(10, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .max(10, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
          .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(FieldTitle[path]))
      },
      mode !== 'pickup' && {
        address: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(5, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .max(50, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max)),
        districtId: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path])),
        provinceId: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path])),
        wardId: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path]))
      }
    )
  );
interface AddressFormModalProps {
  mode: 'new' | 'edit' | 'pickup';
  id?: number;
  initialAddress: any;
  submitButtonText: string;
  isOpen: boolean;
  classes?: { container?: string; form?: string; regionSelectorModalContainer?: string };
  onSubmit: (data: any) => any;
  onRequestClose: ({ mode }: { mode: string }) => any;
}
const AddressFormModal = ({
  isOpen,
  mode,
  id,
  initialAddress,
  submitButtonText,
  classes,
  onSubmit,
  onRequestClose
}: AddressFormModalProps) => {
  let entries = [
    {
      name: 'fullName',
      title: 'Tên người nhận',
      placeholder: 'Nhập họ và tên người nhận',
      required: true,
      type: 'text',
      autoFocus: true,
      focus: true,
      select: true,
      dataTestId: 'name-receiver-checkout',
      dataTestErrorId: 'error-name-receiver-checkout'
    },
    {
      name: 'phone',
      title: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại người nhận',
      required: true,
      inputMode: 'numeric',
      type: 'tel',
      dataTestId: 'phone-receiver-checkout',
      dataTestErrorId: 'error-phone-receiver-checkout'
    },
    {
      name: 'provinceId',
      title: 'Tỉnh / Thành phố',
      placeholder: 'Chọn Tỉnh / Thành phố',
      readOnly: true,
      required: true,
      type: 'text',
      onClick: () => setRegionSelectionModalVisibility(true),
      dataTestId: 'city-receiver-checkout',
      dataTestErrorId: 'error-city-receiver-checkout'
    },
    {
      name: 'districtId',
      title: 'Quận / Huyện',
      placeholder: 'Chọn Quận / Huyện',
      readOnly: true,
      required: true,
      type: 'text',
      onClick: () => setRegionSelectionModalVisibility(true),
      dataTestId: 'district-receiver-checkout',
      dataTestErrorId: 'error-district-receiver-checkout'
    },
    {
      name: 'wardId',
      title: 'Phường / Xã',
      placeholder: 'Chọn Phường / Xã',
      readOnly: true,
      required: true,
      type: 'text',
      onClick: () => setRegionSelectionModalVisibility(true),
      dataTestId: 'ward-receiver-checkout',
      dataTestErrorId: 'error-ward-receiver-checkout'
    },
    {
      name: 'address',
      title: 'Địa chỉ nhận hàng',
      placeholder: 'Nhập số nhà và tên đường...',
      required: true,
      type: 'text',
      dataTestId: 'address-receiver-checkout',
      dataTestErrorId: 'error-address-receiver-checkout'
    }
  ];
  const { register, reset, setValue, formState, trigger, handleSubmit } = useForm({
    defaultValues: {},
    mode: 'onTouched',
    resolver: yupResolver(getFormSchema({ mode })),
    shouldUnregister: false
  });
  const { errors } = formState;
  if (mode === 'pickup') {
    const pickupFormFieldIds = ['fullName', 'phone'];
    entries = entries.filter((entry) => pickupFormFieldIds.includes(entry.name));
  }
  const [regionSelectionModalVisibility, setRegionSelectionModalVisibility] = useState(false);
  const [dataAttr, setDataAttr] = useState({ provinceId: null, districtId: null, wardId: null });
  const updateDataAttr = (dataAttrUpdate) => setDataAttr(Object.assign({}, dataAttr, dataAttrUpdate));

  useEffect(() => {
    !regionSelectionModalVisibility && reset();
  }, [isOpen]);
  useEffect(() => {
    switch (mode) {
      case 'edit':
        setValue('fullName' as never, initialAddress.full_name);
        setValue('address' as never, initialAddress.address);
        setValue('phone' as never, initialAddress.phone);
        setValue('provinceId' as never, initialAddress.province_name);
        setValue('districtId' as never, initialAddress.district_name);
        setValue('wardId' as never, initialAddress.ward_name);
        updateDataAttr({
          provinceId: initialAddress.province_id,
          districtId: initialAddress.district_id,
          wardId: initialAddress.ward_id
        });
        break;
      case 'pickup':
      default:
        reset();
    }
  }, [mode, isOpen]);

  const processSubmit = (fields) => {
    const { fullName, phone, address } = fields;
    onSubmit({
      mode,
      data: Object.assign(
        {},
        { firstName: getFirstName(fullName), lastName: getLastName(fullName), phone, address_id: initialAddress?.id },
        mode !== 'pickup' && { address, ...dataAttr },
        id && { id }
      )
    });
  };

  return (
    <>
      <GeneralModal
        isOpen={regionSelectionModalVisibility ? !regionSelectionModalVisibility : isOpen}
        title={mode === 'pickup' ? 'Thông tin nhận hàng' : 'Địa chỉ nhận hàng'}
        leftTitle=""
        fullHeight={true}
        leftIcon="angle-left"
        rightIcon={'close'}
        className={classNames(style.addressFormModal, classes && classes.container)}
        testId={{ name: 'address-form-modal' }}
        onLeftActionClick={() => onRequestClose({ mode })}
        onRightActionClick={() => onRequestClose({ mode })}
        onRequestClose={() => onRequestClose({ mode })}
      >
        <form className={classNames(classes?.form)} onSubmit={handleSubmit(processSubmit)}>
          <div className={style.body}>
            {entries.map((entry) => (
              <FormEntry
                {...{
                  key: entry.name,
                  classes: { container: style.entry },
                  error: errors[entry.name],
                  ref: register,
                  ...entry
                }}
              />
            ))}
          </div>
          <StickyActionButton
            action={{ text: submitButtonText }}
            buttonClass={style.primaryButton}
            onClick={handleSubmit(processSubmit)}
            dataTestId="btn-submit-info-receiver-checkout"
            dataTestErrorId="error-btn-submit-info-receiver-checkout"
          />
          <input type="submit" className={style.noDisplay} />
        </form>
      </GeneralModal>
      <RegionSelectorModal
        isOpen={regionSelectionModalVisibility}
        classes={{ container: classNames(classes && classes.regionSelectorModalContainer) }}
        onSubmit={({ provinceId, provinceName, districtId, districtName, wardId, wardName }) => {
          updateDataAttr({ provinceId, districtId, wardId });
          setValue('provinceId' as never, provinceName);
          setValue('districtId' as never, districtName);
          setValue('wardId' as never, wardName);
          setRegionSelectionModalVisibility(false);
          trigger(['provinceId', 'districtId', 'wardId'] as any);
        }}
        onRequestClose={() => {
          setRegionSelectionModalVisibility(false);
        }}
      />
    </>
  );
};
AddressFormModal.defaultProps = {
  submitButtonText: 'Lưu địa chỉ'
};

export default AddressFormModal;
