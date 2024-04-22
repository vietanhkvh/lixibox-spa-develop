import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import Accordion from '../../../../presentation-component/ui/accordion';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import { isMobileVersion } from 'utils';

const IMG_1 = CDN_ASSETS_PREFIX('/return-policy/r01.png');
const IMG_2 = CDN_ASSETS_PREFIX('/return-policy/r02.png');
const IMG_3 = CDN_ASSETS_PREFIX('/return-policy/r03.png');
const IMG_4 = CDN_ASSETS_PREFIX('/return-policy/r04.png');
const IMG_PDF = CDN_ASSETS_PREFIX('/return-policy/return-policy.pdf');

const accordionProps = {
  data: [
    { id: 1, title: 'Chính sách đổi trả', content: () => <Image src={IMG_1} alt={'Chính sách đổi trả'} /> },
    { id: 2, title: 'Tình trạng đổi trả', content: () => <Image src={IMG_2} alt={'Tình trạng đổi trả'} /> },
    { id: 3, title: 'Quy trình nhận hàng', content: () => <Image src={IMG_3} alt={'Quy trình nhận hàng'} /> },
    {
      id: 4,
      title: 'Điều kiện đổi trả sản phẩm',
      content: () => <Image src={IMG_4} alt={'Điều kiện đổi trả sản phẩm'} />
    },
    {
      id: 5,
      title: 'Chính sách hoàn tiền',
      content: () => (
        <div>
          <p>
            Đối với những yêu cầu đổi trả hàng đủ điều kiện như Lixibox đã nêu, và thuộc trường hợp hoàn tiền (các
            trường hợp cụ thể sẽ được xem xét sau khi nhận yêu cầu đổi trả), Lixibox sẽ thực hiện hoàn tiền sau khi trừ
            phí dịch vụ vận chuyển theo phương thức sau:
          </p>
          <p>
            - Nếu khách hàng thanh toán trực tuyến, chúng tôi hoàn trả tiền theo hình thức chuyển khoản theo thông tin
            khách hàng cung cấp
          </p>
          <p>
            - Nếu khách hàng thanh toán bằng tiền mặt tại cửa hàng, đề nghị khách hàng đến cửa hàng để nhận tiền mặt
            (Nhân viên hỗ trợ sẽ liên hệ với khách hàng để đặt lịch hẹn).
          </p>
        </div>
      )
    }
  ],
  selectedIndex: 0
};

const renderDesktop = () => {
  return (
    <div className={'info-detail-container'}>
      <div
        className={classNames(
          'info-content',
          'return-policy',
          isMobileVersion() ? 'info-content_return-policy_mobile' : 'info-content_return-policy_desktop',
          isMobileVersion() ? 'info-content_img_mobile' : 'info-content_img_desktop'
        )}
      >
        <Accordion {...accordionProps} />
        <div className={'view-pdf-file'}>
          Khách hàng có thể vui lòng xem thông tin chi tiết nội dung{' '}
          <a href={IMG_PDF} target="_blank" rel="noreferrer" title={'Return Policy'}>
            tại đây
          </a>
        </div>
      </div>
    </div>
  );
};

export default renderDesktop;
