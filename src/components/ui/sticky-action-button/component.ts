import { IProps } from './model';
import renderComponent from './view';
import { DEFAULT_PROPS } from './initialize';

const StickyActionButton = (props: IProps) => renderComponent({ props });
StickyActionButton.defaultProps = DEFAULT_PROPS;
export default StickyActionButton;
