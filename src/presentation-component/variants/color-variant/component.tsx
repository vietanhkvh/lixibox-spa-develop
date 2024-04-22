import ReactTooltip from 'react-tooltip';

import { isMobileVersion } from '../../../utils/responsive';
import STYLE from './style';

interface ColorVariantProps {
  item: any;
  type: string;
  selected: number;
  onSelect: (param0?: any) => any;
}
const ColorVariant = ({ item: colorItem, type, selected, onSelect }: ColorVariantProps) => {
  const Component = colorItem.image_url ? 'img' : 'div';

  return (
    <>
      <Component
        onClick={() =>
          colorItem.option_value_id * 1 !== selected * 1 &&
          'function' === typeof onSelect &&
          onSelect({ item: colorItem, type })
        }
        style={Object.assign(
          {},
          STYLE.container,
          { backgroundColor: colorItem.color_code },
          colorItem.option_value_id * 1 === selected * 1 && {
            boxShadow: '0 0 0 2px #FFF, 0 0 0 3px #000'
          }
        )}
        data-tip={colorItem.presentation || colorItem.name}
        data-for={`tooltip-${colorItem.option_value_id}`}
        {...Object.assign({}, !!colorItem.image_url && { src: colorItem.image_url })}
      />
      {isMobileVersion() || <ReactTooltip id={`tooltip-${colorItem.option_value_id}`} effect="solid" place="bottom" />}
    </>
  );
};

export default ColorVariant;
