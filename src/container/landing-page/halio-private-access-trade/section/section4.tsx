/* istanbul ignore next */
import { useState, useEffect } from 'react';

import { PRODUCT_LIST } from '../data';
import { currenyFormat } from '../../../../utils/currency';
import { storageKey } from '../../../../constants/application/client-storage';

const Sensitive = ({ productData, onAddToCart, isAddCartLoading }) => {
  const productBox = productData[PRODUCT_LIST[5]] && productData[PRODUCT_LIST[5]].box;
  const originalPrice =
    (productData[PRODUCT_LIST[5]] &&
      productData[PRODUCT_LIST[5]].box &&
      productData[PRODUCT_LIST[5]].box.original_price) ||
    0;
  const price =
    (productData[PRODUCT_LIST[5]] && productData[PRODUCT_LIST[5]].box && productData[PRODUCT_LIST[5]].box.price) || 0;

  const [selected, setSelect] = useState(0);
  const handleAddToCart = () => {
    if (isLoading) return;

    const slug = PRODUCT_LIST[selected + 5];
    setLoading(true);
    onAddToCart(slug, productBox);
  };

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    !isAddCartLoading && setLoading(false);
  }, [isAddCartLoading]);

  return (
    <div id="GROUP1274" className="ladi-element">
      <div className="ladi-group">
        <div id="GROUP1146" className="ladi-element">
          <div className="ladi-group">
            <div data-action="true" id="BUTTON575" className="ladi-element ladi-animation">
              <div className="ladi-button">
                <div className="ladi-button-background"></div>
                <div onClick={handleAddToCart} id="BUTTON_TEXT575" className="ladi-element">
                  <p className="ladi-headline">{isLoading ? 'Vui lòng chờ...' : 'ĐẶT MUA NGAY'}</p>
                </div>
              </div>
            </div>
            <div id="GROUP1049" className="ladi-element">
              <div className="ladi-group">
                <div id="GROUP658" className="ladi-element">
                  <div className="ladi-group">
                    <div id="BOX659" className="ladi-element">
                      <div className="ladi-box"></div>
                    </div>
                    <div id="HEADLINE660" className="ladi-element">
                      <h5 className="ladi-headline">
                        Máy Rửa Mặt Dành Cho Da Nhạy Cảm Halio Sensitive Facial Cleansing &amp; Massaging Device
                      </h5>
                    </div>
                    <div id="PARAGRAPH664" className="ladi-element">
                      <p className="ladi-paragraph">
                        <span style={{ fontWeight: 700 }}>{currenyFormat(price)}</span>
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
                <div id="PARAGRAPH1046" className="ladi-element">
                  <p className="ladi-paragraph">
                    <span style={{ fontWeight: 700 }}>{currenyFormat(originalPrice)}</span>
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div
              id="GALLERY1131"
              className="ladi-element"
              data-max-item="2"
              data-runtime-id="wwvBerRarQqK"
              data-current="0"
              data-is-next="false"
              data-scrolled="true"
              data-loaded="true"
              data-next-time="1623902167872"
            >
              <div className="ladi-gallery ladi-gallery-bottom">
                <div className="ladi-gallery-view">
                  <div
                    className={`ladi-gallery-view-item ${0 === selected && 'selected'}`}
                    data-index="0"
                    data-lazyload="true"
                  ></div>
                  <div className={`ladi-gallery-view-item ${1 === selected && 'selected'}`} data-index="1"></div>
                </div>
                <div className="ladi-gallery-control">
                  <div className="ladi-gallery-control-box" style={{ left: 0 }}>
                    <div
                      className={`ladi-gallery-control-item ${0 === selected && 'selected'}`}
                      data-index="0"
                      onClick={() => setSelect(0)}
                    ></div>
                    <div
                      className={`ladi-gallery-control-item ${1 === selected && 'selected'}`}
                      data-index="1"
                      onClick={() => setSelect(1)}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="IMAGE1271" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Original = ({ productData, onAddToCart, isAddCartLoading }) => {
  const productBox = productData[PRODUCT_LIST[0]] && productData[PRODUCT_LIST[0]].box;
  const originalPrice =
    (productData[PRODUCT_LIST[0]] &&
      productData[PRODUCT_LIST[0]].box &&
      productData[PRODUCT_LIST[0]].box.original_price) ||
    0;
  const price =
    (productData[PRODUCT_LIST[0]] && productData[PRODUCT_LIST[0]].box && productData[PRODUCT_LIST[0]].box.price) || 0;

  const [selected, setSelect] = useState(0);
  const handleAddToCart = () => {
    if (isLoading) return;

    const slug = PRODUCT_LIST[selected];
    setLoading(true);
    onAddToCart(slug, productBox);
  };

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    !isAddCartLoading && setLoading(false);
  }, [isAddCartLoading]);

  return (
    <div id="GROUP1273" className="ladi-element">
      <div className="ladi-group">
        <div id="GROUP1145" className="ladi-element">
          <div className="ladi-group">
            <div id="GROUP1129" className="ladi-element">
              <div className="ladi-group">
                <div id="GROUP1048" className="ladi-element">
                  <div className="ladi-group">
                    <div id="GROUP1130" className="ladi-element">
                      <div className="ladi-group">
                        <div id="GROUP578" className="ladi-element">
                          <div className="ladi-group">
                            <div id="BOX579" className="ladi-element">
                              <div className="ladi-box"></div>
                            </div>
                            <div id="HEADLINE580" className="ladi-element">
                              <h5 className="ladi-headline">
                                Máy Rửa Mặt Halio facial cleansing &amp; massaging device
                                <br />
                              </h5>
                            </div>
                            <div id="PARAGRAPH584" className="ladi-element">
                              <p className="ladi-paragraph">
                                <span style={{ fontWeight: 700 }}>{currenyFormat(price)}</span>
                                <br />
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="PARAGRAPH1047" className="ladi-element">
                          <p className="ladi-paragraph">
                            <span style={{ fontWeight: 700 }}>{currenyFormat(originalPrice)}</span>
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="GALLERY1128"
                  className="ladi-element"
                  data-max-item="5"
                  data-runtime-id="cJCitZtKLLtD"
                  data-current="3"
                  data-is-next="true"
                  data-scrolled="true"
                  data-loaded="true"
                  data-next-time="1623902167869"
                >
                  <div className="ladi-gallery ladi-gallery-bottom">
                    <div className="ladi-gallery-view">
                      <div
                        className={`ladi-gallery-view-item ${0 === selected && 'selected'}`}
                        data-index="0"
                        data-lazyload="true"
                      ></div>
                      <div className={`ladi-gallery-view-item ${1 === selected && 'selected'}`} data-index="1"></div>
                      <div className={`ladi-gallery-view-item ${2 === selected && 'selected'}`} data-index="2"></div>
                      <div className={`ladi-gallery-view-item ${3 === selected && 'selected'}`} data-index="3"></div>
                      <div className={`ladi-gallery-view-item ${4 === selected && 'selected'}`} data-index="4"></div>
                    </div>
                    <div className="ladi-gallery-control" style={{ height: 58 }}>
                      <div style={{ left: 0 }} className="ladi-gallery-control-box">
                        <div
                          style={{ width: 58, height: 58 }}
                          className={`ladi-gallery-control-item ${0 === selected && 'selected'}`}
                          onClick={() => setSelect(0)}
                          data-index="0"
                        ></div>
                        <div
                          style={{ width: 58, height: 58 }}
                          className={`ladi-gallery-control-item ${1 === selected && 'selected'}`}
                          onClick={() => setSelect(1)}
                          data-index="1"
                        ></div>
                        <div
                          style={{ width: 58, height: 58 }}
                          className={`ladi-gallery-control-item ${2 === selected && 'selected'}`}
                          onClick={() => setSelect(2)}
                          data-index="2"
                        ></div>
                        <div
                          style={{ width: 58, height: 58 }}
                          className={`ladi-gallery-control-item ${3 === selected && 'selected'}`}
                          onClick={() => setSelect(3)}
                          data-index="3"
                        ></div>
                        <div
                          style={{ width: 58, height: 58 }}
                          className={`ladi-gallery-control-item ${4 === selected && 'selected'}`}
                          onClick={() => setSelect(4)}
                          data-index="4"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-action="true" id="BUTTON1143" className="ladi-element ladi-animation">
              <div className="ladi-button">
                <div className="ladi-button-background"></div>
                <div onClick={handleAddToCart} id="BUTTON_TEXT1143" className="ladi-element">
                  <p className="ladi-headline">{isLoading ? 'Vui lòng chờ...' : 'ĐẶT MUA NGAY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="IMAGE1272" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotCool = ({ productData, onAddToCart, isAddCartLoading }) => {
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
    <div id="GROUP1275" className="ladi-element">
      <div className="ladi-group">
        <div id="IMAGE1270" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
        <div data-action="true" id="BUTTON1141" className="ladi-element ladi-animation">
          <div className="ladi-button">
            <div className="ladi-button-background"></div>
            <div onClick={handleAddToCart} id="BUTTON_TEXT1141" className="ladi-element">
              <p className="ladi-headline">{isLoading ? 'Vui lòng chờ...' : 'ĐẶT MUA NGAY'}</p>
            </div>
          </div>
        </div>
        <div id="GROUP666" className="ladi-element">
          <div className="ladi-group">
            <div id="BOX667" className="ladi-element">
              <div className="ladi-box"></div>
            </div>
            <div id="HEADLINE668" className="ladi-element">
              <h5 className="ladi-headline">
                Máy Đẩy Tinh Chất Dưỡng Trắng Nóng Lạnh Halio Ion Hot &amp; Cool Beauty Device
              </h5>
            </div>
            <div id="PARAGRAPH672" className="ladi-element">
              <p className="ladi-paragraph">
                <span style={{ fontWeight: 700 }}>{currenyFormat(price)}</span>
                <br />
              </p>
            </div>
          </div>
        </div>
        <div
          id="GALLERY1133"
          className="ladi-element"
          data-max-item="1"
          data-runtime-id="sDWexGGjHCFf"
          data-current="0"
          data-is-next="true"
          data-scrolled="true"
          data-loaded="true"
          data-next-time="1623902167874"
        >
          <div className="ladi-gallery ladi-gallery-bottom">
            <div className="ladi-gallery-view">
              <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-left ladi-hidden opacity-0"></div>
              <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-right ladi-hidden opacity-0"></div>
              <div className="ladi-gallery-view-item selected" data-index="0" data-lazyload="true"></div>
            </div>
            <div className="ladi-gallery-control">
              <div className="ladi-gallery-control-box" style={{ left: 0 }}>
                <div className="ladi-gallery-control-item selected" data-index="0"></div>
              </div>
              <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-left opacity-0"></div>
              <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-right opacity-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getEndTime = () => {
  const NOW = new Date().getTime();
  let endTime: any = localStorage.getItem(storageKey.HALIO_PRIVATE_COUNTDOWN_END_TIME);
  if (!endTime || NOW >= endTime * 1) {
    const ONE_HOUR_50_MINS = (1 * 60 * 60 + 50 * 60) * 1000;
    endTime = NOW + ONE_HOUR_50_MINS;
    localStorage.setItem(storageKey.HALIO_PRIVATE_COUNTDOWN_END_TIME, endTime);
  }

  return endTime;
};

const calcTime = ({ endTime }) => {
  const NOW = new Date().getTime();
  if (endTime <= NOW)
    return {
      h: '00',
      m: '00',
      s: '00'
    };

  const offset = (endTime - NOW) / 1000;
  const h = Math.floor(offset / 60 / 60);
  const m = Math.floor((offset - h * 60 * 60) / 60);
  const s = Math.floor(offset - h * 60 * 60 - m * 60);

  return { h, m, s };
};

const formatHour = (value) => (value <= 9 ? '0' + value : value);

const CountDown = () => {
  const init = () => {
    const endTime = getEndTime();
    setInterval(() => {
      const { h, m, s } = calcTime({ endTime });
      setTime({
        h: formatHour(h),
        m: formatHour(m),
        s: formatHour(s)
      });
    }, 1000);
  };

  useEffect(() => {
    init();
  }, []);

  const [time, setTime] = useState({
    h: '00',
    m: '00',
    s: '00'
  });

  return (
    <div
      id="COUNTDOWN1284"
      className="ladi-element"
      data-type="countdown"
      data-minute="79"
      data-date-start="0"
      data-date-end="1623902190811"
    >
      <div className="ladi-countdown">
        <div id="COUNTDOWN_ITEM1285" className="ladi-element" data-item-type="day">
          <div className="ladi-countdown-background"></div>
          <div className="ladi-countdown-text">
            <span></span>
          </div>
        </div>
        <div id="COUNTDOWN_ITEM1286" className="ladi-element" data-item-type="hour">
          <div className="ladi-countdown-background"></div>
          <div className="ladi-countdown-text">
            <span>{time.h}</span>
          </div>
        </div>
        <div id="COUNTDOWN_ITEM1287" className="ladi-element" data-item-type="minute">
          <div className="ladi-countdown-background"></div>
          <div className="ladi-countdown-text">
            <span>{time.m}</span>
          </div>
        </div>
        <div id="COUNTDOWN_ITEM1288" className="ladi-element" data-item-type="seconds">
          <div className="ladi-countdown-background"></div>
          <div className="ladi-countdown-text">
            <span>{time.s}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section4 = ({ productData, onAddToCart, isAddCartLoading }) => {
  return (
    <div id="SECTION571" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="HEADLINE572" className="ladi-element">
          <h3 className="ladi-headline">KHUYẾN MÃI</h3>
        </div>
        <div id="LINE574" className="ladi-element">
          <div className="ladi-line">
            <div className="ladi-line-container"></div>
          </div>
        </div>
        <Sensitive {...{ productData, onAddToCart, isAddCartLoading }} />
        <Original {...{ productData, onAddToCart, isAddCartLoading }} />
        <HotCool {...{ productData, onAddToCart, isAddCartLoading }} />
        <div id="GROUP1349" className="ladi-element">
          <div className="ladi-group">
            <CountDown />
            <div id="HEADLINE1289" className="ladi-element">
              <h3 className="ladi-headline">Thời gian khuyến mãi:</h3>
            </div>
            <div id="HEADLINE1290" className="ladi-element">
              <h3 className="ladi-headline">Giờ</h3>
            </div>
            <div id="HEADLINE1291" className="ladi-element">
              <h3 className="ladi-headline">Phút</h3>
            </div>
            <div id="HEADLINE1292" className="ladi-element">
              <h3 className="ladi-headline">Giây</h3>
            </div>
          </div>
        </div>
        <div id="LINE1317" className="ladi-element">
          <div className="ladi-line">
            <div className="ladi-line-container"></div>
          </div>
        </div>
        <div id="LINE1318" className="ladi-element">
          <div className="ladi-line">
            <div className="ladi-line-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
