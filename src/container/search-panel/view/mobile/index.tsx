import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import SearchSuggestion from 'container/app-shop/search/suggestion';
import { ViewProps } from '../../component';

const View = ({ isPrivateMode, isPanelVisible, setIsPanelVisible, classes, onClick }: ViewProps) => {
  return (
    <>
      <Icon
        {...{
          name: 'search',
          className: classNames(classes?.container),
          onClick
        }}
      />
      {!isPrivateMode && <SearchSuggestion {...{ isPanelVisible, setIsPanelVisible }} />}
    </>
  );
};

export default View;
