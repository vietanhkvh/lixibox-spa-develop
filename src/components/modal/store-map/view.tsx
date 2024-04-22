import STYLE from './style';

export function renderComponent(props) {
  const data = props.data && props.data.data;
  const style = props.style;

  const iframeProps = {
    src: !!data
      ? data
      : props.storeUrl ||
        'https://www.google.com/maps/d/u/0/embed?mid=1AZtxRDqV7xEEWJUq7q77tqM7mfbqo5Io&ll=10.791051896120734%2C106.69337490149968&z=15',

    style: Object.assign({}, STYLE.container, style)
  };

  return <iframe title="Store map" {...iframeProps} />;
}
