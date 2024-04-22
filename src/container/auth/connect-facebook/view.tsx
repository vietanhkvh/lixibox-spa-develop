import WrapLayout from '../../layout/wrap';
import STYLE from './style';

const renderView = () => (
  <div className={'sign-in-container'} style={STYLE.container}>
    <WrapLayout>
      <div style={STYLE.text}>Vui lòng chờ trong giây lát...</div>
    </WrapLayout>
  </div>
);

export default renderView;
