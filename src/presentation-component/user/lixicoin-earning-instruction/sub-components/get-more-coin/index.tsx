import { NavLink, useHistory } from 'react-router-dom';
import Icon from 'components/ui/icon';
import { mergeStyle } from 'utils/responsive';
import GeneralBlock from 'presentation-component/user/general-block';
import * as STYLE from './style';

const renderStepContent = (item, index) => {
  const containerProps = { style: mergeStyle(STYLE.step.content, item.isBold && STYLE.step.boldText) };
  return (
    <span {...containerProps}>
      {''}
      {item.text}
    </span>
  );
};

function StepItem(item, index) {
  if (!item) return null;

  const containerProps = {
    to: item.link,
    style: mergeStyle(STYLE.step.container, this.totalItem - 1 !== index && STYLE.step.containerWithBorder)
  };

  const iconProps = {
    name: item.icon,
    style: STYLE.step.icon,
    innerStyle: mergeStyle(STYLE.step.innerIcon, { width: item.iconWidth })
  };

  const angleRightIconProps = {
    name: 'angle-right',
    style: STYLE.step.angleIcon,
    innerStyle: STYLE.step.innerAngleIcon
  };

  return (
    <NavLink {...containerProps}>
      <Icon {...iconProps} />
      <div style={STYLE.step.info}>
        <div style={STYLE.step.title}>{item.title}</div>
        <div style={STYLE.step.contentList}>
          {!!item.content && Array.isArray(item.content) && item.content.map(renderStepContent)}
        </div>
      </div>
      <Icon {...angleRightIconProps} />
    </NavLink>
  );
}

const GetMoreCoin = ({ coinSavingStep }) => {
  const history = useHistory();
  if (!coinSavingStep || !Array.isArray(coinSavingStep)) return null;
  const generalBlockProps = {
    title: 'Hướng dẫn tích lũy Lixicoin',
    style: STYLE.main.container,
    id: 'lixicoin-get-more',
    extraTitle: () => null
  };

  return (
    <GeneralBlock {...generalBlockProps}>
      {''}
      {coinSavingStep.map(StepItem, { totalItem: coinSavingStep.length, history })}
    </GeneralBlock>
  );
};

export default GetMoreCoin;
