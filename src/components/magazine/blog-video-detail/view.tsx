import LoadingPlaceholder from '../../ui/loading-placeholder';
import { isMobileVersion } from '../../../utils/responsive';
import { isEmptyObject } from '../../../utils/validate';
import { renderHtmlContent } from '../../../utils/html';
import { createBreakDownLine } from '../../../utils/format';

import { IProps } from './model';
import STYLE from './style';

export const renderLoadingPlaceholder = () => (
  <div>
    <LoadingPlaceholder
      style={Object.assign({}, STYLE.placeholder.mainImg, isMobileVersion() && STYLE.placeholder.mainImgMobile)}
    />
    <div style={STYLE.placeholder.iconGroup}>
      <LoadingPlaceholder style={STYLE.placeholder.iconGroup.dateGroup} />
      <LoadingPlaceholder style={STYLE.placeholder.iconGroup.socialGroup} />
    </div>
    <LoadingPlaceholder style={STYLE.placeholder.title} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '80%' })} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '60%' })} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '40%' })} />
  </div>
);

const renderContent = ({ title, description, content }) => {
  const videoProps = {
    style: STYLE.videoContainer.video,
    src: content,
    frameBorder: '0',
    allowFullScreen: true
  };

  return (
    <div style={STYLE.headerWrap}>
      <div style={STYLE.videoContainer.container}>
        <iframe title="Video" {...videoProps}></iframe>
      </div>
      <div style={STYLE.headerWrap.blogTitle}>{title}</div>
      {renderHtmlContent({
        content: createBreakDownLine(description),
        style: STYLE.headerWrap.desc
      })}
    </div>
  );
};

const renderView = (props: IProps) => {
  const { mainVideo } = props as IProps;

  return isEmptyObject(mainVideo) ? (
    renderLoadingPlaceholder()
  ) : (
    <div className={'magazine-blog-detail'}>
      {renderContent({
        title: (mainVideo && mainVideo.title) || '',
        content: (mainVideo && mainVideo.content) || '',
        description: (mainVideo && mainVideo.description) || ''
      })}
    </div>
  );
};

export default renderView;
