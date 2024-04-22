import FaqHeading from '../../../../presentation-component/faq/heading';
import FaqNavigation from '../../../../presentation-component/faq/navigation';
import NotFound from '../../../../presentation-component/faq/not-found';
import ArticleDetail from '../../../../presentation-component/faq/article-detail';

import Loading from '../../../../components/ui/loading';

import { ROUTING_ARTICLE_DETAIL_PATH } from '../../../../routings/path';

function render() {
  const {
    faqStore: { articlesList, isFetchArticlesDetail, articlesDetail }
  } = this.props;

  const relatedArticleList = articlesList?.filter((item) => item.slug !== articlesDetail?.slug) || [];

  const relatedArticlesProps = {
    list: relatedArticleList,
    isBoldTitle: true,
    urlPath: ROUTING_ARTICLE_DETAIL_PATH,
    isWithNumberOrdering: true
  };

  return (
    <div>
      <FaqHeading title={''} description={articlesDetail.name} />
      {!!isFetchArticlesDetail ? (
        <Loading />
      ) : !!articlesDetail && !!articlesDetail.content ? (
        <>
          <ArticleDetail title={articlesDetail.name} content={articlesDetail.content} />
          {!!relatedArticleList?.length && (
            <>
              <FaqHeading title={''} description={'Thông tin liên quan'} />
              <div style={{ padding: '0 20px 20px 20px' }}>
                <FaqNavigation {...relatedArticlesProps} />
              </div>
            </>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default render;
