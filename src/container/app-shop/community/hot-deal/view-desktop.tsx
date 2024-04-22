import WrapLayout from '../../../../container/layout/wrap/container';
import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';
import { isEmptyObject, isUndefined } from '../../../../utils/validate';
import Pagination from 'components/general/pagination';
import NoContent from '../../../../container/exception/404';
import { ERROR_TEXT_NO_RESULT } from '../../../../config';
import { renderLoadingPlaceholder } from './view';
import STYLE from './style';
import { getItemIndexAcrossPages } from 'utils/page';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

export function renderComponent({ props, state }) {
  const { urlList } = state;
  const { hotDeal } = props;

  const newBoxes = !isUndefined(hotDeal.boxes) ? hotDeal.boxes : null;

  const newPaging =
    isUndefined(hotDeal.paging) || isEmptyObject(hotDeal.paging)
      ? {
          current_page: 0,
          per_page: 0,
          total_pages: 0
        }
      : hotDeal.paging;

  const noContentProps = { isShowNavigation: false, ...ERROR_TEXT_NO_RESULT };
  const { current_page, per_page, total_pages } = newPaging;

  function Heading({ title }) {
    return (
      <div style={STYLE.heading}>
        <div style={STYLE.heading.title}>{title}</div>
      </div>
    );
  }

  return (
    <WrapLayout style={STYLE.wrap}>
      <Heading title={'Hot Deal'} />
      {Array.isArray(newBoxes) ? (
        newBoxes.length ? (
          <ItemVerticalList column={5}>
            {newBoxes?.map((item, index) => (
              <ProductItem
                key={item.id || index}
                product={item}
                isFullPadding
                onClick={() =>
                  gatewayTrackViewContentFromList({
                    source: ViewedSource.HOT_DEAL,
                    box: item,
                    index: getItemIndexAcrossPages({
                      itemIndexInPage: index,
                      perPage: per_page,
                      currentPage: current_page
                    })
                  })
                }
              />
            ))}
          </ItemVerticalList>
        ) : (
          <NoContent {...noContentProps} />
        )
      ) : (
        renderLoadingPlaceholder()
      )}
      <Pagination
        {...{
          urlList,
          per: per_page,
          total: total_pages,
          current: current_page,
          handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }}
      />
    </WrapLayout>
  );
}

export default renderComponent;
