import STYLE from './style';
import { IProps } from './model';

const renderMobile = (props: IProps) => {
  const {
    cartStore: { constants }
  } = props;
  return (
    <footer>
      <div style={STYLE.footer}>Hotline: {!!constants && constants.phone}</div>
    </footer>
  );
};

export default renderMobile;
