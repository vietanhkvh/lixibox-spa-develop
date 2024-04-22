/* istanbul ignore next */
import { useState, useEffect } from 'react';

import { PRODUCT_LIST } from '../data';
import { currenyFormat } from '../../../../utils/currency';

const Section17 = ({ productData, onAddToCart, isAddCartLoading }) => {
  const productBox = productData[PRODUCT_LIST[7]] && productData[PRODUCT_LIST[7]].box;
  const price =
    (productData[PRODUCT_LIST[7]] && productData[PRODUCT_LIST[7]].box && productData[PRODUCT_LIST[7]].box.price) || 0;

  const handleAddToCart = () => {
    if (isLoading) return;

    const slug = PRODUCT_LIST[7];
    setLoading(true);
    onAddToCart(slug, productBox);
  };

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    !isAddCartLoading && setLoading(false);
  }, [isAddCartLoading]);

  return (
    <div id="SECTION1175" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="GROUP1184" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX1185" className="ladi-element">
              <div className="ladi-box"></div>
            </div>
            <div id="HEADLINE1186" className="ladi-element">
              <h3 className="ladi-headline">
                <span style={{ color: 'rgb(232, 48, 140)', fontWeight: 700 }}>
                  Máy đẩy tinh chất nóng lạnh Halio Ion Hot &amp; Cool&nbsp;
                </span>
                giúp tăng gấp 3.5 lần hiệu quả trị thâm, dưỡng trắng so với thoa tay thông thường, đồng thời tích hợp
                các chức năng giúp làm sạch sâu, massage nâng cơ, cải thiện nếp nhăn, se khít lỗ chân lông hiệu quả,
                mang đến cho bạn làn da căng mướt, sáng mịn.
              </h3>
            </div>
          </div>
        </div>
        <div
          id="GALLERY1176"
          className="ladi-element"
          data-max-item="1"
          data-runtime-id="VYALmjHlGKmb"
          data-current="0"
          data-is-next="true"
          data-scrolled="false"
          data-loaded="true"
        >
          <div className="ladi-gallery ladi-gallery-bottom">
            <div className="ladi-gallery-view">
              <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-left opacity-0 ladi-hidden"></div>
              <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-right opacity-0 ladi-hidden"></div>
              <div className="ladi-gallery-view-item selected" data-index="0"></div>
            </div>
            <div className="ladi-gallery-control">
              <div className="ladi-gallery-control-box">
                <div className="ladi-gallery-control-item selected" data-index="0"></div>
              </div>
              <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-left opacity-0"></div>
              <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-right opacity-0"></div>
            </div>
          </div>
        </div>
        <div id="SHAPE1179" className="ladi-element">
          <div className="ladi-shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 1152 1896.0833"
              className=""
              fill="rgba(255, 255, 255, 1.0)"
            >
              {' '}
              <path d="M1075 864q0 13-10 23l-466 466q-10 10-23 10t-23-10L87 887q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23zm0-384q0 13-10 23L599 969q-10 10-23 10t-23-10L87 503q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"></path>{' '}
            </svg>
          </div>
        </div>
        <div id="GROUP1180" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX1181" className="ladi-element">
              <div className="ladi-box"></div>
            </div>
            <div id="HEADLINE1182" className="ladi-element">
              <h3 className="ladi-headline">
                <span style={{ fontWeight: 'bold', color: 'rgb(232, 48, 140)' }}>
                  - Công nghệ Ion Galvanic kết hợp nhiệt nóng 45 độ C
                </span>
                <br />- Sóng rung F-Vibration hiện đại
                <br />- Đầu lạnh Aluminium cao cấp
                <br />- 4 chế độ làm đẹp chuyên sâu:
                <br />
                &nbsp; &nbsp;+Chế độ làm sạch (Deep Clean)
                <br />
                &nbsp; &nbsp;+Chế độ đẩy tinh chất (Fully Absorb)
                <br />
                &nbsp; &nbsp;+Chế độ mặt nạ (Moisture)
                <br />
                &nbsp; &nbsp;+Chế độ làm lạnh (Cool)
                <br />- Bảo hành chính hãng 1 năm 1 đổi 1
                <br />
                <br />
              </h3>
            </div>
          </div>
        </div>
        <div id="HEADLINE1183" className="ladi-element">
          <h3 className="ladi-headline">
            Máy đẩy tinh chất nóng lạnh Halio Ion Hot &amp; Cool
            <br />
          </h3>
        </div>
        <div id="GROUP1187" className="ladi-element">
          <div className="ladi-group">
            <div id="SHAPE1188" className="ladi-element">
              <div className="ladi-shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 416.07 97.96"
                  className=""
                  fill="rgba(242, 67, 13, 1)"
                >
                  <path d="M415.93,69.33c-8.52,0-18.6.57-28,.57,0-1,2.1-2.42,2.87-3,1.16-.85,3.13-.63,4.56-3.17.44-.77-1.24-1.84,0-3.23.74-.84,2-1,2.56-1.48.74-.61,7.84-4.58,2-4.58.39-2.15,7.7-1,7.44-3-.08-.65-19.25-1-21.17-1,0-2.35,5.1,0,5.72-1.14.83-1.52-7.66-1.12-8.57-1.91.82-2.44.88.25-.62-2.46,5.08-4.78,11.85-2.2,17.75-5.61-1.82-1.61-8.17.68-10.5.82-4.22.26-13.52,1.43-16.36-1.42,1.42-1.48,9.88-.82,10.19-1.63.73-1.91-10.36.43-10.77-2.1.89.27,1.44-1.74.81-2.28.77.66-4.6,0-4.25-1.15.93.41,1.5.22,1.74-.56,0-1.2-6.2-1.73-6.89-1.73,0-3,12.9-4.62,14.82-4.87,3.53-.44,8.16-1.21,11.51-1.42,1.6-.11,4-.51,5.15-.58,2.11-.12,4,.2,5.79-.45,1-.36-.2-1.26-.64-1.26,0-.68,4.94-3.21,5.72-3.44,2.43-.7,6.7.53,8.51-1.39-1-1.1-10.83-.83-12.38-.9-4.3-.19-8.14-.07-12.08-.57-7.41-.94-14.46-1.16-21.82-2.29-12.21-1.87-24.64-4.48-37.49-5.72C317,5,302,3.93,287.31,3.09,271,2.15,253.49.31,236.68.09,213-.23,190.44.39,167.56.66c-14.71.17-31.73-.19-46.35,1.71-28,3.65-57.48,3-85.56,8-4.31.77-27.23,6.23-18.34,12,1.34.87,4,.65,4.9,1.43.68.58,2.71,4.31,2.58,5.43-.21,1.85,1,.89-.67,2.87-.43.52-3.82-.58-4.2,0-1.48,2.29,4.52,1.15,5.72,1.15,0,2.69-5.88.59-6.78,2.49-.11.25,13-1.16,11.72,2.43-.73,2.1-6-1.26-7.13,1-.17.34,5.7,1.1,6.2,1-.07.43-10.8,1.15-12,1.15-.25.82,1.77,1.47,2.3,1.91-.3,3.19-8.21-1.11-5.61,3.81,1.79,3.38,6,1.51,8.46,3.16-1.94,2.67-1.87.74-1.49,4.28.18,1.64,3.44.37.55,2.87-1.38,1.19-7.46,1.19-9.65,1.14-3.48-.08-7.22-1-10,.84a12.6,12.6,0,0,0-2,2c-.34.67-.23,4,.57,4.58,1.1.85,3.37-.19,4.29.57,2.25,1.84-.16,3.44.88,5.15.55.89,3.59,3.73,4.27,4.58.52.64,1.88,1.87,2.6,2.91,1,1.43.62,2.44,1.89,3.56,2.24,2,5.66,2.22,8.12,4.14,1.86,1.45,2.29,2.41,4.5,4,2.76,1.95-.82,2,4.43,2.48,0,0,.82-1.06,1-1,2.33.2,13.82,2.29,13.57,2.56.65.87,2.27.06,2.27-.85,2.81,0,5.37,1.4,8.29,1.72,1.28.14,2.28-.36,4,.58.81-.92,5.69.54,7.11.56,2.77,0,20.54.82,20,.85,2.29-.15,10.53-1,11.12.31,1.52-1.44,11.37-1.44,13.78-1.73,3.7-.45,7.47-.13,10.3-.58,5-.77,9.58,0,13.73.58,2.6.33,143.42-.78,168.09-1.72,10.88-.42,25.81,0,36.28,0,3.54,0,34,1.06,34,0,0-.48-7.66-1.17-8.11-1.15a24.85,24.85,0,0,1-5.85.09,51.74,51.74,0,0,0-7.23-.37,35.42,35.42,0,0,1-4.83.29,26.57,26.57,0,0,1-2.8-1.06c-1-.21-1.16,1.34-2.1,1.06a.9.9,0,0,0-.57-1.15c.43-2.17,24.68-.6,26.33-.57,1.29,0,2.64-.5,4.22-.5a66.55,66.55,0,0,1,6.67.2,164.81,164.81,0,0,0,18.55-.27c1,0,19.52-4.74,16-7.44h-4.28C411.35,82.05,416.34,69.33,415.93,69.33Z"></path>
                </svg>
              </div>
            </div>
            <div id="HEADLINE1190" className="ladi-element">
              <h3 className="ladi-headline">{currenyFormat(price)}</h3>
            </div>
          </div>
        </div>
        <div id="HEADLINE1299" className="ladi-element">
          <h3 className="ladi-headline">
            Dưỡng da chuẩn Spa tại nhà
            <br />
          </h3>
        </div>
        <div id="GROUP1336" className="ladi-element">
          <div className="ladi-group" id="BUTTON1177OUTER">
            <div data-action="true" id="BUTTON1177" className="ladi-element">
              <div className="ladi-button">
                <div className="ladi-button-background"></div>
                <div id="BUTTON_TEXT1177" className="ladi-element" onClick={handleAddToCart}>
                  <p className="ladi-headline">
                    &nbsp; &nbsp; &nbsp;
                    {isLoading ? 'Vui lòng chờ...' : 'ĐẶT MUA NGAY'}
                  </p>
                </div>
              </div>
            </div>
            <div id="SHAPE1335" className="ladi-element">
              <div className="ladi-shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 1664 1896.0833"
                  className=""
                  fill="rgba(255, 255, 255, 1)"
                >
                  {' '}
                  <path d="M1280 704q0-26-19-45t-45-19-45 19l-147 146V512q0-26-19-45t-45-19-45 19-19 45v293L749 659q-19-19-45-19t-45 19-19 45 19 45l256 256q19 19 45 19t45-19l256-256q19-19 19-45zm-640 832q0 53-37.5 90.5T512 1664t-90.5-37.5T384 1536t37.5-90.5T512 1408t90.5 37.5T640 1536zm896 0q0 53-37.5 90.5T1408 1664t-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm128-1088v512q0 24-16 42.5t-41 21.5L563 1146q1 7 4.5 21.5t6 26.5 2.5 22q0 16-24 64h920q26 0 45 19t19 45-19 45-45 19H448q-26 0-45-19t-19-45q0-14 11-39.5t29.5-59.5 20.5-38L268 384H64q-26 0-45-19T0 320t19-45 45-19h256q16 0 28.5 6.5t20 15.5 13 24.5T389 329t5.5 29.5T399 384h1201q26 0 45 19t19 45z"></path>{' '}
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div id="GROUP1337" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX1338" className="ladi-element">
              <div className="ladi-box"></div>
            </div>
            <div id="HEADLINE1339" className="ladi-element">
              <h3 className="ladi-headline">
                Đặt trước để được giá 2160K &amp; free quà 340K - nhập mã{' '}
                <span style={{ fontWeight: 'bold' }}>HOTCOOL</span>; hoặc free quà 2089K - nhập mã{' '}
                <span style={{ fontWeight: 'bold' }}>HALIO2000</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section17;
