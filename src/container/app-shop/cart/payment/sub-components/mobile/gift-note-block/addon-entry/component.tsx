import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../../../../../../presentation-component/ui/icon';
import { formatCurrency } from '../../../../../../../../utils/currency';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

export const ACTION_TYPE = Object.freeze({
  SELECTED: 'SELECTED',
  UNSELECTED: 'UNSELECTED',
  OPTION_SELECTED: 'OPTION_SELECTED',
  NOTE_UPDATED: 'NOTE_UPDATED'
});

interface AccompanyServiceOption {
  id: number;
  name: string;
  image_url: string;
  fee: number;
}
interface AccompanyService {
  id: number;
  name: string;
  description: string;
  fee: number;
  required_note: boolean;
  options?: Array<AccompanyServiceOption>;
}
interface LocalSelection {
  serviceId: number;
  optionId: number;
  selected: boolean;
  fee: number;
  note: string;
  isValid: boolean;
}
interface AccompanyServiceEntryProps {
  service: AccompanyService;
  selection: LocalSelection;
  messageWordLimit: number;
  onAction: any; // (data: { type: string; selection: LocalSelection }) => (data: { type: string; selection: LocalSelection })
}
const AddonEntry = ({ service, selection, messageWordLimit, onAction }: AccompanyServiceEntryProps) => {
  const selected = !!selection && selection.selected;
  const hasSelectedOption = !!selection && (typeof selection.optionId === 'number' ? selection.optionId : false);
  const selectedOptionId = hasSelectedOption ? (selection as any).optionId : 0;
  const currentNote = selection ? selection.note || '' : '';
  const getAddonPrice = () => {
    if (selected && hasSelectedOption) {
      const option =
        service.options && service.options.find((option) => option.id === (selection && selection.optionId));
      return option && option.fee;
    }
    return service.fee;
  };

  const isValidNote = (note) => note.trim().split(/\s+/).length <= messageWordLimit;
  const preprocessNote = (note) => (note.trim().split(/\s+/).length === 75 ? note.trim() : note);
  const options = service.options && Array.isArray(service.options) ? service.options : [];
  const isOptionSelected = (optionId) => selected && optionId === selectedOptionId;
  const optionPricesAreSameAsServicePrice =
    !!options.length &&
    options.filter((option) => option.fee === options[0].fee).length === options.length &&
    options[0].fee === service.fee;
  const isFree = (price) => !(typeof price === 'number' && price > 0);
  const formatPrice = (price, prefixSign = true) =>
    typeof price === 'number' && price > 0
      ? `${prefixSign ? `+` : ''}${formatCurrency(price, { suffix: true })}`
      : `Miễn phí`;
  const showError = selection && !selection.isValid && selected;

  return (
    <div className={style.accompanyService} {...generateTestId({ name: 'gift-note-addon-entry' })}>
      <div
        className={style.header}
        onClick={() =>
          selection &&
          onAction({
            type: selected ? ACTION_TYPE.UNSELECTED : ACTION_TYPE.SELECTED,
            selection: Object.assign({}, selection, { selected: !selected })
          })
        }
      >
        <div className={style.status}>
          <SvgIcon name={selected ? 'checkbox-checked' : 'checkbox-empty'} className={style.icon} />
        </div>
        <div className={style.content}>
          <div className={style.title}>
            {service.name}
            <span className={isFree(getAddonPrice()) ? style.typeFree : style.typePremium}>
              {formatPrice(getAddonPrice())}
            </span>
          </div>
          <div className={style.hint}>{service.description}</div>
        </div>
      </div>
      {!!options.length && (
        <div className={style.options}>
          {options.map(({ id, image_url, name, fee }) => (
            <div
              key={id}
              className={style.option}
              onClick={() =>
                selection &&
                onAction({
                  type: ACTION_TYPE.OPTION_SELECTED,
                  selection: Object.assign({}, selection, { optionId: id })
                })
              }
            >
              <div className={classNames(style.thumbnail, isOptionSelected(id) && style.thumbnailSelected)}>
                <Image alt={name} className={style.content} src={image_url} />
              </div>
              <div className={classNames(style.title, isOptionSelected(id) && style.titleSelected)}>{name}</div>
              {optionPricesAreSameAsServicePrice || (
                <div className={classNames(style.title, style.price, isOptionSelected(id) && style.titleSelected)}>
                  {formatPrice(fee, false)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {service.required_note && (
        <div className={style.note}>
          <textarea
            value={selected ? currentNote : ''}
            className={classNames(style.entry, showError ? style.entryError : style.entryNoErrorMessage)}
            rows={3}
            onChange={(e) =>
              selection &&
              e.target.value !== currentNote &&
              isValidNote(e.target.value) &&
              onAction({
                type: ACTION_TYPE.NOTE_UPDATED,
                selection: Object.assign({}, selection, {
                  note: preprocessNote(e.target.value),
                  isValid: !!e.target.value
                })
              })
            }
            placeholder={`Nhập nội dung, tối đa ${messageWordLimit} từ...`}
          />
          {showError && <div className={style.errorMessage}>Vui lòng nhập nội dung</div>}
        </div>
      )}
    </div>
  );
};

export default AddonEntry;
