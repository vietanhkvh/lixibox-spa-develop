import { PureComponent } from 'react';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

import renderView from './view';
import { IProps } from './model';
import { INITIAL_STATE, infoList, suggestionSearchList } from './initialize';

class DashboardContainer extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSearchOnChange(e) {
    if (' ' === e.target.value || 0 === e.target.value.length) {
      this.setState({
        searchKeyWord: '',
        searchList: []
      });
      return;
    }

    const txtSearch = e.target.value.toLowerCase().trim();
    const searchList = suggestionSearchList.filter(
      (item) => item.search.includes(txtSearch) || item.searchVn.includes(txtSearch)
    );

    this.setState({
      searchKeyWord: e.target.value,
      searchList: searchList
    });
  }

  componentDidMount() {
    this.setState({
      infoList: infoList || []
    });

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
    const args = {
      props: this.props,
      state: this.state,
      handleSearchOnChange: this.handleSearchOnChange.bind(this)
    };

    return renderView(args);
  }
}

export default DashboardContainer;
