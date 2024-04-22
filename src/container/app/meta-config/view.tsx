import { Helmet } from 'react-helmet-async';
import { JSONLD, Generic, GenericCollection } from 'react-structured-data';
import { convertUnixTimeDDMMYYYY } from '../../../utils/encode';
import { DATETIME_TYPE_FORMAT } from '../../../constants/application/global';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

const generateReviewData = (product, info) => {
  const list = product.review;

  if (!list || !Array.isArray(list) || !list.length) {
    return '';
  }

  let bestReviewIndex = 0;

  list.forEach((item, $index) => {
    if (item.rate > list[bestReviewIndex]) {
      bestReviewIndex = $index;
    } else if (item.rate === list[bestReviewIndex].rate) {
      if (item.review.length > list[bestReviewIndex].review.length) {
        bestReviewIndex = $index;
      }
    }
  });

  const bestReview = list[bestReviewIndex];
  if (!bestReview) {
    return '';
  }

  return (
    <JSONLD>
      <Generic jsonldtype={'Review'}>
        <GenericCollection type={'itemReviewed'}>
          <Generic jsonldtype={'Thing'} schema={{ name: info.title }} />
        </GenericCollection>

        <GenericCollection type={'author'}>
          <Generic jsonldtype={'Person'} schema={{ name: (!!bestReview.user && bestReview.user.name) || '' }} />
        </GenericCollection>

        <GenericCollection type={'reviewRating'}>
          <Generic jsonldtype={'Rating'} schema={{ ratingValue: bestReview.rate || '', bestRating: 5 }} />
        </GenericCollection>

        <GenericCollection type={'publisher'}>
          <Generic jsonldtype={'Organization'} schema={{ name: 'Lixibox' }} />
        </GenericCollection>
      </Generic>
    </JSONLD>
  );
};

