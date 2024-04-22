/* istanbul ignore next */
import { useState, useEffect } from 'react';

import { ViewedSource } from 'tracking/constants';
import { stringToHash } from '../../../utils/encode';
import { renderHtmlContent } from '../../../utils/html';
import { isMobileVersion } from '../../../utils/responsive';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { MOBILE_ALERT_ADD_TO_CART_SUCCESS } from '../../../constants/application/modal';

import Section1 from './section/section1';
import Section2 from './section/section2';
import Section3 from './section/section3';
import Section4 from './section/section4';
import Section5 from './section/section5';
import Section6 from './section/section6';
import Section7 from './section/section7';
import Section8 from './section/section8';
import Section9 from './section/section9';
import Section10 from './section/section10';
import Section11 from './section/section11';
import Section12 from './section/section12';
import Section13 from './section/section13';
import Section14 from './section/section14';
import Section15 from './section/section15';
import Section16 from './section/section16';
import Section17 from './section/section17';
import Section18 from './section/section18';
import Section19 from './section/section19';
import Section20 from './section/section20';
import Section21 from './section/section21';
// import Section22 from './section/section22';
import Section23 from './section/section23';
import Section24 from './section/section24';
import Section25 from './section/section25';

import styles from './style.module.scss';
import { externalStyle } from './style';
import { PRODUCT_LIST } from './data';

const ExternalResouce = () => {
  return (
    <div style={{ display: 'none' }}>
      <link rel="stylesheet" href="https://w.ladicdn.com/v2/source/ladipage.min.css?v=1623214347028" />
      {renderHtmlContent({ content: externalStyle, isSantitizeHtml: false })}
    </div>
  );
};

const initFetchData = ({ getProductDetailAction }) => {
  for (let i = 0; i < PRODUCT_LIST.length; i++) {
    setTimeout(() => getProductDetailAction({ productId: PRODUCT_LIST[i] }), i * 200);
  }
};

const Component = (props: any) => {
  const {
    getProductDetailAction,
    shopStore: { productDetail },
    cartStore: { isAddCartLoading },
    addItemToCartAction,
    openModalAction
  } = props;

  const [productData, setOroductData]: any = useState({
    [PRODUCT_LIST[0]]: null,
    [PRODUCT_LIST[1]]: null,
    [PRODUCT_LIST[2]]: null,
    [PRODUCT_LIST[3]]: null,
    [PRODUCT_LIST[4]]: null,
    [PRODUCT_LIST[5]]: null,
    [PRODUCT_LIST[6]]: null,
    [PRODUCT_LIST[7]]: null
  });

  const updateProductData = () => {
    if (!productDetail) return;

    PRODUCT_LIST.forEach((url) => {
      const hash = stringToHash(url);
      if (!productDetail[hash]) return;

      if (productData[url] === null) {
        setOroductData(
          Object.assign({}, productData, {
            [url]: productDetail[hash]
          })
        );
      }
    });
  };

  const init = () => {
    initFetchData({ getProductDetailAction });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    updateProductData();
  }, [productDetail]);

  const handleAddToCart = (slug, productBox) => {
    const hash = stringToHash(slug);
    const selectedProduct = productDetail[hash];

    if (!isMobileVersion()) {
      addItemToCartAction({
        box: productBox,
        boxId: slug,
        quantity: 1,
        displayCartSumary: true,
        purchaseType: PURCHASE_TYPE.NORMAL,
        trackingSource: ViewedSource.LANDING_PAGE
      });
    } else {
      addItemToCartAction({
        box: productBox,
        boxId: slug,
        quantity: 1,
        displayCartSumary: false,
        purchaseType: PURCHASE_TYPE.NORMAL,
        trackingSource: ViewedSource.LANDING_PAGE,
        onSuccess: () => {
          openModalAction(
            MOBILE_ALERT_ADD_TO_CART_SUCCESS({
              data: {
                product: {
                  image:
                    selectedProduct &&
                    selectedProduct.box &&
                    selectedProduct.box.pictures[0] &&
                    selectedProduct.box.pictures[0].medium_url,
                  price: selectedProduct && selectedProduct.box && selectedProduct.box.price,
                  name: selectedProduct && selectedProduct.box && selectedProduct.box.name
                }
              }
            })
          );
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <ExternalResouce />
      <div className="ladi-wraper">
        <Section1 />
        <Section2 />
        <Section3 />
        <div id="scroll-section-1"></div>
        <Section4 {...{ productData, onAddToCart: handleAddToCart, isAddCartLoading }} />
        <div id="scroll-section-2"></div>
        <Section5 {...{ productData, onAddToCart: handleAddToCart, isAddCartLoading }} />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <div id="scroll-section-3"></div>
        <Section10 {...{ productData, onAddToCart: handleAddToCart, isAddCartLoading }} />
        <Section11 />
        <Section12 />
        <Section13 />
        <Section14 />
        <Section15 />
        <Section16 />
        <div id="scroll-section-4"></div>
        <Section17 {...{ productData, onAddToCart: handleAddToCart, isAddCartLoading }} />
        <Section18 />
        <Section19 />
        <Section20 />
        <Section21 />
        {/* <Section22 /> */}
        <Section23 />
        <Section24 />
        <Section25 />
      </div>
    </div>
  );
};

export default Component;
