import TrackVisibility from 'lixibox-react-on-screen';

import WrapLayout from '../../../layout/wrap';
import Loading from '../../../../components/ui/loading';
import VideoItem from '../../../../components/magazine/video-item';
import ProductSlider from '../../../../components/product/slider';
import BlogVideoDetail from '../../../../components/magazine/blog-video-detail';
import { getDeviceVersion } from '../../../../utils/responsive';

import { IProps, IState } from './model';
import STYLE from './style';

const renderMainContainer = ({ mainVideo }) => <BlogVideoDetail mainVideo={mainVideo} />;

const renderViewMoreBtn = ({ isLoading, handleViewMore }) => {
  if (!!isLoading) return <Loading />;

  return (
    <div style={STYLE.container.btnViewMore.container}>
      <div style={STYLE.container.btnViewMore.btn} onClick={handleViewMore}>
        Xem thêm
      </div>
    </div>
  );
};

const handleRenderVideoItem = (item) => {
  const videoProps = {
    item,
    column: 1
  };

  return (
    <div key={`video-item-${item.id}`} style={STYLE.container.videoWrap.video}>
      <VideoItem {...videoProps} />
    </div>
  );
};

const renderVideoRelated = ({ videoList, isFullyLoading, isLoading, handleViewMore }) => {
  const mobileHeader = () => <div style={STYLE.container.mobileHeader}>Video liên quan</div>;

  const desktopHeader = () => (
    <div style={STYLE.container.title.container}>
      Video liên quan
      <span style={STYLE.container.title.borderLine}></span>
      <span style={STYLE.container.title.line}></span>
    </div>
  );

  const switchHeader = {
    MOBILE: () => mobileHeader(),
    DESKTOP: () => desktopHeader()
  };

  return (
    <div style={STYLE.container.videoRelatedGroup}>
      {switchHeader[getDeviceVersion()]()}
      <div style={STYLE.container.videoWrap.container}>
        {Array.isArray(videoList) && videoList.map(handleRenderVideoItem)}
      </div>
      {!isFullyLoading && renderViewMoreBtn({ isLoading, handleViewMore })}
    </div>
  );
};

const renderProductRelated = ({ productList }) => {
  const productProps = {
    column: 5,
    isShowLike: false,
    isShowHeader: false,
    isShowViewMore: false,
    isCustomTitle: true,
    isShowQuickView: false,
    data: productList,
    title: 'Sản phẩm trong bài viết'
  };

  return productList && 0 !== productList.length ? (
    <div style={STYLE.productSlide}>
      <ProductSlider {...productProps} />
    </div>
  ) : null;
};

const renderView = ({ props, state, handleFetchVideo, handleViewMore }) => {
  const {
    content,
    magazineStore: { videoList }
  } = props as IProps;

  const { isFullyLoading, isLoading, isFetchVideo } = state as IState;

  return (
    <div style={STYLE.desktop} className={'user-select-all'}>
      <WrapLayout style={STYLE.container.wrap}>
        {renderMainContainer({ mainVideo: content })}
        {renderProductRelated({
          productList: (content && content.related_boxes) || []
        })}
        {
          <TrackVisibility offset={200}>
            {({ isVisible }) => {
              !!isVisible && !isFetchVideo && handleFetchVideo();

              return renderVideoRelated({
                videoList,
                isFullyLoading,
                isLoading,
                handleViewMore
              });
            }}
          </TrackVisibility>
        }
      </WrapLayout>
    </div>
  );
};

export default renderView;
