import Image from 'presentation-component/ui/image';
import { IProps } from './model';
import STYLE from './style';

export function renderComponent({ props }) {
  const { item, column } = props as IProps;

  return (
    <div style={STYLE.column[column || 1]}>
      <Image
        alt={''}
        style={STYLE.container.itemSliderPanel}
        src={(item && item.original_url) || ''}
        id={`img-community`}
      />
    </div>
  );
}
