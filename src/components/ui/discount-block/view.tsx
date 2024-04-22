import { FunctionComponent } from 'react';
import { IProps } from './model';
import { DEFAULT_PROPS } from './initialize';
import { Wrapper, Content, DottedTop, DottedBottom, DottedLeft, DottedRight } from './styles';

/**
 * @deprecated Use `DiscountCode` from `presentation-component/ui/discount-code` instead. New version includes dynamic color support and provides more control over border display.
 */
const DiscountBlock: FunctionComponent<IProps> = ({
  className,
  size,
  style,
  color,
  isHighLight,
  innerStyle,
  dottedColor,
  backgroundColor,
  children,
  onClick,
  border = []
}) => {
  const wrapperProps = { className, onClick, size, style };

  const isDisplayBorderTop = !border.length || border.includes('top');
  const isDisplayBorderBottom = !border.length || border.includes('bottom');
  const isDisplayBorderLeft = !border.length || border.includes('left');
  const isDisplayBorderRight = !border.length || border.includes('right');

  return (
    <Wrapper {...wrapperProps}>
      <Content isHighLight={isHighLight} size={size} style={innerStyle} backgroundColor={backgroundColor}>
        {children}
      </Content>
      <DottedTop size={size} isDisplay={isDisplayBorderTop} color={color} />
      <DottedBottom size={size} isDisplay={isDisplayBorderBottom} color={color} />
      <DottedLeft size={size} isDisplay={isDisplayBorderLeft} color={color} />
      <DottedRight size={size} isDisplay={isDisplayBorderRight} color={color} />
    </Wrapper>
  );
};

DiscountBlock.defaultProps = DEFAULT_PROPS;
export default DiscountBlock;
