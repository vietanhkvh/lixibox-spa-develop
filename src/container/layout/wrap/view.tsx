import classNames from 'classnames';

const renderView = ({ children, style, type, className }) => {
  const containerProps = {
    key: 'wrap-layout-container',
    className: classNames(
      'wrapLayout',
      'smaller' === type && 'wrapLayoutSmaller',
      'larger' === type && 'wrapLayoutLarger',
      className
    ),
    style: Object.assign({}, style)
  };

  return <div {...containerProps}>{children}</div>;
};

export default renderView;
