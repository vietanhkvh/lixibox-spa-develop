import Modal from '../../../../presentation-component/modal/general-modal';

import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import FaqNavigation from '../../../../presentation-component/faq/navigation';
import NotFound from '../../../../presentation-component/faq/not-found';

import Loading from '../../../../components/ui/loading';

import { ROUTING_PRODUCT_MANUAL, ROUTING_ARTICLE_DETAIL_PATH } from '../../../../routings/path';

function render() {
  const { isOpenTopicModal } = this.state;
  const {
    match,
    faqStore: { topicList, articlesList, isFetchArticlesList },
    appStore: { mobileappWebviewStatus }
  } = this.props;
  const topicSlug = !!match && !!match.params ? match.params.topicSlug : '';
  const filteredTopicList = Array.isArray(topicList) && topicList.find((item) => item.slug === topicSlug);
  const headingTitle = !!filteredTopicList ? filteredTopicList.name : '';

  const modalProps = {
    isOpen: isOpenTopicModal,
    title: 'Chọn chủ đề',
    isShowHeading: true,
    fullHeight: false,
    onRightActionClick: () => this.handleOpenTopicModal(false),
    onRequestClose: () => this.handleOpenTopicModal(false)
  };

  const faqNavigationProps = {
    list: articlesList,
    urlPath: ROUTING_ARTICLE_DETAIL_PATH,
    isWithoutBorder: true,
    isWithNumberOrdering: true,
    onClick: () => this.handleOpenTopicModal(false)
  };

  const faqNavigationModalProps = {
    list: topicList,
    urlPath: ROUTING_PRODUCT_MANUAL,
    isWithoutBorder: true,
    onClick: () => this.handleOpenTopicModal(false)
  };

  return (
    <div>
      {!mobileappWebviewStatus && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader
            subTitle={''}
            title={headingTitle}
            isShowIcon={true}
            onClick={() => this.handleOpenTopicModal(true)}
          />
        </MobileAutoDisplayHeader>
      )}
      <div>
        {!!isFetchArticlesList ? (
          <Loading />
        ) : !!articlesList.length ? (
          <FaqNavigation {...faqNavigationProps} />
        ) : (
          <NotFound />
        )}
      </div>
      <Modal {...modalProps}>
        <FaqNavigation {...faqNavigationModalProps} />
      </Modal>
    </div>
  );
}

export default render;
