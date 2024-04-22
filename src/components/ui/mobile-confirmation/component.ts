import { IProps } from './model';
import renderComponent from './view';
import { DEFAULT_PROPS } from './initialize';

/**
 * @deprecated Use MobileConfirmation from `presentation-component/ui/mobile-confirmation`
 */
const MobileConfirmation = (props: IProps) => renderComponent({ props });
MobileConfirmation.defaultProps = DEFAULT_PROPS;
export default MobileConfirmation;
