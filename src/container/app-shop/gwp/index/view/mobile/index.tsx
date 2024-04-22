import { useEffect } from 'react';
import classNames from 'classnames';
import Image from 'presentation-component/ui/image';
import LargeScheme from 'presentation-component/gwp/large-scheme';
import SmallScheme from 'presentation-component/gwp/small-scheme';
import Loading from 'components/ui/loading';
import AdLink from 'presentation-component/ui/ad-link';
import CollapsibleList from 'presentation-component/ui/collapsible-list';
import ItemCarousel from 'presentation-component/item-list-hoc/item-carousel/component';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import SectionHeader from 'container/app-shop/gwp/generic/section-header';
import Testimonial from 'container/app-shop/gwp/generic/testimonial';
import { CollapsibleTemplateGwpFaq } from 'constants/application/faq';
import { isTimestampInFuture } from 'utils/time';
import { useOnScreen } from 'utils/visibility.hook';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const View = ({ schemes, gwpBanner, weeklyBanners, banner, isLoading, onCountdownExpire, onCopy }: ViewProps) => {
  const { ref, setRef, isVisible } = useOnScreen({ threshold: 0.1, rootMargin: '-50px 0px 0px 0px' });
  useEffect(() => {
    isVisible ? ref.current?.play() : ref.current?.pause();
  }, [isVisible]);
  const largeSchemeIndex = schemes.index.findIndex(
    (scheme) =>
      scheme.style === 'large' &&
      (!scheme?.discount_code?.end_date || isTimestampInFuture(scheme?.discount_code?.end_date))
  );
  const largeScheme = schemes.index[largeSchemeIndex];
  let smallSchemes =
    largeSchemeIndex === -1
      ? schemes.index
      : schemes.index.slice(0, largeSchemeIndex).concat(schemes.index.slice(largeSchemeIndex + 1));
  smallSchemes = smallSchemes.filter(
    (scheme) => !scheme?.discount_code?.end_date || isTimestampInFuture(scheme?.discount_code?.end_date)
  );
  const shouldShowLargeScheme = schemes.loaded && largeScheme;
  const shouldShowSmallSchemes = !!smallSchemes.length;

  return (
    <div
      className={styles.gwpIndexContainer}
      style={{ backgroundColor: gwpBanner?.theme_color || VARIABLE.colorWhite }}
    >
      <div className={styles.primaryBannerTitleSection}>Săn quà FREE tại Lixibox</div>
      {isLoading ? (
        <Loading classes={{ container: styles.loader }} />
      ) : (
        <>
          {banner.isBannerLoading ? (
            <div
              className={classNames(
                styles.primaryBannerSection,
                banner.isVideoBanner ? styles.primaryBannerSectionVideo : styles.primaryBannerSectionImage
              )}
            >
              <LoadingPlaceholder className={styles.placeholder} />
            </div>
          ) : !banner.isBannerLoaded ? null : banner.isVideoBanner ? (
            <div
              className={classNames(
                styles.primaryBannerSection,
                banner.isVideoBanner ? styles.primaryBannerSectionVideo : styles.primaryBannerSectionImage
              )}
            >
              <video ref={setRef} autoPlay={true} src={banner.currentBannerUrl} controls muted loop />
            </div>
          ) : (
            <AdLink
              className={classNames(
                styles.primaryBannerSection,
                banner.isVideoBanner ? styles.primaryBannerSectionVideo : styles.primaryBannerSectionImage
              )}
              to={gwpBanner?.links?.[0] || ''}
            >
              <Image alt="" src={banner.currentBannerUrl} className={styles.image} />
            </AdLink>
          )}
          {!!shouldShowLargeScheme && (
            <div className={styles.largeSchemeSection}>
              <SectionHeader title="Tiết kiệm & Trải nghiệm ❤️‍🔥" />
              <LargeScheme
                {...{
                  scheme: largeScheme,
                  classes: { container: styles.largeScheme },
                  themeColor: gwpBanner?.theme_color,
                  onCopy,
                  onCountdownExpire
                }}
              />
            </div>
          )}
          {!!shouldShowSmallSchemes && (
            <div className={styles.smallSchemesSection}>
              <SectionHeader title="Quà tặng miễn phí cho đơn hàng 💝" />
              <div className={styles.smallSchemesIndex}>
                {smallSchemes.map((scheme, index) => (
                  <SmallScheme
                    {...{
                      key: index,
                      scheme,
                      classes: { container: styles.smallScheme }
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {!!schemes.testimonials.length && (
            <>
              <SectionHeader
                title="Cùng xem review về chương trình GWP"
                classes={{ container: styles.testimonialHeader }}
              />
              <ItemCarousel
                classes={{
                  container: styles.testimonialSlider,
                  child: styles.testimonialSliderItem
                }}
              >
                {schemes.testimonials.map((testimonial, index) => (
                  <Testimonial key={index} testimonial={testimonial} classes={{ container: styles.testimonial }} />
                ))}
              </ItemCarousel>
            </>
          )}
          {false && (
            <div className={styles.faqSection}>
              <SectionHeader title="Câu hỏi thường gặp" />
              <CollapsibleList
                list={CollapsibleTemplateGwpFaq}
                classes={{ container: styles.faqContainer, item: styles.faq }}
                withoutSeparator
              />
            </div>
          )}
          {!!weeklyBanners.length && (
            <div className={styles.otherBannersSection}>
              <SectionHeader title="Quà tặng miễn phí cho sản phẩm" />
              <div className={styles.otherBanners}>
                {weeklyBanners.map((banner, index) => (
                  <AdLink key={index} className={styles.otherBanner} to={banner.links?.[0] || ''}>
                    <Image alt="" src={banner?.cover_image?.original_url || ''} />
                  </AdLink>
                ))}
              </div>
            </div>
          )}
          <div className={styles.bottomSection} />
        </>
      )}
    </div>
  );
};

export default View;
