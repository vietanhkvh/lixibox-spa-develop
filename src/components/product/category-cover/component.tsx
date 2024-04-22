import { Component } from 'react';

import { IProductColorProps, IProductColorState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import STYLE from './style';

class ProductColor extends Component<IProductColorProps, IProductColorState> {
  static defaultProps: IProductColorProps = DEFAULT_PROPS;

  constructor(props: IProductColorProps) {
    super(props);

    this.state = INITIAL_STATE;
  }

  render() {
    const { categorySlug } = this.props;
    const { slugConfig } = this.state;

    if (!categorySlug || !categorySlug.length || !slugConfig[categorySlug]) return '';

    return (
      <div style={STYLE.container}>
        <div style={Object.assign({}, STYLE.cover, { backgroundImage: `url(${slugConfig[categorySlug] as any})` })} />
      </div>
    );
  }
}

export default ProductColor;
