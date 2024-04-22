/* istanbul ignore next */
const Section25 = () => {
  return (
    <div id="SECTION_POPUP" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="POPUP_CART" className="ladi-element">
          <div className="ladi-popup">
            <div className="ladi-popup-background"></div>
            <div id="CART1053" className="ladi-element" data-height="60">
              <table className="ladi-cart">
                <tbody>
                  <tr>
                    <td className="ladi-cart-no-product">Giỏ hàng của bạn đang trống</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="HEADLINE1054" className="ladi-element">
              <h3 className="ladi-headline">GIỎ HÀNG CỦA BẠN</h3>
            </div>
            <div data-action="true" id="BUTTON1055" className="ladi-element">
              <div className="ladi-button">
                <div className="ladi-button-background"></div>
                <div id="BUTTON_TEXT1055" className="ladi-element">
                  <p className="ladi-headline">ĐẶT HÀNG NGAY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="POPUP_CHECKOUT" className="ladi-element">
          <div className="ladi-popup">
            <div className="ladi-popup-background"></div>
            <div id="HEADLINE1058" className="ladi-element">
              <h3 className="ladi-headline">HOÀN TẤT ĐƠN HÀNG</h3>
            </div>
            <div id="PARAGRAPH1059" className="ladi-element">
              <p className="ladi-paragraph">
                Vui lòng điền đầy đủ thông tin dưới đây để hoàn tất quá trình đặt hàng của bạn.
              </p>
            </div>
            <div id="BUTTON1060" className="ladi-element">
              <div className="ladi-button">
                <div className="ladi-button-background"></div>
                <div id="BUTTON_TEXT1060" className="ladi-element">
                  <p className="ladi-headline">HOÀN TẤT ĐƠN HÀNG</p>
                </div>
              </div>
            </div>
            <div id="HEADLINE1062" className="ladi-element">
              <h3 className="ladi-headline">Thông tin giao hàng</h3>
            </div>
            <div id="FORM1063" data-config-id="" className="ladi-element">
              <form autoComplete="off" method="post" className="ladi-form">
                <div id="BUTTON1064" className="ladi-element">
                  <div className="ladi-button">
                    <div className="ladi-button-background"></div>
                    <div id="BUTTON_TEXT1064" className="ladi-element">
                      <p className="ladi-headline">MUA NGAY</p>
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1066" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={7}
                        name="name"
                        required
                        className="ladi-form-control"
                        type="text"
                        placeholder="Họ và tên"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1067" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={9}
                        name="email"
                        required
                        className="ladi-form-control"
                        type="email"
                        placeholder="Email"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1068" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={8}
                        name="phone"
                        required
                        className="ladi-form-control"
                        type="tel"
                        placeholder="Số điện thoại"
                        pattern="(\+84|0){1}(9|8|7|5|3){1}[0-9]{8}"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1069" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={1}
                        name="address"
                        required
                        className="ladi-form-control"
                        type="text"
                        placeholder="Địa chỉ"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1070" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        data-is-select-country="true"
                        tabIndex={1}
                        type="hidden"
                        name="country"
                        value="VN:Việt Nam"
                      />
                      <select
                        tabIndex={1}
                        name="state"
                        className="ladi-form-control
                            ladi-form-control-select ladi-form-control-select-3"
                        data-selected=""
                        data-is-select-country="true"
                        data-country="VN"
                      >
                        <option value="">Tỉnh/thành</option>
                        <option value="201:Hà Nội">Hà Nội</option>
                        <option value="202:Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="203:Đà Nẵng">Đà Nẵng</option>
                        <option value="204:Đồng Nai">Đồng Nai</option>
                        <option value="205:Bình Dương">Bình Dương</option>
                        <option value="206:Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                        <option value="207:Gia Lai">Gia Lai</option>
                        <option value="208:Khánh Hòa">Khánh Hòa</option>
                        <option value="209:Lâm Đồng">Lâm Đồng</option>
                        <option value="210:Đắk Lắk">Đắk Lắk</option>
                        <option value="211:Long An">Long An</option>
                        <option value="212:Tiền Giang">Tiền Giang</option>
                        <option value="213:Bến Tre">Bến Tre</option>
                        <option value="214:Trà Vinh">Trà Vinh</option>
                        <option value="215:Vĩnh Long">Vĩnh Long</option>
                        <option value="216:Đồng Tháp">Đồng Tháp</option>
                        <option value="217:An Giang">An Giang</option>
                        <option value="218:Sóc Trăng">Sóc Trăng</option>
                        <option value="219:Kiên Giang">Kiên Giang</option>
                        <option value="220:Cần Thơ">Cần Thơ</option>
                        <option value="221:Vĩnh Phúc">Vĩnh Phúc</option>
                        <option value="223:Thừa Thiên - Huế">Thừa Thiên - Huế</option>
                        <option value="224:Hải Phòng">Hải Phòng</option>
                        <option value="225:Hải Dương">Hải Dương</option>
                        <option value="226:Thái Bình">Thái Bình</option>
                        <option value="227:Hà Giang">Hà Giang</option>
                        <option value="228:Tuyên Quang">Tuyên Quang</option>
                        <option value="229:Phú Thọ">Phú Thọ</option>
                        <option value="230:Quảng Ninh">Quảng Ninh</option>
                        <option value="231:Nam Định">Nam Định</option>
                        <option value="232:Hà Nam">Hà Nam</option>
                        <option value="233:Ninh Bình">Ninh Bình</option>
                        <option value="234:Thanh Hóa">Thanh Hóa</option>
                        <option value="235:Nghệ An">Nghệ An</option>
                        <option value="236:Hà Tĩnh">Hà Tĩnh</option>
                        <option value="237:Quảng Bình">Quảng Bình</option>
                        <option value="238:Quảng Trị">Quảng Trị</option>
                        <option value="239:Bình Phước">Bình Phước</option>
                        <option value="240:Tây Ninh">Tây Ninh</option>
                        <option value="241:Đắk Nông">Đắk Nông</option>
                        <option value="242:Quảng Ngãi">Quảng Ngãi</option>
                        <option value="243:Quảng Nam">Quảng Nam</option>
                        <option value="244:Thái Nguyên">Thái Nguyên</option>
                        <option value="245:Bắc Kạn">Bắc Kạn</option>
                        <option value="246:Cao Bằng">Cao Bằng</option>
                        <option value="247:Lạng Sơn">Lạng Sơn</option>
                        <option value="248:Bắc Giang">Bắc Giang</option>
                        <option value="249:Bắc Ninh">Bắc Ninh</option>
                        <option value="250:Hậu Giang">Hậu Giang</option>
                        <option value="252:Cà Mau">Cà Mau</option>
                        <option value="253:Bạc Liêu">Bạc Liêu</option>
                        <option value="257:Đồng Tháp">Đồng Tháp</option>
                        <option value="258:Bình Thuận">Bình Thuận</option>
                        <option value="259:Kon Tum">Kon Tum</option>
                        <option value="260:Phú Yên">Phú Yên</option>
                        <option value="261:Ninh Thuận">Ninh Thuận</option>
                        <option value="262:Bình Định">Bình Định</option>
                        <option value="263:Yên Bái">Yên Bái</option>
                        <option value="264:Lai Châu">Lai Châu</option>
                        <option value="265:Điện Biên">Điện Biên</option>
                        <option value="266:Sơn La">Sơn La</option>
                        <option value="267:Hòa Bình">Hòa Bình</option>
                        <option value="268:Hưng Yên">Hưng Yên</option>
                        <option value="269:Lào Cai">Lào Cai</option>
                      </select>
                      <select
                        tabIndex={1}
                        name="district"
                        className="ladi-form-control ladi-form-control-select ladi-form-control-select-3"
                        data-selected=""
                        data-is-select-country="true"
                      >
                        <option value="">Quận/huyện</option>
                      </select>
                      <select
                        tabIndex={1}
                        name="ward"
                        className="ladi-form-control ladi-form-control-select ladi-form-control-select-3"
                        data-selected=""
                        data-is-select-country="true"
                      >
                        <option value="">Phường/xã</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1071" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={1}
                        name="coupon"
                        className="ladi-form-control"
                        type="text"
                        placeholder="Mã giảm giá"
                        value=""
                        data-replace-coupon="true"
                      />
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1072" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <textarea
                        autoComplete="off"
                        tabIndex={1}
                        name="message"
                        className="ladi-form-control"
                        placeholder="Để lại lời nhắn cho chúng tôi"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button type="submit" className="ladi-hidden"></button>
              </form>
            </div>
            <div id="PARAGRAPH1073" className="ladi-element">
              <p className="ladi-paragraph">Vui lòng nhập đầy đủ thông tin địa chỉ để nhận hàng nhanh hơn!</p>
            </div>
            <div id="HEADLINE1074" className="ladi-element">
              <h3 className="ladi-headline">Thông tin sản phẩm</h3>
            </div>
            <div id="CART1075" className="ladi-element" data-height="60">
              <table className="ladi-cart">
                <tbody>
                  <tr>
                    <td className="ladi-cart-no-product">Giỏ hàng của bạn đang trống</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="HEADLINE1076" className="ladi-element">
              <h3 className="ladi-headline">Thông tin đơn hàng</h3>
            </div>
            <div id="HEADLINE1077" className="ladi-element">
              <h3 className="ladi-headline">
                Tạm tính (<span data-replace-str="!::cart_quantity::!">0</span> sản phẩm)
              </h3>
            </div>
            <div id="HEADLINE1078" className="ladi-element">
              <h3 className="ladi-headline">
                <span data-replace-str="!::cart_price::!">0</span>
              </h3>
            </div>
            <div id="HEADLINE1079" className="ladi-element">
              <h3 className="ladi-headline">Tổng cộng</h3>
            </div>
            <div id="HEADLINE1080" className="ladi-element">
              <h3 className="ladi-headline">
                <span data-replace-str="!::cart_checkout_price::!">0</span>
              </h3>
            </div>
            <div id="HEADLINE1081" className="ladi-element">
              <h3 className="ladi-headline">Đã bao gồm VAT (nếu có)</h3>
            </div>
            <div id="HEADLINE1082" className="ladi-element">
              <h3 className="ladi-headline">Giảm giá</h3>
            </div>
            <div id="HEADLINE1083" className="ladi-element">
              <h3 className="ladi-headline">
                <span data-replace-str="!::cart_discount::!">0</span>
              </h3>
            </div>
            <div id="FORM1084" data-config-id="" className="ladi-element">
              <form autoComplete="off" method="post" className="ladi-form">
                <div id="BUTTON1085" className="ladi-element" data-submit-form-id="FORM1063">
                  <div className="ladi-button">
                    <div className="ladi-button-background"></div>
                    <div id="BUTTON_TEXT1085" className="ladi-element">
                      <p className="ladi-headline">Sử dụng</p>
                    </div>
                  </div>
                </div>
                <div id="FORM_ITEM1087" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <input
                        autoComplete="off"
                        tabIndex={1}
                        name="coupon"
                        className="ladi-form-control"
                        type="text"
                        placeholder="Mã giảm giá"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="ladi-hidden"></button>
              </form>
            </div>
            <div id="HEADLINE1088" className="ladi-element">
              <h3 className="ladi-headline">Phí giao hàng</h3>
            </div>
            <div id="HEADLINE1089" className="ladi-element">
              <h3 className="ladi-headline">
                <span data-replace-str="!::cart_fee_shipping::!">0</span>
              </h3>
            </div>
            <div id="HEADLINE1090" className="ladi-element">
              <h3 className="ladi-headline">Giao hàng</h3>
            </div>
            <div id="COMBOBOX1091" className="ladi-element">
              <div className="ladi-combobox">
                <div className="ladi-combobox-item-container">
                  <div className="ladi-combobox-item-background"></div>
                  <div className="ladi-combobox-item">
                    <select
                      data-selected=""
                      data-combobox-type="delivery_method"
                      className="ladi-combobox-control"
                      data-event="true"
                      data-placeholder="Chọn phương thức giao hàng"
                    >
                      <option>Chọn phương thức giao hàng</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="POPUP_PRODUCT" className="ladi-element">
          <div className="ladi-popup">
            <div className="ladi-popup-background"></div>
            <div
              id="GALLERY1094"
              className="ladi-element"
              data-max-item="5"
              data-runtime-id="JKinrRyEqdaV"
              data-current="3"
              data-is-next="true"
              data-scrolled="true"
              data-next-time="1623902167868"
            >
              <div className="ladi-gallery ladi-gallery-bottom">
                <div className="ladi-gallery-view">
                  <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-left"></div>
                  <div className="ladi-gallery-view-arrow ladi-gallery-view-arrow-right"></div>
                  <div className="ladi-gallery-view-item" data-index="0"></div>
                  <div className="ladi-gallery-view-item" data-index="1"></div>
                  <div className="ladi-gallery-view-item" data-index="2"></div>
                  <div className="ladi-gallery-view-item selected" data-index="3"></div>
                  <div className="ladi-gallery-view-item" data-index="4"></div>
                </div>
                <div className="ladi-gallery-control">
                  <div className="ladi-gallery-control-box" style={{ left: 0 }}>
                    <div className="ladi-gallery-control-item" data-index="0"></div>
                    <div className="ladi-gallery-control-item" data-index="1"></div>
                    <div className="ladi-gallery-control-item" data-index="2"></div>
                    <div className="ladi-gallery-control-item selected" data-index="3"></div>
                    <div className="ladi-gallery-control-item" data-index="4"></div>
                  </div>
                  <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-left opacity-0"></div>
                  <div className="ladi-gallery-control-arrow ladi-gallery-control-arrow-right opacity-0"></div>
                </div>
              </div>
            </div>
            <div id="HEADLINE1095" className="ladi-element">
              <h3 className="ladi-headline">
                Ví Phối Màu
                <br />
              </h3>
            </div>
            <div id="HEADLINE1096" className="ladi-element">
              <h3 className="ladi-headline">10.000.000đ</h3>
            </div>
            <div id="CART_BUTTON1097" data-config-id="" className="ladi-element">
              <form autoComplete="off" method="post" className="ladi-form">
                <div data-action="true" data-buy-now="true" id="BUTTON1098" className="ladi-element" data-click="false">
                  <div className="ladi-button">
                    <div className="ladi-button-background"></div>
                    <div id="BUTTON_TEXT1098" className="ladi-element">
                      <p className="ladi-headline">MUA NGAY</p>
                    </div>
                  </div>
                </div>
                <div data-quantity="true" id="QUANTITY1100" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item ladi-form-quantity">
                      <button type="button">
                        <span>-</span>
                      </button>
                      <input
                        autoComplete="off"
                        tabIndex={1}
                        name="quantity"
                        required
                        className="ladi-form-control"
                        type="number"
                        placeholder="Số lượng"
                        min="1"
                        value="1"
                      />
                      <button type="button">
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div data-variant="true" id="VARIANT1101" className="ladi-element">
                  <div className="ladi-form-item-container">
                    <div className="ladi-form-item-background"></div>
                    <div className="ladi-form-item">
                      <select
                        data-product-id="undefined"
                        required
                        tabIndex={1}
                        className="ladi-form-control ladi-form-control-select"
                        data-selected=""
                      >
                        <option value="0" data-product-variant-id="undefined">
                          Product Variant - 9,999 đ
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  data-action="true"
                  data-add-to-cart="true"
                  id="BUTTON_ADD_TO_CART1102"
                  className="ladi-element"
                  data-click="false"
                >
                  <div className="ladi-button">
                    <div className="ladi-button-background"></div>
                    <div id="BUTTON_TEXT1102" className="ladi-element">
                      <p className="ladi-headline">CHỌN MUA</p>
                    </div>
                  </div>
                </div>
                <button type="submit" className="ladi-hidden"></button>
              </form>
            </div>
            <div id="HEADLINE1104" className="ladi-element">
              <h3 className="ladi-headline">1.000.000đ</h3>
            </div>
            <div id="LIST_PARAGRAPH1105" className="ladi-element">
              <div className="ladi-list-paragraph">
                <ul>
                  <li className="">Miễn phí giao hàng toàn quốc</li>
                  <li className="">Đổi trả hàng dễ dàng: Đổi trả trong vòng 7 ngày</li>
                  <li className="">Thanh toán linh hoạt: COD, Momo, Chuyển khoản...</li>
                  <li className="">Tổng đài hỗ trợ bán hàng: 099999999x</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section25;
