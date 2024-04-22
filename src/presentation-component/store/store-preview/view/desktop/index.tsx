import classNames from 'classnames';

import StorePreviewContent from '../../../store-preview-content';
import Image from 'presentation-component/ui/image';
import { ViewProps } from '../..';
import style from './style.module.scss';

const View = ({ store, onClickAddress, classes }: ViewProps) => {
  return (
    <div className={classNames(style.storePreview, classes?.container)}>
      <div className={style.header}>
        <Image className={style.background} src={store?.image_url} alt="" />
      </div>
      <StorePreviewContent
        {...{
          store,
          onClickAddress,
          classes: { container: style.content }
        }}
      />
    </div>
  );
};

export default View;
