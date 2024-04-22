import STYLE from './style';

const renderView = ({ style }) => {
  const formatedStyle = Array.isArray(style) ? [...style] : style;

  return <div className={'ani-bg'} style={Object.assign({}, {}, STYLE, formatedStyle)}></div>;
};

export default renderView;
