import { ComponentType, useRef } from 'react';
import styles from './style.module.scss';
import classnames from 'classnames';
import Icon from 'presentation-component/ui/icon';

interface ITemplateProps {
  onClick?: (event: any) => void;
}

interface IFadedInSliderProps {
  templateProps: ITemplateProps;
  template: ComponentType<ITemplateProps>;
  listItems: Array<{ [key: string]: any }>;
  classes?: { container?: string; list?: string; leftNav?: string; rightNav?: string };
}
const FadedInSlider: React.FC<IFadedInSliderProps> = (props) => {
  const { template: Template, templateProps, listItems, classes } = props;
  const fadedInContainerRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<HTMLDivElement>(null);

  const maximumScrollableWidth = Math.floor(
    (listItemsRef?.current?.getBoundingClientRect()?.right || 0) -
      (listItemsRef?.current?.getBoundingClientRect()?.left || 0)
  );

  // minimum number pixels hidden of container in a frame
  const MINIMUM_HIDDEN_NUMBER_PIXELS_IN_A_FRAME = 30;

  const isActiveNavBtn =
    maximumScrollableWidth - fadedInContainerRef?.current?.clientWidth || 0 > MINIMUM_HIDDEN_NUMBER_PIXELS_IN_A_FRAME;

  const handleClick = (isClickLeft: boolean) => {
    if (!fadedInContainerRef.current) return;

    const frameWidth = Math.ceil(fadedInContainerRef?.current?.clientWidth || 0);
    const leftPosition = Math.ceil(fadedInContainerRef?.current?.scrollLeft || 0);

    const leftMoveDistance = leftPosition === 0 ? maximumScrollableWidth : leftPosition - frameWidth;
    const rightMoveDistance = leftPosition + frameWidth >= maximumScrollableWidth ? 0 : leftPosition + frameWidth;

    frameWidth &&
      fadedInContainerRef.current.scrollTo({
        left: isClickLeft ? leftMoveDistance : rightMoveDistance
      });
  };

  return (
    <div className={classnames(styles.fadedInWarpper, classes?.container)}>
      {!!isActiveNavBtn && (
        <div className={classnames(styles.navBtn, styles.left, classes?.leftNav)} onClick={() => handleClick(true)}>
          <Icon name="angle-left" className={styles.navIcon} />
        </div>
      )}
      <div ref={fadedInContainerRef} className={classnames(styles.fadedInSlider, classes?.list)}>
        <div className={styles.listContainer} ref={listItemsRef}>
          {!!listItems?.length &&
            listItems.map((item, index) => <Template {...Object.assign({}, templateProps, { item, key: index })} />)}
        </div>
      </div>
      {!!isActiveNavBtn && (
        <div className={classnames(styles.navBtn, styles.right, classes?.rightNav)} onClick={() => handleClick(false)}>
          <Icon name="angle-right" className={styles.navIcon} />
        </div>
      )}
    </div>
  );
};

export default FadedInSlider;
