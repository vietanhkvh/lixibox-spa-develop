import ButtonSubmit from '../../ui/submit-button';
import { FORM_TYPE } from '../../../constants/application/form';
import RatingStar from '../../ui/rating-star';

import { IProps, IState } from './model';
import STYLE from './style';

export function renderComponent() {
  const { data, style } = this.props as IProps;

  const { submitLoading, rate, textareaValue = '' } = this.state as IState;

  const btnTitle = data.type === FORM_TYPE.CREATE ? 'Đánh giá' : 'Chỉnh sửa';

  const buttonSubmitProps = {
    title: btnTitle,
    loading: submitLoading,
    disabled: !(rate !== 0 && textareaValue.length > 7),
    onSubmit: this.handleSubmit.bind(this),
    style: STYLE.contentGroup.rateGroup.btn
  };

  const imageProps = {
    style: Object.assign({}, STYLE.contentGroup.imgGroup.img, { backgroundImage: `url(${data.item.img_url})` })
  };

  const ratingStarProps = {
    style: STYLE.contentGroup.rateGroup.header.rate,
    value: rate || 0,
    onChange: (value) => this.handleClickOnChange(value),
    view: data.type === FORM_TYPE.EDIT
  };

  const textareaProps = {
    style: STYLE.contentGroup.rateGroup.textarea,
    onChange: (event) => this.handleTextareaOnChange(event),
    defaultValue: data.item.review
  };

  return (
    <div className={'delivery-address'} style={Object.assign({}, STYLE.container, style)}>
      <div style={STYLE.contentGroup}>
        <div style={STYLE.contentGroup.imgGroup}>
          <div {...imageProps}></div>
        </div>
        <div style={STYLE.contentGroup.rateGroup}>
          <div style={STYLE.contentGroup.rateGroup.header}>
            <div style={STYLE.contentGroup.rateGroup.header.title}>{data.item.name}</div>
            <RatingStar {...ratingStarProps} />
          </div>
        </div>
      </div>
      <div>
        <textarea {...textareaProps}></textarea>
        <ButtonSubmit {...buttonSubmitProps} />
      </div>
    </div>
  );
}
