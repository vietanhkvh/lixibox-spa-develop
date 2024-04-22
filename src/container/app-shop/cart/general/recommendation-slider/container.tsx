import { useState } from 'react';

import ItemCarousel from '../../../../../presentation-component/item-list-hoc/item-carousel';
import RecommendationItemWithAction from '../product/recommendation-item-with-action';
import GeneralModal from '../../../../../presentation-component/modal/general-modal';
import RecommendationFeedback from '../recommendation-feedback';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import style from './style.module.scss';
import { ProductBox } from 'types/api/shop';

interface IProps {
  recommendationStore: any;
  reportStore: any;
  feedbackReportsFeaturesAction: any;
  onItemClick?: (box: ProductBox, index: number) => void;
}

const RecommendationSlider = ({
  recommendationStore: { cartRecommendationList },
  reportStore: { featureInfo },
  feedbackReportsFeaturesAction,
  onItemClick
}: IProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  if (!cartRecommendationList || !cartRecommendationList.length) return null;

  const onSubmitRecommendationFeedback = (ids) => {
    setSelectedIds(ids);
  };

  const onCloseRecommendationFeedback = () => {
    setOpenModal(false);

    const removedIds = selectedIds;
    const outputIds = cartRecommendationList.map((item) => item.id);
    let persitCartList = [];
    try {
      const persitCartListStorage = localStorage.getItem('PERSIST_CART_AT_FRIST_LOAD');
      persitCartList = JSON.parse(persitCartListStorage);
    } catch (e) {
      console.error(e);
    }

    const inputIds = persitCartList.filter((cartItemId) => !outputIds.includes(cartItemId));

    setSelectedIds([]);

    removedIds &&
      removedIds.length &&
      feedbackReportsFeaturesAction({ code: 'cart_recommendation', inputIds, outputIds, removedIds });
  };

  const openRecommendationFeedback = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ItemCarousel
        id={'RecommendationSlider'}
        className={style.addonSlider}
        title={'Thường được mua cùng'}
        titleIcon={<SvgIcon name={'info'} className={style.infoIcon} onClick={openRecommendationFeedback} />}
        testId={{ name: 'recommendation-slider' }}
      >
        {cartRecommendationList.map((product, index) => (
          <RecommendationItemWithAction
            key={product.id}
            product={product}
            className={style.addonItemWithAction}
            onClickProductItem={() => onItemClick?.(product, index)}
          />
        ))}
      </ItemCarousel>
      <GeneralModal
        isOpen={isOpenModal}
        title={featureInfo.title || 'Thường được mua cùng là gì?'}
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        classes={{}}
        className={{}}
        testId={{}}
        onRightActionClick={onCloseRecommendationFeedback}
        onRequestClose={onCloseRecommendationFeedback}
      >
        <RecommendationFeedback
          featureInfo={featureInfo}
          products={cartRecommendationList}
          onSubmit={onSubmitRecommendationFeedback}
          onItemClick={onItemClick}
        />
      </GeneralModal>
    </>
  );
};

export default RecommendationSlider;
