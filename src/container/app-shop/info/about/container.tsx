import { PureComponent } from 'react';

import renderView from './view';
import { IProps } from './model';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

class InfoAboutContainer extends PureComponent<IProps, any> {
  componentDidMount() {
    // Set meta for SEO
    this.props.updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com`,
        type: 'article',
        title: 'Về Lixibox | About Us',
        description:
          'Lixibox là hệ thống thương mại điện tử giúp cho phụ nữ tiếp cận với sản phẩm chăm sóc sức khỏe và làm đẹp với sự tư vấn của cộng đồng các chuyên gia.',
        keyword:
          'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre, Lixibox GWP, GWP vietnam, gift with purchase, quà tặng kèm, GWP là gì?',
        image: CDN_ASSETS_PREFIX('/meta/cover.png')
      },
      structuredData: {
        breadcrumbList: []
      }
    });
  }

  render() {
    return renderView(this.props);
  }
}

export default InfoAboutContainer;
