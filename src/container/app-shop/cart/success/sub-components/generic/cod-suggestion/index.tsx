import classNames from 'classnames';

import SubmitButton from '../../../../../../../components/ui/submit-button';
import { generateTestId } from 'utils/test-utils';
import STYLE from './style';
import style from './style.module.scss';

interface IProps {
  className: string;
  onClickCODPayment: () => any;
}
const CODSuggestion = ({ className, onClickCODPayment }: IProps) => {
  return (
    <div className={classNames(style.codSuggestion, className)} {...generateTestId({ name: 'cod-suggestion' })}>
      <div className={style.title}>Đổi phương thức thanh toán</div>
      <div className={style.brief}>
        Đề thuận tiện cho việc thanh toán, bạn có thể đổi qua Thanh toán tiền mặt khi nhận hàng
      </div>
      <SubmitButton
        style={Object.assign({}, STYLE.button, STYLE.button)}
        titleStyle={STYLE.button.titleStyle}
        title="Thanh toán tiền mặt (COD)"
        svgIcon="wallet"
        onSubmit={() => onClickCODPayment()}
      />
    </div>
  );
};
CODSuggestion.defaultProps = {
  className: '',
  onClickCODPayment: () => {}
};

export default CODSuggestion;
