import SearchSuggestion from 'container/app-shop/search/suggestion';
import { ViewProps } from '../../component';

const View = ({ isPanelVisible, setIsPanelVisible }: ViewProps) => {
  return <SearchSuggestion {...{ isPanelVisible, setIsPanelVisible }} />;
};

export default View;
