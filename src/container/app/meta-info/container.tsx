import { PureComponent } from 'react';

import { IProps, IState } from './model';

class MetaConfig extends PureComponent<IProps, IState> {
  componentDidMount() {
    this.handleUpdateMetaInfo(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      if (this.props.url !== nextProps.url) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      /** INFO */

      if (this.props.info.description !== nextProps.info.description) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.info.image !== nextProps.info.image) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.info.keyword !== nextProps.info.keyword) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.info.title !== nextProps.info.title) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.info.type !== nextProps.info.type) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      /** PRODUCT */

      if (this.props.product.brand !== nextProps.product.brand) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.condition !== nextProps.product.condition) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.priceAmount !== nextProps.product.priceAmount) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.priceCurrency !== nextProps.product.priceCurrency) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.rating.avg_rate !== nextProps.product.rating.avg_rate) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.rating.count !== nextProps.product.rating.count) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.review.length !== nextProps.product.review.length) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.product.stock !== nextProps.product.stock) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (this.props.structuredData.breadcrumbList.length !== nextProps.structuredData.breadcrumbList.length) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }

      if (
        this.props.structuredData.breadcrumbList.length !== 0 &&
        this.props.structuredData.breadcrumbList.length === nextProps.structuredData.breadcrumbList.length &&
        this.props.structuredData.breadcrumbList[0].name !== nextProps.structuredData.breadcrumbList[0].name
      ) {
        this.handleUpdateMetaInfo(nextProps);
        return;
      }
    } catch (e) {}
  }

  handleUpdateMetaInfo(props) {
    const { info, product, structuredData } = props;
    /**
     * info data
     * - url
     * - type (product)
     * - title
     * - description
     * - image
     * - keyword
     */

    const data = Object.assign(
      {},
      !!info ? { info } : null,
      !!structuredData ? { structuredData } : null,
      !!product ? { product } : null
    );

    this.props.updateMetaInfoAction(data);
  }

  render() {
    return null;
  }
}

export default MetaConfig;
