import React from 'react';
import classnames from 'classnames';
import WrapLayoutFC from 'container/layout/new-wrap';
import TopHeader from 'components/general/top-header';
import { IDesktopHeader } from '../model';
import style from './style.module.scss';

const HeaderDesktop: React.FC<IDesktopHeader> = (props) => {
  const { themeHeader } = props;
  const propsTopHeader = Object.assign({}, props, { classname: style.topHeader });

  const wrapProps = {
    type: 'larger'
  };
  return (
    <div className={style.component}>
      <div className={classnames(style.container)} style={themeHeader.wrapper}>
        <WrapLayoutFC {...wrapProps}>
          <TopHeader {...propsTopHeader} />
        </WrapLayoutFC>
      </div>
    </div>
  );
};

export default HeaderDesktop;
