// Deduplicate logic
import { useEffect } from 'react';
import Image from 'presentation-component/ui/image';
import LargeScheme from 'presentation-component/gwp/large-scheme';
import SmallScheme from 'presentation-component/gwp/small-scheme';
import AdLink from 'presentation-component/ui/ad-link';
import CollapsibleList from 'presentation-component/ui/collapsible-list';
import ProductSlider from 'presentation-component/general/desktop/product-slider';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import { CollapsibleTemplateGwpFaq } from 'constants/application/faq';
import Loading from 'components/ui/loading';
import WrapLayout from 'container/layout/wrap';
import { isTimestampInFuture } from 'utils/time';
import { useOnScreen } from 'utils/visibility.hook';
import SectionHeader from 'container/app-shop/gwp/generic/section-header';
import Testimonial from 'container/app-shop/gwp/generic/testimonial';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const View = ({ schemes, gwpBanner, weeklyBanners, banner, isLoading, onCountdownExpire, onCopy }: ViewProps) => {
  const { ref, setRef, isVisible } = useOnScreen({ threshold: 0.1, rootMargin: '-100px 0px 0px 0px' });
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
  const shouldShowTestimonials = !!schemes.testimonials.length;

  return (
    <div
      className={styles.gwpIndexContainer}
      style={{ backgroundColor: gwpBanner?.theme_color || VARIABLE.colorWhite }}
    >
      {isLoading ? (
        <Loading classes={{ container: styles.loader }} />
      ) : (
        <>
          <WrapLayout type={'larger'}>
            {banner.isBannerLoading ? (
              <div className={styles.primaryBannerSection}>
                <LoadingPlaceholder className={styles.placeholder} />
              </div>
            ) : !banner.isBannerLoaded ? null : banner.isVideoBanner ? (
              <div className={styles.primaryBannerSection}>
                <video ref={setRef} autoPlay={true} src={banner.currentBannerUrl} controls muted loop />
              </div>
            ) : (
              <AdLink className={styles.primaryBannerSection} to={gwpBanner?.links?.[0] || ''}>
                <Image alt="" src={banner.currentBannerUrl} className={styles.image} />
              </AdLink>
            )}
          </WrapLayout>
          <WrapLayout>
            {!!shouldShowLargeScheme && (
              <div className={styles.largeSchemeSection}>
                <SectionHeader title="Tiết kiệm & Trải nghiệm ❤️‍🔥" />
                <LargeScheme
                  {...{
                    scheme: largeScheme,
                    classes: { container: styles.largeSchemeContent },
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
            {shouldShowTestimonials && (
              <div className={styles.testimonialsSection}>
                <SectionHeader title="Cùng xem review về chương trình GWP " />
                <ProductSlider
                  column={3}
                  data={schemes.testimonials.map((testimonial) => ({
                    testimonial,
                    classes: { container: styles.testimonial }
                  }))}
                  classes={{ container: styles.testimonials, sliderItem: styles.testimonialContainer }}
                  template={Testimonial}
                />
              </div>
            )}
            {false && (
              <div className={styles.faqSection}>
                <SectionHeader title="Câu hỏi thường gặp" />
                <CollapsibleList
                  list={CollapsibleTemplateGwpFaq}
                  classes={{
                    container: styles.faqContainer,
                    item: styles.faq
                  }}
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
          </WrapLayout>
        </>
      )}
    </div>
  );
};

export default View;
