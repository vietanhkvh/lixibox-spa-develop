// TODO: Migrate to SCSS as styled-components are not being used
import styled, { keyframes } from 'styled-components';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
const dotted = CDN_ASSETS_PREFIX('/discount-code/dotted.png');
const dottedGolden = CDN_ASSETS_PREFIX('/discount-code/dotted-golden.png');
const dottedPrimary = CDN_ASSETS_PREFIX('/discount-code/dotted-primary-2.png');

export const Wrapper = styled.div<{ size: number }>`
  background: white;
  width: 100%;
  position: relative;
  padding: ${(props) => `${props.size * 2}px`};
`;

const changeColor = (size) => keyframes`
  0% { 
    background: var(--colorBrandInstagram);
    box-shadow: 0 0 0 ${size}px var(--colorBrandInstagram);
  }
  50% { 
    background: var(--colorPrimary);
    box-shadow: 0 0 0 ${size}px var(--colorPrimary);
  }
  100% { 
    background: var(--colorBrandInstagram);
    box-shadow: 0 0 0 ${size}px var(--colorBrandInstagram);
  }
`;

export const Content = styled.div<{ backgroundColor: string; size: number; isHighLight: boolean }>`
  padding: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${(props) => props.backgroundColor};
  box-shadow: ${(props) => `0 0 0 ${props.size}px ${props.backgroundColor}`};
  animation-name: ${(props) => (props.isHighLight ? changeColor(props.size) : 'none')}};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const GeneralDotted = (size, isDisplay = true, color) => {
  const dottedColor = 'white' === color ? dotted : 'primary' === color ? dottedPrimary : dottedGolden;
  return `
  position: absolute;
  ${!!isDisplay ? 'background-image: url(' + dottedColor + ');' : 'background-color: #FFF;'}
  background-size: ${size * 4}px;
`;
};

export const DottedTop = styled.div<{ size: number; isDisplay: boolean }>`
  ${(props) => GeneralDotted(props.size, props.isDisplay, props.color)}
  width: 100%;
  height: ${(props) => `${props.size * 2}px`};
  top: 0;
  left: 0;
  background-position: left center;
`;

export const DottedBottom = styled.div<{ size: number; isDisplay: boolean }>`
  ${(props) => GeneralDotted(props.size, props.isDisplay, props.color)}
  width: 100%;
  height: ${(props) => `${props.size * 2}px`};
  bottom: 0;
  left: 0;
  background-position: right center;
`;

export const DottedLeft = styled.div<{ size: number; isDisplay: boolean }>`
  ${(props) => GeneralDotted(props.size, props.isDisplay, props.color)}
  width: ${(props) => `${props.size * 2}px`};
  height: ${(props) => `calc(100% - ${props.size * 4}px)`};
  top: ${(props) => `${props.size * 2}px`};
  left: 0;
  background-position: center top;
`;

export const DottedRight = styled.div<{ size: number; isDisplay: boolean }>`
  ${(props) => GeneralDotted(props.size, props.isDisplay, props.color)}
  width: ${(props) => `${props.size * 2}px`};
  height: ${(props) => `calc(100% - ${props.size * 4}px)`};
  top: ${(props) => `${props.size * 2}px`};
  right: 0;
  background-position: center top;
`;
//
// box-shadow: ${props => `0 0 0 ${props.size}px inset ${props.dottedColor}`};
