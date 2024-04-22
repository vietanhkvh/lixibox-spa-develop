import STYLE from './style';

const component = ({ title = '', className = '', style = {} }) => {
  return (
    <div className={className} style={Object.assign({}, STYLE.container, style)}>
      {!!title.length && <div style={STYLE.text}>{title}</div>}
    </div>
  );
};

export default component;
