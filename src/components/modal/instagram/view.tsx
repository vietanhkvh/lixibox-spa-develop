import { IProps } from './model';
import STYLE from './style';

export function renderComponent({ props }) {
  const {
    data: {
      data: { link }
    }
  } = props as IProps;

  const iframeProps = {
    src: link,
    style: STYLE.container
  };

  return <iframe title="Instagram" {...iframeProps}></iframe>;
}
