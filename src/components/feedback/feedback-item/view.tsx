import { NavLink } from 'react-router-dom';

import RatingStar from '../../ui/rating-star';
import ButtonSubmit from '../../ui/submit-button';
import { FORM_TYPE } from '../../../constants/application/form';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';
import { MODAL_ADD_EDIT_REVIEW_RATING } from '../../../constants/application/modal';

import { IProps, IState } from './model';
import * as VARIABLE from '../../../style/variable';
import STYLE from './style';

const contentGroupStyle = STYLE.contentGroup.rateGroup.header;

export function renderComponent({ props, state, handleAddToCart }) {
  const { item, openModalAction, handleSubmitForm, type } = props as IProps;

  const { isLoadingAddToCard } = state as IState;

  const productLink = `${ROUTING_PRODUCT_DETAIL_PATH}/${(item && item.slug) || ''}`;

  const itemProps = {
    to: productLink,
    key: (item && item.id) || 1
  };

  const imageProps = {
    style: Object.assign({}, STYLE.contentGroup.imgGroup.img, {
      backgroundImage: `url(${(item && item.img_url) || ''})`
    })
  };

  const dataProps = { handleSubmitForm, type, item };

  return (
    <div className={'user-feedback-item'} style={STYLE.contentGroup.inner}>
      <div style={STYLE.contentGroup.imgGroup}>
        <NavLink {...itemProps}>
          <div {...imageProps}></div>
        </NavLink>
        <ButtonSubmit
          loading={isLoadingAddToCard}
          color={'white'}
          icon={'cart-line'}
          styleIcon={{ color: VARIABLE.colorPink, marginRight: 0 }}
          onSubmit={handleAddToCart}
          style={Object.assign({}, STYLE.contentGroup.imgGroup.btn)}
        />
      </div>
      <div style={STYLE.contentGroup.rateGroup}>
        <div style={contentGroupStyle}>
          <NavLink to={productLink} style={contentGroupStyle.title}>
            <span style={contentGroupStyle.title.nameProduct}>{(item && item.name) || ''}</span>
          </NavLink>
          <RatingStar style={contentGroupStyle.rate} value={item.rate || 0} />
        </div>
        <ButtonSubmit
          title={FORM_TYPE.EDIT === type ? 'CHỈNH SỬA' : 'ĐÁNH GIÁ NGAY'}
          color={'borderGrey'}
          onSubmit={() =>
            openModalAction(
              MODAL_ADD_EDIT_REVIEW_RATING({
                title: FORM_TYPE.EDIT === type ? 'CHỈNH SỬA ĐÁNH GIÁ' : 'ĐÁNH GIÁ MỚI',
                isShowDesktopTitle: true,
                data: dataProps
              })
            )
          }
          style={Object.assign({}, STYLE.contentGroup.rateGroup.btn)}
        />
      </div>
    </div>
  );
}
