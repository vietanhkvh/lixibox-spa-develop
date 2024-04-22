import { Component } from 'react';

import { isUndefined } from '../../../utils/validate';

import { renderComponent } from './view';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IPaginationProps, IPaginationState } from './model';

/**
 * @deprecated Use Pagination from `presentation-component/ui/pagination` instead.
 */
class Pagination extends Component<IPaginationProps, IPaginationState> {
  static defaultProps: IPaginationProps = DEFAULT_PROPS;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.initData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  initData(props = this.props) {
    const { current, total, urlList } = props;

    if (null === urlList || true === isUndefined(urlList) || 0 === urlList.length || urlList.length !== total) {
      return;
    }

    let list: Array<any> = [],
      startInnerList,
      endInnerList;

    /** Generate head-list */
    if (current >= 6) {
      list.push({
        number: urlList[0].number,
        title: urlList[0].title,
        link: urlList[0].link,
        active: false,
        disabled: false
      });

      list.push({
        value: -1,
        number: -1,
        title: '...',
        link: '#',
        active: false,
        disabled: true
      });
    }

    /**
     * Generate inner list
     *
     * startInnerList : min 0
     * endInnerList : max pagingInfo.total
     *
     */
    startInnerList = current - 2;
    startInnerList =
      startInnerList <= 0
        ? /** Min value : 1 */
          1
        : startInnerList === 2
        ? /** If start value === 2 -> force to 1 */
          1
        : startInnerList;

    endInnerList = startInnerList + 5;
    endInnerList =
      endInnerList > total
        ? /** Max value total */
          total
        : /** If end value === total - 1 -> force to total */
        endInnerList === total - 1
        ? total
        : endInnerList;

    for (let i = startInnerList; i <= endInnerList; i++) {
      list.push({
        number: urlList[i - 1].number,
        title: urlList[i - 1].title,
        link: urlList[i - 1].link,
        active: i === current,
        disabled: false,
        endList: i === total
      });
    }

    /** Generate tail-list */
    if (total > 6 && !this.checkExistedOnList(list, total - 1)) {
      list.push({
        value: -2,
        number: -2,
        title: '...',
        link: '#',
        active: false,
        disabled: true
      });

      list.push({
        number: urlList[total - 1].number,
        title: urlList[total - 1].title,
        link: urlList[total - 1].link,
        active: false,
        disabled: false,
        endList: true
      });
    }

    this.setState({ list });
  }

  checkExistedOnList(list, value) {
    const results = (Array.isArray(list) && list.filter((item) => item.number === value)) || [];
    return results.length !== 0;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default Pagination;
