import { useRef } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { generateHighlightedFragment } from 'utils/highlight';
import KeywordRows from 'presentation-component/search/keyword-rows';
import KeywordPills from 'presentation-component/search/keyword-pills';
import PromotionBlock from 'presentation-component/search/promotion-block';
import BrandPills from 'presentation-component/search/brand-pills';
import ProductPreviews from 'presentation-component/search/product-previews';
import { SearchSource } from 'constants/application/search';
import { ROUTING_PRODUCT_CATEGORY } from 'routings/path';
import SearchHeader from '../../../header';
import { getSearchLink, getSuggestionLink } from '../../utils';
import { ViewProps } from '../../container';
import styles from './style.module.scss';

const View = ({
  // Shared props
  keyword,

  personalizedMessages,
  promotionMessages,
  topBrands,
  topCategories,
  searchedKeywords,
  trendingKeywords,
  categorizedSuggestions,
  suggestedProducts,
  searchSuggestionKeywords,
  magazineSearchSuggestionKeywords,

  isPanelVisible,
  isOnMagazineRoute,
  onAutoCompleteClick,
  onKeywordClick,
  onRequestClose,

  // SearchHeader props
  placeholder,
  onClick,
  onChange,
  onSubmit,
  onReset,
  onPromotionMessageClick
}: ViewProps) => {
  const location = useLocation();
  // Restore input focus on autocomplete click
  const searchInputRef = useRef(null);
  const _onAutoCompleteClick = (keyword: string, originId?: string) => {
    onAutoCompleteClick?.(keyword, originId);
    searchInputRef.current?.focus();
  };

  // TODO: Add divider
  return !isPanelVisible ? null : (
    <div className={classNames(styles.searchPanelContainer)}>
      <div className={styles.panelBody}>
        <div className={styles.panelBodyContent}>
          <SearchHeader
            {...{
              ref: searchInputRef,
              isOpen: isPanelVisible,
              keyword,
              placeholder,
              onClick,
              onChange,
              onSubmit,
              onReset,
              onRequestClose
            }}
          />
          {isPanelVisible && (
            <div className={styles.sections}>
              {/* Promotions */}
              {!keyword && (!!personalizedMessages.length || !!promotionMessages.length) && (
                <div className={classNames(styles.promotions)}>
                  {personalizedMessages.map((message, index) => (
                    <PromotionBlock
                      key={index}
                      id={SearchSource.PERSONALIZED_MESSAGE}
                      message={message.title}
                      link={message.url}
                      onClick={onPromotionMessageClick}
                      classes={{ container: styles.promotion }}
                    />
                  ))}
                  {promotionMessages.map((message, index) => (
                    <PromotionBlock
                      key={index}
                      id={SearchSource.PROMOTION_MESSAGE}
                      message={message.title}
                      link={message.url}
                      onClick={onPromotionMessageClick}
                      classes={{ container: styles.promotion }}
                    />
                  ))}
                </div>
              )}
              {/* Trending search */}
              {!keyword && !!trendingKeywords.length && (
                <KeywordRows
                  {...{
                    id: SearchSource.TRENDING_KEYWORDS,
                    keywords: trendingKeywords,
                    title: { label: 'Tìm kiếm phổ biến' },
                    classes: {
                      container: classNames(styles.section, styles.trendingKeywords),
                      item: styles.trendingKeywordRow
                    },
                    getLink: (keyword) => getSearchLink({ keyword, isMagazineSearch: isOnMagazineRoute }),
                    onRowClick: onKeywordClick,
                    onAutoCompleteClick: _onAutoCompleteClick
                  }}
                />
              )}
              {/* Search history */}
              {!keyword && !!searchedKeywords.length && (
                <KeywordPills
                  {...{
                    id: SearchSource.HISTORY,
                    keywords: searchedKeywords,
                    title: { label: 'Lịch sử tìm kiếm' },
                    classes: { container: classNames(styles.section, styles.searchedKeywords) },
                    getLink: (keyword) => getSearchLink({ keyword, isMagazineSearch: isOnMagazineRoute }),
                    onClick: onKeywordClick
                  }}
                />
              )}
              {/* Suggested keywords with type */}
              {!isOnMagazineRoute && !!keyword && !!categorizedSuggestions.length && (
                <KeywordRows
                  {...{
                    id: SearchSource.SUGGESTED_KEYWORDS,
                    title: { label: 'Gợi ý từ khóa' },
                    keywords: categorizedSuggestions,
                    getLabel: (suggestion) => suggestion?.keyword,
                    getGroup: (suggestion) => suggestion?.type && suggestion?.type !== 'mixed' && suggestion?.type,
                    getLink: (suggestion) => getSuggestionLink({ suggestion, pathname: location.pathname }),
                    rowContentTemplate: (rowText) =>
                      generateHighlightedFragment({ segmentToHighlight: keyword, text: rowText }),
                    classes: { container: classNames(styles.section, styles.suggestedKeywords) },
                    onRowClick: onKeywordClick,
                    onAutoCompleteClick: _onAutoCompleteClick
                  }}
                />
              )}
              {/* Suggested magazine keywords with type */}
              {!!isOnMagazineRoute && !!keyword && !!magazineSearchSuggestionKeywords.length && (
                <KeywordRows
                  {...{
                    id: SearchSource.SUGGESTED_MAGAZINE_KEYWORDS,
                    title: { label: 'Gợi ý từ khóa' },
                    keywords: magazineSearchSuggestionKeywords,
                    getLink: (keyword) => getSearchLink({ keyword, isMagazineSearch: true }),
                    rowContentTemplate: (rowText) =>
                      generateHighlightedFragment({ segmentToHighlight: keyword, text: rowText }),
                    classes: { container: classNames(styles.section, styles.suggestedKeywords) },
                    onRowClick: onKeywordClick,
                    onAutoCompleteClick: _onAutoCompleteClick
                  }}
                />
              )}
              {/* TODO: Refactor */}
              {/* Suggested products */}
              {!!keyword && !!suggestedProducts.length && (
                <ProductPreviews
                  {...{
                    id: SearchSource.SUGGESTED_PRODUCTS,
                    products: suggestedProducts,
                    title: {
                      label: 'Kết quả tìm kiếm',
                      viewMoreLink: {
                        link: getSearchLink({ keyword }),
                        title: 'Xem tất cả',
                        onClick: (e) =>
                          onKeywordClick({
                            e,
                            keyword,
                            id: SearchSource.SUGGESTED_PRODUCTS_VIEW_ALL,
                            link: getSearchLink({ keyword })
                          })
                      }
                    },
                    classes: { container: classNames(styles.section, styles.suggestedProducts) },
                    onProductClick: onKeywordClick
                  }}
                />
              )}
              {/* Top brands */}
              {!keyword && !!topBrands.length && (
                <BrandPills
                  {...{
                    id: SearchSource.TOP_BRANDS,
                    brands: topBrands,
                    title: { label: 'Thương hiệu nổi bật' },
                    classes: { container: classNames(styles.section, styles.topBrands) },
                    onClick: onKeywordClick
                  }}
                />
              )}
              {/* Trending categories */}
              {!keyword && !!topCategories.length && (
                <KeywordPills
                  {...{
                    id: SearchSource.TOP_CATEGORIES,
                    keywords: topCategories,
                    title: { label: 'Category' },
                    classes: { container: classNames(styles.section, styles.topCategories) },
                    getLink: (category) =>
                      category?.slug ? generatePath(ROUTING_PRODUCT_CATEGORY, { categoryFilter: category?.slug }) : '#',
                    getLabel: (category) => category?.name,
                    onClick: onKeywordClick
                  }}
                />
              )}
              {/* Search history and trending search */}
              {false && !!keyword && (
                // Search result
                <div className={styles.contentGroup}>
                  {isOnMagazineRoute && !!magazineSearchSuggestionKeywords.length && (
                    <KeywordRows
                      {...{
                        id: 'magazine-results',
                        keywords: magazineSearchSuggestionKeywords,
                        getLink: (keyword) => getSearchLink({ keyword, isMagazineSearch: true }),
                        rowContentTemplate: (rowText) =>
                          generateHighlightedFragment({ segmentToHighlight: keyword, text: rowText }),
                        onRowClick: onKeywordClick,
                        onAutoCompleteClick: _onAutoCompleteClick
                        // classes: { container: styles.rowList.container, item: styles.rowList.container.row.container }
                      }}
                    />
                  )}
                  {!!searchSuggestionKeywords.length && (
                    <KeywordRows
                      {...{
                        id: 'product-results',
                        keywords: searchSuggestionKeywords,
                        getLink: (keyword) => getSearchLink({ keyword }),
                        title: isOnMagazineRoute && {
                          label: 'Sản phẩm',
                          viewMoreLink: { link: getSearchLink({ keyword }), title: 'Xem tất cả' }
                        },
                        rowContentTemplate: (rowText) =>
                          generateHighlightedFragment({ segmentToHighlight: keyword, text: rowText }),
                        onRowClick: onKeywordClick,
                        onAutoCompleteClick: _onAutoCompleteClick
                        // classes: { container: styles.rowList.container, item: styles.rowList.container.row.container }
                      }}
                    />
                  )}
                  {!isOnMagazineRoute && !!magazineSearchSuggestionKeywords.length && (
                    <KeywordRows
                      {...{
                        id: 'magazine-results',
                        keywords: magazineSearchSuggestionKeywords,
                        getLink: (keyword) => getSearchLink({ keyword, isMagazineSearch: true }),
                        title: {
                          label: 'Bài viết',
                          viewMoreLink: {
                            link: getSearchLink({ keyword, isMagazineSearch: true }),
                            title: 'Xem tất cả'
                          }
                        },
                        rowContentTemplate: (rowText) =>
                          generateHighlightedFragment({ segmentToHighlight: keyword, text: rowText }),
                        onRowClick: onKeywordClick,
                        onAutoCompleteClick: _onAutoCompleteClick
                        // classes: { container: styles.rowList.container, item: styles.rowList.container.row.container }
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={classNames(styles.searchOverlay, isPanelVisible && styles.show)} onClick={onRequestClose} />
    </div>
  );
};

export default View;
