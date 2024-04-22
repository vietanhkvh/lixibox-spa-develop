import componentStyles from 'style/component.module.scss';
import { IProps } from './model';

const renderView = (props: IProps) => {
  const { id, content, title, style } = props;

  return (
    <div className={componentStyles.asideBlock} style={Object.assign({}, style)} id={id}>
      {'' !== title && (
        <div className={componentStyles.asideBlockHeading}>
          <div className={componentStyles.asideBlockHeadingText}>{title}</div>
        </div>
      )}

      <div className={componentStyles.asideBlockContent}>{content}</div>
    </div>
  );
};

export default renderView;
