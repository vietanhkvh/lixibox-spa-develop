import STYLE from './style';

const renderView = ({ style }) => <div style={Object.assign({}, STYLE.container, style)}></div>;

export default renderView;
