// import { NavLink } from 'react-router-dom';

// import { ROUTING_LIXI_COIN, ROUTING_REDEEM_PATH } from '../../../../routings/path';

import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { IProps, IState } from './model';
import STYLE from './style';

export const DEFAULT_PROPS = {} as IProps;

export const INITIAL_STATE = {
  collapseOpenId: [1]
} as IState;
export const FAQ_LIST_LIXICOIN = ({ lixicoinPerFeedback, unboxingReward, referralReward }) => [
  {
    id: 1,
    title: 'Lixicoin là gì? ',
    content: [
      'Lixicoin là số điểm tích lũy từ mỗi lần mua hàng trên website/app Lixibox. ',
      'Giá trị của Lixicoin: 1 Lixicoin = 1.000 VNĐ.',
      'Số Lixicoin sẽ được cộng vào tài khoản Lixibox của bạn mỗi khi đơn hàng của bạn được giao thành công.'
    ]
  },

  {
    id: 2,
    title: 'Hướng dẫn tích lũy Lixicoin',
    html: () => (
      <div style={STYLE.faq.item.contentItem}>
        <div>Cách 1:THAM GIA MUA HÀNG</div>
        <div>
          Nhận 1 Lixicoin cho mỗi 1.000 VNĐ khi mua hàng. Với mỗi hạng thành viên, bạn sẽ có đặc quyền nhận nhiều
          Lixicoin hơn khi mua hàng.
        </div>
        {!!unboxingReward && !!referralReward && !!lixicoinPerFeedback && (
          <>
            <div>Cách 2: CHIA SẺ LINK ĐẬP HỘP</div>
            <div>
              Nhận{' '}
              {unboxingReward?.coins
                ? `${formatCurrency(unboxingReward?.coins, { suffix: CustomCurrencyType.LIXICOIN })} `
                : ''}
              {unboxingReward?.coins && unboxingReward?.balance ? '+ ' : ''}
              {unboxingReward?.balance ? `${formatCurrency(unboxingReward.balance)} VNĐ ` : ''}khi tham gia thử thách
              Lixibox Unboxing - chia sẻ hình ảnh, video đập hộp lên Lixibox Feed. Xem thêm tại:{' '}
              <a style={STYLE.faq.item.contentLinkItem} href="https://www.lixibox.com/community/unboxing/feedbacks/new">
                https://www.lixibox.com/community/unboxing/feedbacks/new
              </a>
            </div>
            <div>Cách 3: GIỚI THIỆU BẠN BÈ</div>
            <div>
              Nhận{' '}
              {referralReward?.coins
                ? `${formatCurrency(referralReward?.coins, { suffix: CustomCurrencyType.LIXICOIN })} `
                : ''}
              {referralReward?.coins && referralReward?.balance ? '+ ' : ''}
              {referralReward?.balance ? `${formatCurrency(referralReward.balance)} VNĐ ` : ''}cho mỗi đơn hàng giới
              thiệu thành công. Xem thêm tại:
              <a style={STYLE.faq.item.contentLinkItem} href="https://www.lixibox.com/user/invite">
                https://www.lixibox.com/user/invite
              </a>
            </div>
            <div>
              <div>Cách 4: ĐÁNH GIÁ SẢN PHẨM</div>
              <div>
                Nhận {lixicoinPerFeedback} Lixicoin cho mỗi đánh giá sản phẩm đã mua. Xem thêm tại:
                <a style={STYLE.faq.item.contentLinkItem} href="https://www.lixibox.com/community/feedbacks/to-submit">
                  https://www.lixibox.com/community/feedbacks/to-submit
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    )
  },
  {
    id: 3,
    title: 'Làm thế nào để có thể đổi Lixicoin?',
    html: () => (
      <div style={STYLE.faq.item.contentItem}>
        <div>Các bước đổi như sau: </div>
        <div>Bước 1: Tích luỹ Lixicoin ở các đơn hàng trước.</div>
        <div>
          Bước 2: Tại{' '}
          <a style={STYLE.faq.item.contentLinkItem} href="https://www.lixibox.com/redeem/latest">
            https://www.lixibox.com/redeem/latest
          </a>
          , chọn quà và thêm vào giỏ hàng món quà bạn muốn đổi tương ứng số Lixicoin quy định.
        </div>
        <div>Bước 3: Mua đơn hàng với giá trị từ 1.000 VNĐ để đổi quà.</div>
        <div>Sau khi đổi, số lượng Lixicoin của bạn sẽ giảm đi theo số lượng coin tương ứng với sản phẩm.</div>
        <div>Cấp độ thành viên vẫn được giữ nguyên như trước khi đổi sản phẩm.</div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Số lượng sản phẩm có thể đổi bằng Lixicoin có giới hạn không?',
    content: [
      'Với mỗi đơn hàng có thể đổi được nhiều sản phẩm khác nhau, tùy thuộc vào số lượng Lixicoin đã tích luỹ được.',
      'Tuy nhiên mỗi sản phẩm trong danh sách đổi Lixicoin chỉ được đổi 1 lần/đơn hàng do số lượng có hạn.',
      'Vì thế, để đổi một sản phẩm với số lượng từ 2 món, bạn phải phát sinh từ 2 đơn hàng trở lên. ',
      'Số lượng sản phẩm đổi có giới hạn, nên hệ thống sẽ ưu tiên cho các khách hàng đổi sản phẩm sớm hơn.'
    ]
  },
  {
    id: 5,
    title: 'Lixicoin có hạn sử dụng không? Nếu có thì được tính như thế nào?',

    content: [
      'Ngày hết hạn của Lixicoin là ngày cuối cùng (30 hoặc 31) của tháng thứ 12 tính từ lần mua hàng cuối cùng. Theo đó, chỉ cần bạn có 1 đơn hàng bất kỳ trong vòng 12 tháng tính từ lần mua hàng gần nhất, Lixicoin của bạn sẽ thêm hạn sử dụng 1 năm.',
      'Ví dụ: lần mua hàng gần nhất của bạn là ngày 22/06/2022, tổng điểm thưởng Lixicoin của bạn sẽ hết hạn vào ngày 30/06/2023.'
    ]
  },
  {
    id: 6,
    title: 'Có phải tất cả giao dịch trên ứng dụng Lixibox đều được xét gia hạn điểm thưởng Lixicoin?',
    content: [
      'Tất cả giao dịch phát sinh đơn hàng tại Lixibox (website, mobile app, cửa hàng) đều sẽ nhận được Lixicoin và gia hạn Lixicoin. Các hoạt động còn lại như chơi game, đập hộp chia sẻ ở mạng xã hội… chỉ được tính để tích luỹ điểm Lixicoin, không được tính để gia hạn Lixicoin.'
    ]
  },
  {
    id: 7,
    title: 'Tôi có thể chuyển nhượng Lixicoin của tôi cho người khác được không?',
    content: ['Rất tiếc là bạn không thể chuyển nhượng Lixicoin của bạn cho người khác.']
  },
  {
    id: 8,
    title: 'Số Lixicoin tối đa tôi có thể tích luỹ và sử dụng là bao nhiêu?',
    content: [
      'Hiện tại, Lixicoin không có giới hạn số điểm tối đa. Bạn hãy cố gắng tích luỹ thật nhiều Lixicoin để đổi thật nhiều quà giá trị từ Lixibox nhé. '
    ]
  },
  {
    id: 9,
    title: 'Tôi có thể liên hệ ở đâu biết thêm thông tin hoặc giải quyết vấn đề phát sinh?',
    html: () => (
      <div style={STYLE.faq.item.contentItem}>
        <div>Mọi thắc mắc, khiếu nại, hỗ trợ thông tin về chương trình Lixicoin, vui lòng liên hệ:</div>
        <div>Hotline 18002040</div>
        <div>
          Gửi tin nhắn vào Fanpage Facebook tại{' '}
          <a
            target="_blank"
            style={STYLE.faq.item.contentLinkItem}
            href="https://facebook.com/lixiboxvn"
            rel="noreferrer"
          >
            https://facebook.com/lixiboxvn
          </a>
        </div>
        <div>
          Email:{' '}
          <a style={STYLE.faq.item.contentLinkItem} href="mailto:info@lixibox.com">
            info@lixibox.com
          </a>
        </div>
      </div>
    )
  }
];
export const FAQ_LIST_MEMBERSHIP = [
  {
    id: 21,
    title: 'Điểm thành viên là gì?',
    content: [
      'Điểm thành viên là điểm được tích luỹ thông qua hoạt động mua hàng trên website, app & cửa hàng Lixibox',
      'Điểm thành viên là căn cứ để nâng hạng thành viên Bạc(Silver) - Vàng(Gold) - Kim cương(Diamond), để tận hưởng những ưu đãi độc quyền của từng bậc thành viên.',
      'Giá trị của Điểm thành viên: 1 điểm = 1.000 VNĐ',
      'Điểm thành viên sẽ được cộng vào tài khoản Lixibox của bạn mỗi khi đơn hàng của bạn được giao thành công.'
    ]
  },

  {
    id: 22,
    title: 'Điểm thành viên khác điểm Lixicoin như thế nào?',
    content: [
      'Đây là hai hệ thống điểm khác nhau ở cách tích luỹ, cách sử dụng và hạn sử dụng:',
      'Điểm thành viên chỉ có thể được tích lũy bằng hoạt động mua hàng. Điểm thành viên sẽ được thiết lập lại về 0 điểm vào ngày 31/12 hàng năm.',
      'Điểm Lixicoin được tích lũy bằng hoạt động mua hàng, đập hộp chia sẻ trên mạng xã hội, review sản phẩm trên web/app Lixibox, chơi game,... Điểm Lixicoin dùng để đổi quà, và có hạn sử dụng 12 tháng tính từ lần mua hàng gần nhất.'
    ]
  },
  {
    id: 23,
    title: 'Quyền lợi từng hạng thành viên như thế nào?',
    img: {
      src: 'https://lixibox-production-uploads.s3.ap-southeast-1.amazonaws.com/frontend/image-assets/lixicoin/info-data.png'
    }
  },
  {
    id: 24,
    title: 'Hạng thành viên của tôi có thể bị giảm không? ',
    content: [
      '- Hạng thành viên của bạn có thể bị giảm vào ngày 1/1 hàng năm nếu trong năm trước đó, bạn không tích luỹ đủ số điểm thành viên tương ứng.',
      '- Cụ thể có hai khái niệm “hạng thành viên" và “điểm thành viên":',
      '+ Vào ngày 31/12 hàng năm, số điểm thành viên sẽ được thiết lập lại về 0 điểm để bạn bắt đầu tích luỹ lại điểm thành viên cho năm tiếp theo.',
      '+ Vào ngày 1/1 hàng năm, hạng thành viên ở năm mới này phụ thuộc vào số điểm thành viên bạn đã tích luỹ trong năm trước.',
      '- Ví dụ trường hợp một thành viên mua hàng trong 3 năm 2021 - 2023:',
      '+ Trong năm 2021 bạn đã tích luỹ đủ 15.000 điểm thành viên và đã lên hạng Kim Cương.',
      '+ Đến ngày 1/1/2022, điểm thành viên của bạn sẽ về 0, và bạn vẫn là thành viên kim cương vì số điểm tích luỹ trong năm 2021 đã đủ để đạt hạng kim cương.',
      '+ Trong năm 2022, giả sử bạn tiếp tục mua hàng và tích luỹ được 1,000 điểm thành viên. Đến ngày 1/1/2023, điểm thành viên của bạn sẽ 0, và hạng thành viên từ kim cương sẽ giảm còn thành viên bạc vì 1000 điểm thành viên bạn tích luỹ trong năm 2022 chỉ đủ mức thành viên bạc. Bạn sẽ phải mua hàng tích luỹ thêm điểm thành viên để nâng hạng trong năm 2023.  '
    ]
  },
  {
    id: 25,
    title: 'Nếu tôi bị giảm hạng thành viên thì những ưu đãi của tôi sẽ bị ảnh hưởng như thế nào?',
    content: [
      '- Nếu bị giảm hạng thành viên, bạn sẽ không còn được tận hưởng các ưu đãi dành riêng cho hạng thành viên cao hơn trước đó của bạn. ',
      '- Tuy nhiên, bạn vẫn có thể sử dụng điểm thưởng Lixicoin để đổi quà. Điểm thưởng Lixicoin là hệ thống điểm tách biệt với điểm thành viên.'
    ]
  },
  // {
  //   id: 6,
  //   title: 'Tôi có thể tìm thấy những ưu đãi đặc biệt dành riêng cho mình ở đâu?',

  //   html: () => (
  //     <>
  //       <div style={STYLE.faq.item.contentItem}>
  //         {`- Chi tiết ưu đãi dành cho các hạng thành viên được liệt kê tại `}
  //         <NavLink style={STYLE.faq.item.contentLinkItem} to={ROUTING_LIXI_COIN}>
  //           Trang chi tiết Lixicoin
  //         </NavLink>
  //       </div>
  //       <div style={STYLE.faq.item.contentItem}>
  //         {`- Các ưu đãi và quà tặng có thể đổi bằng điểm thưởng Lixicoin luôn được cập nhật tại `}
  //         <NavLink style={STYLE.faq.item.contentLinkItem} to={ROUTING_REDEEM_PATH}>
  //           Trang Redeem trên web
  //         </NavLink>
  //         {`hoặc trang  Redeem trong app Lixibox của bạn. Thường xuyên vào trang Redeem để không bỏ lỡ cơ hội tận hưởng những ưu đãi đặc biệt này nhé.`}
  //       </div>
  //     </>
  //   )
  // },
  {
    id: 26,
    title: 'Tôi có thể chuyển nhượng hạng thành viên và các ưu đãi của tôi cho người khác được không?',
    content: ['Rất tiếc là bạn không thể chuyển nhượng hạng thành viên của bạn cho người khác.']
  },
  {
    id: 27,
    title: 'Tôi có thể liên hệ ở đâu biết thêm thông tin hoặc giải quyết vấn đề phát sinh?',
    content: ['', '', '', ''],
    html: () => (
      <div style={STYLE.faq.item.contentItem}>
        <div>Mọi thắc mắc, khiếu nại, hỗ trợ thông tin về chương trình Lixicoin, vui lòng liên hệ:</div>
        <div>
          Hotline{' '}
          <a style={STYLE.faq.item.contentLinkItem} href="tel:18002040">
            18002040
          </a>
        </div>
        <div>
          Gửi tin nhắn vào Fanpage Facebook tại{' '}
          <a
            target="_blank"
            style={STYLE.faq.item.contentLinkItem}
            href="https://facebook.com/lixiboxvn"
            rel="noreferrer"
          >
            https://facebook.com/lixiboxvn
          </a>
        </div>
        <div>
          Email:{' '}
          <a style={STYLE.faq.item.contentLinkItem} href="mailto:info@lixibox.com">
            info@lixibox.com
          </a>
        </div>
      </div>
    )
  }
];
