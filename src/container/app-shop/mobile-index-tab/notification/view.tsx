import componentStyles from 'style/component.module.scss';
import STYLE from './style';

export function renderComponent() {
  return (
    <div style={STYLE}>
      <div key="home-page-wrap" className={'wrapLayout'}>
        <div className={componentStyles.emtyText}>NOTIFICATION PAGE</div>
      </div>
    </div>
  );
}
