import { ReactNode, Fragment } from 'react';
import { findAll } from 'highlight-words-core';
import classNames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import { convertVietnamese } from '../format';
import styles from './style.module.scss';

interface GenerateHighlightedFragmentProps {
  text: string;
  segmentToHighlight: string;
  classes?: { highlighted?: string };
}
export const generateHighlightedFragment = ({
  segmentToHighlight,
  text,
  classes
}: GenerateHighlightedFragmentProps): ReactNode => {
  const _searchString = convertVietnamese(segmentToHighlight || '');
  const _textToHighlight = convertVietnamese(text || '');

  const chunks = findAll({
    autoEscape: true,
    searchWords: _searchString.split(' '),
    textToHighlight: _textToHighlight
  });

  return (
    <>
      {chunks.map(({ start, end, highlight }, index) =>
        highlight ? (
          <span
            key={index}
            className={classNames(styles.highlighted, classes?.highlighted)}
            {...generateTestId({ name: 'highlighted', id: index })}
          >
            {text.slice(start, end)}
          </span>
        ) : (
          <Fragment key={index}>{text.slice(start, end)}</Fragment>
        )
      )}
    </>
  );
};
