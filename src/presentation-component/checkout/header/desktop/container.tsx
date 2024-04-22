import { generateTestId } from 'utils/test-utils';
import WrapLayout from '../../../../container/layout/wrap';
import SvgIcon from '../../../ui/icon';
import style from './style.module.scss';

const LeftSection = ({ privateModeLink, isPrivateMode, phone, link }) => {
  const logoIconProps = Object.assign(
    {},
    {
      name: 'lixibox',
      type: 'link',
      link: !!isPrivateMode ? privateModeLink : link,
      className: style.icon
    }
  );

  return (
    <div className={style.leftSection} {...generateTestId({ name: 'checkout-header-left-section' })}>
      <SvgIcon {...logoIconProps} />
      <div className={style.info}>
        <SvgIcon name="logo-text" className={style.logo} />
        <div className={style.phone}>HOTLINE {phone}</div>
      </div>
    </div>
  );
};

// TODO: Refactor props
interface IProps {
  pathname?: any;
  cartStore?: any;
  appStore?: any;
}
const CheckoutHeader = ({
  cartStore: {
    constants: { phone }
  },
  appStore: { isPrivateMode, privateModeLink }
}: IProps) => {
  return (
    <div className={style.primaryContainer} {...generateTestId({ name: 'checkout-header' })}>
      <WrapLayout>
        <div className={style.alignedContainer}>
          <LeftSection isPrivateMode={isPrivateMode} privateModeLink={privateModeLink} phone={phone} link={'/'} />
        </div>
      </WrapLayout>
    </div>
  );
};

export default CheckoutHeader;
