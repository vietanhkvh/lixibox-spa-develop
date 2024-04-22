import { useState, useEffect, useRef } from 'react';
import { scrollElement } from '../../../utils/scroll';

import SvgIcon from '../../ui/icon';
import styles from './style.module.scss';

function ChildItem(child, index) {
  return (
    <div key={child.id || index} className={styles.item}>
      {child}
    </div>
  );
}

const scrollListToBottom = ({ id }) => {
  const element = document.getElementById(id);
  if (!element) return;

  const { scrollHeight } = element;
  scrollElement({
    x: 0,
    y: scrollHeight,
    element,
    isAnimation: true
  });
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || 0;
}

const Content = ({ id, children, receiveNewComment }) => {
  const [isShowSrollDown, setDislayScrollDown] = useState(false);
  const prevReceiveNewComment = usePrevious(receiveNewComment);

  const autoScrollList = () => {
    const element = document.getElementById(id);
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight, lastElementChild } = element;
    const atPositionCanScroll =
      0 === scrollTop ||
      scrollHeight - ((lastElementChild && lastElementChild.scrollHeight) || 0) - clientHeight - scrollTop < 100;

    if (atPositionCanScroll) {
      scrollListToBottom({ id });
    } else {
      setDislayScrollDown(true);
    }
  };

  useEffect(() => {
    setTimeout(() => autoScrollList(), 2000);
  }, []);

  useEffect(() => {
    if (prevReceiveNewComment < receiveNewComment) {
      autoScrollList();
    }
  }, [receiveNewComment]);

  const list = Array.isArray(children) ? children : [children];

  let timerDebouneScroll;

  return (
    <div
      className={styles.list}
      id={id}
      onScroll={() => {
        !!timerDebouneScroll && clearTimeout(timerDebouneScroll);
        timerDebouneScroll = setTimeout(() => {
          const element = document.getElementById(id);
          if (!element) return;

          const { scrollTop, scrollHeight, clientHeight } = element;
          if (scrollTop + clientHeight >= (scrollHeight / 10) * 9) {
            setDislayScrollDown(false);
          }
        }, 200);
      }}
    >
      {list && list.map(ChildItem)}
      {!!isShowSrollDown && (
        <div
          className={styles.newMessage}
          onClick={() => {
            scrollListToBottom({ id });
          }}
        >
          <SvgIcon name={'angle-down'} className={styles.icon} />
          Có tin nhắn mới
        </div>
      )}
    </div>
  );
};

interface IProps {
  id: string;
  children: any;
  receiveNewComment?: number;
  replyPanel?: any;
}

const DiscussionPanel = ({ id, children, receiveNewComment = 0, replyPanel }: IProps) => {
  return (
    <div className={styles.container}>
      <Content id={id} receiveNewComment={receiveNewComment}>
        {children}
      </Content>
      <div className={styles.replyPanel}>{replyPanel}</div>
    </div>
  );
};

export default DiscussionPanel;
