import { useState } from 'react';
import classNames from 'classnames';
import Image from 'presentation-component/ui/image';
import WrapLayout from 'container/layout/wrap';
import { mergeStyle } from 'utils/responsive';
import Icon from 'components/ui/icon';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import STYLE from './style';
import styles from './style.module.scss';

const BG_LIXICOIN = CDN_ASSETS_PREFIX('/lixicoin/faq-bg.jpg');

export const renderHeading = () => {
  const messageIconProps = {
    name: 'message-faq',
    style: STYLE.header.messageIcon,
    innerStyle: STYLE.header.messageInnerIcon
  };

  return (
    <div style={STYLE.header.container}>
      <div style={mergeStyle(STYLE.header.cover, { background: `url("${BG_LIXICOIN}")` })}></div>
      <WrapLayout>
        <div style={STYLE.header.content}>
          <Icon {...messageIconProps} />
          <div style={STYLE.header.info}>
            <div style={STYLE.header.title}>{`Hỏi đáp về Lixicoin`}</div>
            <div style={STYLE.header.description}>{`Giải đáp các thông tin, thắc mắc về Lixicoin`}</div>
          </div>
        </div>
      </WrapLayout>
    </div>
  );
};

interface CollapsibleItemTemplateClasses {
  container?: string;
  highlightBackgroundGreen?: string;
  ulTick?: string;
}
interface CollapsibleItemTemplate<AdditionalAttributes = {}> {
  id: number;
  title: string;
  content?: Array<string>;
  html?: (params: { classes?: CollapsibleItemTemplateClasses } & AdditionalAttributes) => React.ReactNode | JSX.Element;
  img?: {
    src: string;
  };
  isOpen?: boolean;
}
interface CollapsibleItemProps<AdditionalAttributes> {
  item: CollapsibleItemTemplate<AdditionalAttributes>;
  additionalAttributes?: AdditionalAttributes;
  onClick?: (id: number) => void;
  classes?: { container?: string };
  withoutSeparator?: boolean;
}
function CollapsibleItem<AdditionalAttributes = {}>({
  item,
  additionalAttributes,
  onClick,
  classes,
  withoutSeparator
}: CollapsibleItemProps<AdditionalAttributes>) {
  const headerProps = {
    style: Object.assign(
      {},
      STYLE.faq.item.header,
      !withoutSeparator && STYLE.faq.item.headerWithSeparator,
      item.isOpen && STYLE.faq.item.header.open
    ),
    onClick: () => onClick?.(item.id)
  };

  const iconProps = {
    style: Object.assign(
      {},
      STYLE.faq.item.icon,
      item.isOpen && STYLE.faq.item.openIcon,
      item.isOpen ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' }
    ),
    innerStyle: STYLE.faq.item.innerIcon,
    name: 'angle-down'
  };

  const contentProps = {
    style: Object.assign(
      {},
      STYLE.faq.item.content,
      !withoutSeparator && STYLE.faq.item.contentWithSeparator,
      item.isOpen && STYLE.faq.item.openContent,
      !!item?.img?.src && { padding: 0 }
    )
  };

  return (
    <div style={STYLE.faq.item} className={classNames(classes?.container)}>
      <div {...headerProps}>
        <div style={STYLE.faq.item.title}>{item && item.title}</div>
        <Icon {...iconProps} />
      </div>
      <div {...contentProps}>
        {!!item.content && item.content.map((item) => <div style={STYLE.faq.item.contentItem}>{item}</div>)}
        {!!item.html &&
          item.html({
            classes: {
              container: styles.templateContainer,
              highlightBackgroundGreen: styles.highlightBackgroundGreen,
              ulTick: styles.ulTick
            },
            ...additionalAttributes
          })}
        {!!item.img && (
          <div className={styles.imageWrapper}>
            {' '}
            <Image className={styles.image} src={item?.img?.src} />
          </div>
        )}
      </div>
    </div>
  );
}

interface CollapsibleListProps<AdditionalAttributes> {
  header?: string;
  list: ReadonlyArray<CollapsibleItemTemplate<AdditionalAttributes>>;
  /**
   * Additional attributes passed to the collapsible items of `html` type
   */
  additionalAttributes?: AdditionalAttributes;
  classes?: { container?: string; innerContainer?: string; item?: string };
  withoutSeparator?: boolean;
}
function CollapsibleList<AdditionalAttributes = {}>({
  header,
  list,
  additionalAttributes,
  classes,
  withoutSeparator
}: CollapsibleListProps<AdditionalAttributes>) {
  const [collapsibleItems, setCollapsibleItems] = useState(list);
  const updateCollapsibleItem = (id, attr) => {
    const index = collapsibleItems.findIndex((item) => item.id === id);
    const newCollapsibleItem = [...collapsibleItems];
    newCollapsibleItem[index] = Object.assign({}, newCollapsibleItem[index], attr);
    setCollapsibleItems(newCollapsibleItem);
  };

  return (
    <div className={classNames(styles.main, classes?.container)}>
      {header && <div className={styles.header}>{header}</div>}
      <div style={STYLE.faq.container} className={classNames(classes?.innerContainer)}>
        {!!collapsibleItems &&
          collapsibleItems.map((item, index) => (
            <CollapsibleItem<typeof additionalAttributes>
              key={index}
              item={item}
              additionalAttributes={additionalAttributes}
              onClick={() => updateCollapsibleItem(item.id, { isOpen: !item.isOpen })}
              classes={{ container: classes?.item }}
              withoutSeparator={withoutSeparator}
            />
          ))}
      </div>
    </div>
  );
}

export type { CollapsibleItemTemplate };
export default CollapsibleList;
