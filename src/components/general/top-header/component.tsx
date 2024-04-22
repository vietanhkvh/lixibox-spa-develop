import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ROUTING_CHECK_OUT } from '../../../routings/path';

import { mapStateToProps, mapDispatchToProps } from './store';
import { IProps } from './model';
import renderView from './view';
import { FILTER_SUGGESTION_LIST } from 'constants/application/global';

const TopHeader: React.FC<IProps> = (props) => {
  const { history } = props;
  const [showCategorySearch] = useState(false);
  const [categorySearchList] = useState(FILTER_SUGGESTION_LIST);

  const onCartIconClick = () => {
    history.push(ROUTING_CHECK_OUT);
  };

  const renderViewProps = {
    props,
    state: {
      showCategorySearch,
      categorySearchList
    } as any,
    onCartIconClick
  };

  return renderView(renderViewProps);
};

export const Component = TopHeader;
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader as any));
