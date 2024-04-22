import WrapLayout from '../../layout/wrap';
import MainBlock from '../../layout/main-block';
import STYLE from './style';
import styles from './style.module.scss';

function renderView() {
  const { isAutoRedirect, isIframeLoading } = this.state;

  const formUrl = this.generateFormUrl();

  const frameProps = {
    style: STYLE.frame,
    id: 'support-iframe',
    src: formUrl,
    allowFullScreen: false
  };

  const mainBlockProps = {
    showHeader: true,
    title: 'Gửi yêu cầu hỗ trợ',
    showViewMore: false,
    isIframeLoading,
    content: (
      <iframe
        className={isIframeLoading && styles.displayNone}
        title="Support center"
        {...frameProps}
        onLoad={() => {
          this.handleSetIframeLoaded();
        }}
      />
    ),
    style: STYLE.mainBlock
  };

  if (!!isAutoRedirect) return null;

  return (
    <WrapLayout style={STYLE.container}>
      <MainBlock {...mainBlockProps} />
    </WrapLayout>
  );
}

export default renderView;
