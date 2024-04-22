import { Children } from 'react';
import STYLE from './style';

const renderView = ({ props, state }) => {
  const { style, itemStyle, children } = props;
  const { maxIsVisible } = state;

  return (
    <div style={style}>
      {Children.map(children, (child, i) => (
        <div key={`fade-item-${i}`} style={Object.assign({}, STYLE, { opacity: maxIsVisible > i ? 1 : 0 }, itemStyle)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default renderView;
