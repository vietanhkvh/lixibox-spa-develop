import { Component } from 'react';

import { IBreadCrumbProps, IBreadCrumbState } from './model';
import { isUndefined } from '../../../utils/validate';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import { INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class BreadCrumb extends Component<IBreadCrumbProps, IBreadCrumbState> {
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
    const { listMenu, isFinalList } = props;

    /** Skip if browse node pending */
    if ((!listMenu || true === isUndefined(listMenu.browse_nodes)) && !isFinalList) {
      return;
    }

    /** Updae data */
    const breadCrumb = !!isFinalList ? listMenu : this.pushDataStep(listMenu.browse_nodes);

    const breadcrumbList = breadCrumb.map((item, $index) => ({
      position: $index + 2,
      name: item.name,
      item: `https://www.lixibox.com${ROUTING_PRODUCT_CATEGORY_PATH}/${item.slug}`
    }));

    this.setState({ list: breadCrumb });
    props.updateMetaInfoAction({ structuredData: { breadcrumbList } });
  }

  /**
   * Recursive to generate breadcrumb
   *
   * @param listNode list browse node
   * 1. Create node with active node
   * 2. Create sub node with related node
   *
   * @return Array list node
   *
   */
  pushDataStep(listNode: Array<any>) {
    /** Create Node */
    const listNodeFiltered = Array.isArray(listNode) ? listNode.filter((item) => true === item.activeMenu) : [];

    let node: any = listNodeFiltered.length > 0 ? listNodeFiltered[0] : null;

    if (isUndefined(node) || node === null) {
      return [];
    }

    /** Init hover value is false */
    node.hover = false;

    /** Sub list */
    node.sub = Array.isArray(listNode) ? listNode.filter((item) => false === item.activeMenu) : [];

    /** Next list */
    const subNodeFiltered =
      node && Array.isArray(node.sub_nodes) ? node.sub_nodes.filter((item) => true === item.activeMenu) : [];

    let next = subNodeFiltered.length > 0 ? this.pushDataStep(node && node.sub_nodes) : [];

    return [node, ...next];
  }

  /** Show sublist when hover */
  hoverItem(_item, _hover) {
    this.setState((prevState) => {
      const newList =
        Array.isArray(prevState.list) &&
        prevState.list.map((item) => {
          item.hover = item.id === _item.id && _hover;
          return item;
        });

      return {
        list: newList
      } as any;
    });
  }
  handlerClickSubItem(subId, list) {
    this.setState((prevState) => {
      const arrayPrev = prevState.list;
      if (!Array.isArray(arrayPrev)) {
        return;
      }
      const prevIndex = arrayPrev.indexOf(arrayPrev.filter((i) => i.hover === true)[0]);

      const newItem = list.filter((i) => subId === i.id)[0];
      arrayPrev[prevIndex] = newItem;
      return {
        list: arrayPrev
      };
    });
  }
  render() {
    return renderComponent.bind(this)();
  }
}

export default BreadCrumb;
