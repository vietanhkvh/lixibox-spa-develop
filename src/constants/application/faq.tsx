import classNames from 'classnames';
import { MembershipLevel } from 'flows/lixicoin/types';
import AdLink from 'presentation-component/ui/ad-link';
import { CollapsibleItemTemplate } from 'presentation-component/ui/collapsible-list';
import { ROUTING_BALANCE } from 'routings/path';

export const CollapsibleTemplateCashbackFaq: ReadonlyArray<
  CollapsibleItemTemplate<{ membershipLevels: MembershipLevel[] }>
> = Object.freeze([
  {
    id: 0,
    title: 'Chương trình "Hoàn tiền" hoạt động như thế nào?',
    html: ({ classes, membershipLevels }) => {
      const cashbackPercentageByMembershipLevel = {
        silver: membershipLevels?.[1]?.benefits?.cashback_percentage || 0,
        gold: membershipLevels?.[2]?.benefits?.cashback_percentage || 0,
        diamond: membershipLevels?.[3]?.benefits?.cashback_percentage || 0
      };
      const shouldShowCashbackPercentage = Object.values(cashbackPercentageByMembershipLevel).some(
        (percentage) => percentage > 0
      );
      console.log(shouldShowCashbackPercentage);

      return (
        <div className={classNames(classes?.container)}>
          <ol>
            <li>
              <strong>Mua đơn hàng tại Lixibox để nhận Hoàn tiền</strong>
              {shouldShowCashbackPercentage && (
                <div>
                  <p>Số tiền hoàn sẽ phụ thuộc vào hạng thành viên, hạng càng cao, số dư tích luỹ càng nhiều:</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Hạng thành viên</th>
                        <th style={{ width: 70 }}>Member & Silver</th>
                        <th style={{ width: 70 }}>Gold</th>
                        <th style={{ width: 70 }}>Diamond</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hoàn tiền nhận được trên mỗi đơn hàng</td>
                        <td>{cashbackPercentageByMembershipLevel.silver}%</td>
                        <td>{cashbackPercentageByMembershipLevel.gold}%</td>
                        <td>{cashbackPercentageByMembershipLevel.diamond}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </li>
            <li>
              <strong>Nhận Hoàn Tiền</strong>
              <p>Số dư Hoàn Tiền sẽ được chuyển vào tài khoản Lixibox của bạn sau khi đơn hàng được Giao thành công.</p>
            </li>
            <li>
              <strong>Sử dụng số dư Hoàn Tiền</strong>
              <p>
                Bật nút “Dùng số dư” tại bước thanh toán ở những đơn hàng tiếp theo để sử dụng. Bạn có thể dùng số dư
                hoàn tiền để được giảm trực tiếp đến 30% trên giá trị đơn hàng tiếp theo.
              </p>
            </li>
          </ol>
        </div>
      );
    }
  },
  {
    id: 1,
    title: 'Tôi sẽ được nhận Tiền Hoàn vào thời điểm nào và cách để kiểm tra số dư hiện có?',
    content: [
      'Bạn sẽ nhận được tiền hoàn vào ví tài khoản Lixibox ngay khi đơn hàng giao thành công. Trong mục Tài khoản,  bạn sẽ nhìn thấy số dư ví và ngày hết hạn.'
    ]
  },
  {
    id: 2,
    title: 'Tiền hoàn từ chương trình Hoàn tiền có hạn sử dụng không? Nếu có thì được tính như thế nào?',
    content: [
      'Số tiền hoàn lại được sẽ có hiệu lực trong vòng 60 ngày kể từ ngày số tiền đó được ghi nhận vào ví Lixibox của bạn. Ngoài ra, thời hạn sử dụng hoàn tiền sẽ tăng thêm sau mỗi đơn hàng giao thành công.'
    ]
  },
  {
    id: 3,
    title: 'Cách để sử dụng tiền hoàn?',
    html: ({ classes }) => (
      <div className={classNames(classes?.container)}>
        <p>Bạn có thể sử dụng trực tiếp tiền hoàn để được giảm giá khi mua hàng.</p>
        <p>
          Bật nút "<AdLink to={ROUTING_BALANCE}>Dùng số dư</AdLink>" để sử dụng.
        </p>
      </div>
    )
  },
  {
    id: 4,
    title:
      'Trường hợp sản phẩm của tôi có phát sinh trả hàng, tôi có thể nhận lại được số dư hoàn tiền tôi đã áp dụng cho đơn hàng không?',
    html: ({ classes }) => (
      <div className={classNames(classes?.container)}>
        <ul>
          <li>
            <strong>Đơn hàng bị hủy:</strong>
            <ul>
              <li>
                Hủy toàn bộ đơn hàng: Số dư hoàn tiền đã sử dụng cho đơn hàng đó sẽ được tự động hoàn lại vào ví của bạn
                (nếu còn hạn sử dụng).
              </li>
              <li>
                Hủy 1 phần đơn hàng: Số dư hoàn tiền đã sử dụng cho 1 phần đơn hàng bị hủy sẽ được tự động hoàn lại vào
                ví của bạn (nếu còn hạn sử dụng).
              </li>
            </ul>
          </li>
          <li>
            <strong>Đơn hàng trả hàng (hoàn tiền thành công):</strong>
            <ul>
              <li>
                <div>Đơn trả hàng chưa bấm nút xác nhận:</div>
                <ul>
                  <li>Số dư hoàn tiền đã sử dụng cho đơn hàng sẽ được tự động hoàn lại.</li>
                  <li>Số dư hoàn tiền tích lũy từ đơn hàng đó bạn sẽ không được nhận.</li>
                </ul>
              </li>
              <li>
                <div>Đơn trả hàng đã bấm nút xác nhận:</div>
                <ul>
                  <li>Số dư hoàn tiền đã sử dụng cho đơn hàng sẽ được tự động hoàn lại.</li>
                  <li>Số dư hoàn tiền tích lũy từ đơn hàng đó bạn sẽ không được nhận.</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: 'Trong mọi trường hợp hủy đơn hàng, tôi có được hoàn lại số dư hoàn tiền không?',
    content: [
      'Trong mọi trường hợp hủy đơn hàng hoặc trả hàng, bạn sẽ được hoàn lại số dư hoàn tiền với hạn sử dụng mới là 60 ngày. Bạn có thể sử dụng số dư này để thanh toán cho những đơn hàng tiếp theo.'
    ]
  }
]);

export const CollapsibleTemplateGwpFaq: ReadonlyArray<CollapsibleItemTemplate> = Object.freeze([
  {
    id: 0,
    title: 'GWP là gì?',
    content: [
      'GWP hiểu đơn giản là quà tặng kèm khi mua sắm. Hiện tại, chương trình này được áp dụng nhiều nhất trong ngành mỹ phẩm với hình thức phổ biến là mua full size tặng minisize. Ở nước ngoài, hàng loạt trang bán lẻ nổi tiếng như Nordstrom, Bloomingdales, Fabfitfun, Cult Cosmetic… đều ứng dụng hình thức này và thu về một lượng lớn khách hàng trung thành nhờ mang đến sự an tâm về sản phẩm chính hãng lẫn cảm giác “hời” khi mua sắm.'
    ]
  },
  {
    id: 1,
    title: 'Lợi ích của GWP',
    html: ({ classes }) => (
      <div className={classNames(classes?.container)}>
        <ul className={classes.ulTick}>
          <li>Tiết kiệm khi mua sắm</li>
          <li>Tránh mua nhầm sản phẩm không phù hợp</li>
          <li>Mang đến sự hứng thú cho người nhận</li>
          <li>Trải nghiệm các sản phẩm mới</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: 'GWP Lixibox',
    content: [
      'Hiện tại, ở Việt Nam có khá nhiều thương hiệu mỹ phẩm đã áp dụng hình thức GWP như Laneige, Innisfree, Curel, Eucerin… Tuy nhiên, hầu như có rất ít cửa hàng mỹ phẩm áp dụng hình thức GWP cho tất cả các mặt hàng. Trong đó, Lixibox là một trong những cái tên hiếm hoi đi theo "con đường" GWP từ khi mới ra mắt.'
    ]
  }
]);
