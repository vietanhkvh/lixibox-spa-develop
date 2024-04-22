import { NavLink } from 'react-router-dom';

import Icon from 'components/ui/icon';
import { ROUTING_LIXI_COIN_FAQ } from 'routings/path';

import GeneralBlock from '../general-block';
import { tracking } from './tracking';
import * as STYLE from './style';

/**
 * NOTE: Migrated to presentation-component in order to enhance reusability
 * TODO: Refactor. Overly complicated and poor readability
 */
interface FaqLinkProps {
  title?: string;
  info?: string;
  to?: string;
}
const FaqLink = ({ to, title, info }: FaqLinkProps) => {
  const generalBlockProps = {
    title: '',
    style: STYLE.main.container,
    extraTitle: null,
    isShowHeading: false
  };

  const linkProps = {
    to: to,
    style: STYLE.main.link,
    onClick: () => tracking.clickOn.faq()
  };

  const messageIconProps = {
    name: 'message-faq',
    style: STYLE.main.messageIcon,
    innerStyle: STYLE.main.messageInnerIcon
  };

  const angleIconProps = {
    name: 'angle-right',
    style: STYLE.main.angleIcon,
    innerStyle: STYLE.main.innerAngleIcon
  };

  return (
    <GeneralBlock {...generalBlockProps}>
      <NavLink {...linkProps}>
        <div style={STYLE.main.content}>
          <Icon {...messageIconProps} />
          <div style={STYLE.main.info}>
            <div style={STYLE.main.title}>{title}</div>
            <div style={STYLE.main.description}>{info}</div>
          </div>
        </div>
        <Icon {...angleIconProps} />
      </NavLink>
    </GeneralBlock>
  );
};
FaqLink.defaultProps = {
  title: 'Thông tin về Lixicoin',
  info: 'Hãy tìm hiểu thêm thông tin về Lixibox tại mục hỏi đáp',
  to: ROUTING_LIXI_COIN_FAQ
};

export default FaqLink;
