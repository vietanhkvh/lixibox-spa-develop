import { Fragment } from 'react';
import Image from 'presentation-component/ui/image';
import { isMobileVersion } from '../../../utils/responsive';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import ItemCarousel from '../../../presentation-component/item-list-hoc/item-carousel';
import ProductSlider from '../../../presentation-component/general/desktop/product-slider';
import ItemWithAction from '../cart/general/item-with-action';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { ViewedSource } from 'tracking/constants';
import STYLE from './style';
import styles from './style.module.scss';

const CombinedProductSlider = ({
  isShowVariants = true,
  dataList,
  trackingSource,
  trackingSourceId,
  ...props
}: any) => {
  const dataProps = dataList.map((product) => ({
    key: product.id,
    product,
    isShowVariants,
    action: { title: 'Thêm vào giỏ', icon: 'plus' },
    purchaseType: PURCHASE_TYPE.NORMAL,
    isShowPricing: true,
    isShowRating: true,
    shouldDisplayCartSummary: true,
    trackingSource,
    trackingSourceId
  }));

  return <ProductSlider data={dataProps} template={ItemWithAction} column={5} {...props} />;
};

const SectionItem = ({ section, color: _color, onSectionItemClick, idSpecial }) => {
  if (!section || !section.boxes || !section.boxes.length) return;

  const containerProps = {
    style: STYLE.section.container
  };

  const banner = section.banner_url;
  const name = section.name;
  const color = section.color ? '#' + section.color : _color;

  const imgProps = {
    style: STYLE.section.img,
    src: banner,
    alt: ''
  };

  const listProps = {
    style: STYLE.section.list
  };

  const overlayProps = {
    style: STYLE.section.overlay(color)
  };

  const nameProps = {
    style: STYLE.section.name(color)
  };

  return (
    <Fragment>
      <div {...containerProps}>
        {!!banner && <Image {...imgProps} />}
        <div {...listProps}>
          <div {...overlayProps}></div>
          {!!name && !!name.length && <div {...nameProps}>{name}</div>}
          {isMobileVersion() ? (
            <ItemCarousel
              id={section?.id}
              title={section?.id}
              isSection={true}
              classes={{
                container: styles.sectionCarouselContainerMobile,
                list: styles.sectionCarouselListMobile,
                child: styles.sectionCarouselChildMobile
              }}
            >
              {section.boxes.map((product, index) => (
                <ItemWithAction
                  className={styles.sectionItemMobile}
                  key={product.id || index}
                  product={product}
                  isFullPadding
                  isShowVariants
                  action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                  purchaseType={PURCHASE_TYPE.NORMAL}
                  isShowPricing
                  isShowRating
                  shouldDisplayCartSummary
                  onClickProductItem={() => {
                    onSectionItemClick?.(product, index, section);
                  }}
                  trackingSource={ViewedSource.THEME_SECTION}
                  trackingSourceId={idSpecial}
                />
              ))}
            </ItemCarousel>
          ) : (
            <CombinedProductSlider
              dataList={section.boxes}
              trackingSource={ViewedSource.THEME_SECTION}
              trackingSourceId={idSpecial}
              onItemClick={(box, index) => {
                onSectionItemClick(box, index, section);
              }}
              classes={{
                container: styles.sectionSliderContainer,
                slider: styles.sectionSlider,
                sliderItem: styles.sectionSliderItem
              }}
            />
          )}
        </div>
      </div>
      {!!isMobileVersion() && <SeparateLine />}
    </Fragment>
  );
};

function renderSection({ sections, color, onSectionItemClick, idSpecial }) {
  return (
    <>
      {Array.isArray(sections) &&
        sections.map((section, index) => (
          <SectionItem
            key={section.key || index}
            section={section}
            color={color}
            onSectionItemClick={onSectionItemClick}
            idSpecial={idSpecial}
          />
        ))}
    </>
  );
}

export default renderSection;
