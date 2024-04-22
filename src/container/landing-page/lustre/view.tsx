import WrapLayout from '../../layout/wrap';

import Image from 'presentation-component/ui/image';
import ProductDetail from '../../../components/product/detail-item';
import ProductSlider from '../../../components/product/slider';

import STYLE from './style';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

const insta = CDN_ASSETS_PREFIX('/halio-landing-page/insta.png');

const bannerImage = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/banner-lustre.jpg');
const image01 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/image01.jpg');
const image02 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/image02.jpg');
const image03 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/image03.jpg');

const renderBanner = () => <Image alt={''} style={STYLE.bannerImage} src={bannerImage} />;

const renderHotdeal = ({ props }) => {
  const {
    shopStore: { dataHomePage }
  } = props;

  const hotDealProps = {
    column: 5,
    title: 'Hot Deal',
    showViewMore: false,
    style: STYLE.hotDeal,
    data: (dataHomePage.latest_individual_boxes && dataHomePage.latest_individual_boxes.items) || []
  };
  return (
    <WrapLayout>
      <ProductSlider {...hotDealProps} />
    </WrapLayout>
  );
};

const renderSlideImage = () => {
  const imageList = [image02, image03];

  return (
    <WrapLayout>
      <div style={STYLE.sliderImage.container}>
        {Array.isArray(imageList) &&
          !!imageList.length &&
          imageList.map((item) => {
            const imageProps = {
              style: Object.assign({}, STYLE.sliderImage.image, {
                backgroundImage: `url(${item})`
              })
            };

            return <div {...imageProps}></div>;
          })}
      </div>
    </WrapLayout>
  );
};

const renderHeader = ({ name, handleChooseProductType }) => {
  return (
    <div style={STYLE.productContent.title}>
      <div style={STYLE.productContent.title.leftIcon} onClick={() => handleChooseProductType(false)}></div>
      <div style={STYLE.productContent.title.name}>{name}</div>
      <div style={STYLE.productContent.title.rightIcon} onClick={() => handleChooseProductType(true)}></div>
    </div>
  );
};

const renderProduct = (item, index) => {
  const productItemProps = {
    data: item
  };
  return (
    <div style={STYLE.productContent.productWrap.product}>
      <ProductDetail {...productItemProps} />
    </div>
  );
};

const renderProductList = ({ list }) => {
  return (
    <div style={STYLE.productContent.productWrap.container}>
      {Array.isArray(list) && !!list.length && list.slice(0, 9).map(renderProduct)}
    </div>
  );
};

const renderImageLeft = () => (
  <div style={STYLE.productContent.leftContainer.container}>
    <div style={STYLE.productContent.leftContainer.image(image01)}></div>
  </div>
);

const renderProductContent = ({ props, state, handleChooseProductType }) => {
  const {
    shopStore: { dataHomePage },
    productTypeList
  } = props;
  const { positionProductType } = state;
  const list = (dataHomePage.latest_individual_boxes && dataHomePage.latest_individual_boxes.items) || [];

  return (
    <WrapLayout>
      <div style={STYLE.productContent.container}>
        {renderImageLeft()}
        <div style={STYLE.productContent.rightContainer}>
          {renderHeader({
            name: productTypeList[positionProductType].name,
            handleChooseProductType
          })}
          {renderProductList({ list })}
        </div>
      </div>
    </WrapLayout>
  );
};

const renderContent = () => {
  return (
    <WrapLayout>
      <div style={STYLE.content}>
        <div style={STYLE.content.title}>GIỚI THIỆU VỀ LUSTRE</div>
        <div style={STYLE.content.desc}>
          LUSTRE là hãng mỹ phẩm chuyên các dòng trang điểm chuyên nghiệp, mang tính ứng dụng cao với chất lượng sánh
          ngang các thương hiệu cao cấp như Too Faced, Marc Jacobs, Lorac… Chất lượng tốt, thiết kế sang trọng và giá
          thành hợp lý là các điểm cộng tuyệt vời khiến cho Lixibox quyết định giới thiệu em ý đến các cô nàng xinh đẹp
          của mình.
        </div>
      </div>
    </WrapLayout>
  );
};

const renderInstagram = ({ list }) => {
  return (
    <div style={STYLE.instagram.container}>
      <WrapLayout>
        <div style={STYLE.instagram.heading}>
          <div style={STYLE.instagram.heading.title}>
            Tìm kiếm về
            <span style={STYLE.instagram.heading.boldTitle}>#LUSTRE</span>
          </div>
          <Image alt={''} src={insta} style={STYLE.instagram.heading.icon} />
        </div>

        <div style={STYLE.instagram.list.container}>
          {list.map((item, index) => (
            <a
              key={`link-${index}`}
              style={STYLE.instagram.list.link}
              href={item.link}
              target={'_blank'}
              rel="noreferrer"
            >
              <div style={Object.assign({}, STYLE.instagram.list.img, { backgroundImage: `url(${item.img})` })}></div>
            </a>
          ))}
        </div>
      </WrapLayout>
    </div>
  );
};

const renderWatchedList = ({ props }) => {
  const {
    userStore: { userWatchedList }
  } = props;

  const hotDealProps = {
    column: 5,
    title: 'Sản phẩm đã xem',
    showViewMore: false,
    style: STYLE.hotDeal,
    data: userWatchedList || []
  };

  return userWatchedList && !!userWatchedList.length ? (
    <WrapLayout>
      <ProductSlider {...hotDealProps} />
    </WrapLayout>
  ) : null;
};

const renderView = ({ props, state, handleChooseProductType }) => {
  return (
    <div style={STYLE}>
      {renderBanner()}
      {renderHotdeal({ props })}
      {renderSlideImage()}
      {renderProductContent({ props, state, handleChooseProductType })}
      {renderContent()}
      {renderWatchedList({ props })}
      {renderInstagram({ list: props.instagram || [] })}
    </div>
  );
};

export default renderView;
