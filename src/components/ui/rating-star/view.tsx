import classNames from 'classnames';

import Icon from '../icon';
import * as LAYOUT from '../../../style/layout';
import STYLE from './style';
import { generateTestId } from 'utils/test-utils';

export function renderComponent() {
  const { style, startStyle, starStyleInner, view, classes, dataTestId } = this.props;
  const { disable } = this.state;

  const ratingStarProps = {
    className: classNames(classes && classes.container),
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE, style),
    onMouseLeave: false === view && false === disable ? this.handleOnLeave.bind(this) : () => {}
  };

  return (
    <div {...generateTestId({ name: dataTestId })} {...ratingStarProps}>
      {[1, 2, 3, 4, 5].map((item, $index) => (
        <Icon
          key={`rating-star-item-${$index}`}
          innerStyle={Object.assign({}, STYLE.item.inner, starStyleInner)}
          name={this.createName(item)}
          style={Object.assign({}, this.createStyle(item), startStyle)}
          onEnter={() => (false === view ? this.handleOnEnter(item) : {})}
          onClick={() => (false === view ? this.handleOnClick(item) : {})}
        />
      ))}
    </div>
  );
}