const renderMeta = ({ info, product }) => {
  const handleCheckUrlInfo = (url: string, listUrlDisallow: any) => {
    let result = false;
    listUrlDisallow.forEach((item: string) => {
      if (url?.includes(item)) {
        result = true;
        return result;
      }
    });

    return result;
  };

  const listUrlDisallow = ['tag', 'search', 'community', '404'];

  const isUrlDisallow = handleCheckUrlInfo(info.url, listUrlDisallow);

  return (
    <>
      <Helmet>
        <title>{info.title}</title>
        <meta
          id={'general-title'}
          property="title"
          content={info.title || 'Lixibox - Bringing affordable luxury to the urban population'}
        />
        <meta
          id={'og-title'}
          property="og:title"
          content={info.title || 'Lixibox - Bringing affordable luxury to the urban population'}
        />
        <meta
          id={'general-description'}
          name="description"
          content={info.description || 'Lixibox - Bringing affordable luxury to the urban population'}
        />
        <meta
          id={'og-description'}
          property="og:description"
          content={info.description || 'Lixibox - Bringing affordable luxury to the urban population'}
        />
        <meta id={'og-image'} property="og:image" content={info.image || CDN_ASSETS_PREFIX('/meta/cover.png')} />
        <meta id={'og-url'} property="og:url" content={info.url || 'https://www.lixibox.com'} />
        <meta
          id={'general-keywords'}
          name="keywords"
          content={info.keyword || 'mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, halio, lustre'}
        />
        <meta id={'og-type'} property="og:type" content={info.type || 'product'} />
        <meta property="og:site_name" content="Lixibox - Bringing affordable luxury to the urban population" />
        {/** Open Graph Meta Data  */}
        {!!product && !!product.brand && (
          <meta id={'og-product-brand'} property="product:brand" content={product.brand} />
        )}
        {!!product && !isNaN(product.stock) && (
          <meta
            id={'og-availability'}
            property="og:availability"
            content={product.stock > 0 ? 'in stock' : product.isPreOrder ? 'preorder' : 'out of stock'}
          />
        )}
        {!!product && !isNaN(product.stock) && (
          <meta
            id={'og-product-availability'}
            property="product:availability"
            content={product.stock > 0 ? 'in stock' : product.isPreOrder ? 'preorder' : 'out of stock'}
          />
        )}
        {!!product && !!product.condition && (
          <meta id={'og-product-condition'} property="product:condition" content={product.condition} />
        )}
        {!!product && !!product.priceAmount && (
          <meta id={'og-product-price-amount'} property="product:price:amount" content={product.priceAmount} />
        )}
        {!!product && !!product.priceCurrency && (
          <meta id={'og-product-price-currency'} property="product:price:currency" content={product.priceCurrency} />
        )}
        {!!product && !!product.retailerItemId && (
          <meta
            id={'og-product-retailer-item-id'}
            property="product:retailer_item_id"
            content={product.retailerItemId}
          />
        )}
        {/* ios Application link */}
        <meta property="al:ios:url" content="lixibox://applinks" />
        <meta property="al:ios:app_store_id" content="1078181334" />
        <meta property="al:ios:app_name" content="Lixibox App" />
        <meta property="al:android:url" content="lixibox://applinks" />
        <meta property="al:android:package" content="com.lixibox" />
        <meta property="al:android:app_name" content="Lixibox Android" />
        {/* Additional data */}
        <meta name="author" content={info.author || 'Lixibox Team'} />
        {info.publishDate && <meta property="article:published_time" content={info.publishDate} />}
        {/** Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <link
        rel="canonical"
        key={'canonical'}
        id={'canonical'}
        href={isUrlDisallow ? 'https://www.lixibox.com' : info.url}
      />
      <meta id={'og-robots'} name="robots" content={isUrlDisallow ? 'noindex, nofollow' : 'index, follow'} />
    </>
  );
};

const renderStructuredData = ({ structuredData, reviewSnippets, product, info, constants }) => {
  const breadcrumbList = structuredData.breadcrumbList || [];
  const breadCrumbWithHomePage = [
    { position: 1, name: 'Lixibox', item: 'https://www.lixibox.com/' },
    ...breadcrumbList
  ];

  return (
    <span>
      {!!breadCrumbWithHomePage && (
        <JSONLD>
          <Generic jsonldtype={'BreadcrumbList'}>
            <GenericCollection type={'itemListElement'}>
              {breadCrumbWithHomePage.map((breadcrumb, $index) => (
                <Generic
                  key={`item-bread-crumb-${$index}`}
                  jsonldtype="ListItem"
                  schema={{
                    position: breadcrumb.position,
                    name: breadcrumb.name,
                    item: breadcrumb.item
                  }}
                />
              ))}
            </GenericCollection>
          </Generic>
        </JSONLD>
      )}
      {/** Contact */}
      <JSONLD>
        <Generic
          jsonldtype={'Organization'}
          schema={{
            url: 'https://www.lixibox.com',
            logo: CDN_ASSETS_PREFIX('/logo/logo.png')
          }}
        >
          <GenericCollection type={'contactPoint'}>
            <Generic
              jsonldtype={'ContactPoint'}
              schema={{
                telephone: `+84 ${constants.phone}`,
                contactType: 'customer service'
              }}
            />
          </GenericCollection>
        </Generic>
      </JSONLD>

      {/** Search */}
      <JSONLD>
        <Generic jsonldtype={'WebSite'} schema={{ url: 'https://www.lixibox.com' }}>
          <GenericCollection type={'potentialAction'}>
            <Generic
              jsonldtype={'SearchAction'}
              schema={{
                target: 'https://www.lixibox.com/search/{search_term_string}',
                'query-input': 'required name=search_term_string'
              }}
            />
          </GenericCollection>
        </Generic>
      </JSONLD>

      {/* JSONLD Schema */}
      {!!product && !!info && (
        <JSONLD>
          <Generic
            jsonldtype={'Product'}
            schema={{
              productID: product.id || '',
              name: info.title || '',
              description: info.description || '',
              url: product.slug ? `https://www.lixibox.com/shop/${product.slug}` : '',
              image: info.image || '',
              brand: product.brand || ''
            }}
          >
            <GenericCollection type={'offers'}>
              <Generic
                jsonldtype={'Offer'}
                schema={{
                  price: product.priceAmount || 0,
                  priceCurrency: product.priceCurrency || 'VND',
                  itemCondition: 'https://schema.org/NewCondition',
                  availability: `https://schema.org/${
                    product.stock > 0 ? 'InStock' : product.isPreOrder ? 'PreOrder' : 'OutOfStock'
                  }`,
                  priceValidUntil: convertUnixTimeDDMMYYYY(
                    new Date().getTime() / 1000,
                    DATETIME_TYPE_FORMAT.SHORT_DATE
                  ),
                  sku: product.id,
                  url: product.slug ? `https://www.lixibox.com/shop/${product.slug}` : ''
                }}
              />
            </GenericCollection>
            {!!product.rating && product.rating.count > 0 ? (
              <GenericCollection type={'aggregateRating'}>
                <Generic
                  jsonldtype={'AggregateRating'}
                  schema={{
                    ratingValue: (product.rating && product.rating.avg_rate) || 0,
                    bestRating: product.rating && product.rating.avg_rate ? 5 : 0,
                    ratingCount: (product.rating && product.rating.count) || 0
                  }}
                />
              </GenericCollection>
            ) : (
              <Generic />
            )}
          </Generic>
        </JSONLD>
      )}

      {!!product && !!info && generateReviewData(product, info)}
    </span>
  );
};

const renderView = ({ props }) => {
  const {
    metaStore,
    cartStore: { constants }
  } = props;
  const { info, product, structuredData, reviewSnippets } = metaStore;
  return (
    <span>
      <link rel={'image_src'} href={(!!info && info.image) || CDN_ASSETS_PREFIX('/meta/cover.png')} />
      {(!!info || !!product) && renderMeta({ info, product })}
      {renderStructuredData({
        structuredData,
        reviewSnippets,
        product,
        info,
        constants
      })}
    </span>
  );
};

export default renderView;
