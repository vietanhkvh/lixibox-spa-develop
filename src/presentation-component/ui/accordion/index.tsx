import { useState, useEffect } from 'react';
import classnames from 'classnames';

import SvgIcon from '../icon';
import { scrollElement } from '../../../utils/scroll';

import style from './style.module.scss';
import { renderHtmlContent } from 'utils/html';
import { isMobileVersion } from 'utils';

interface ItemProps {
  id: number;
  title: string;
  content: any;
}

function Item({ id, title, content: Content }: ItemProps, index: number) {
  const itemClassName = classnames(style.item, { [style.isOpen]: this.selected === index });
  const identity = `accordion-item-${id || index}`;
  const handleSelect = () => {
    if (this.selected === index) return null;

    typeof this.onSelect == 'function' && this.onSelect(index);

    /* Scroll to focus */
    const accordionElement = document.getElementById(this.accordionIdentity);
    const accordionPosition = accordionElement && accordionElement.offsetTop;
    scrollElement({ x: 0, y: accordionPosition, isAnimation: true });
  };

  return (
    <div className={itemClassName} onClick={handleSelect} id={identity} key={identity}>
      <div className={style.heading} style={this.styleHeading}>
        <div className={style.title}>{title}</div>
        <SvgIcon className={style.icon} name={'angle-down'} />
      </div>
      <div className={style.content}>
        {typeof Content === 'string' ? renderHtmlContent({ content: Content }) : <Content />}
      </div>
    </div>
  );
}

interface IProps {
  data: ItemProps[];
  selectedIndex?: number;
  className?: any;
  styles?: any;
}

const Accordion = ({ data, selectedIndex, className, styles }: IProps) => {
  const [selected, setSelected] = useState(-1);
  useEffect(() => selectedIndex !== undefined && setSelected(selectedIndex), [selectedIndex]);
  const styleCondition = isMobileVersion()
    ? Object.assign({}, styles?.common, styles?.mobile)
    : Object.assign({}, styles?.common, styles?.desktop);

  const handleSelect = (index) => setSelected(index);
  const accordionIdentity = `accordion-${new Date().getTime()}`;
  const itemProps = { selected, onSelect: handleSelect, accordionIdentity, styleHeading: styles?.heading };

  if (!data || !data.length) return null;

  return (
    <div className={classnames(style.container, className)} style={styleCondition} id={accordionIdentity}>
      {data.map(Item, itemProps)}
      {''}
    </div>
  );
};

Accordion.defaultProps = {
  selectedIndex: 0
};

export default Accordion;
