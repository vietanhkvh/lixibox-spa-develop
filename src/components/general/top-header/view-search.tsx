import SearchPanel from 'container/search-panel';
import style from './style.module.scss';

const renderSearchBox = () => {
  return (
    <div id={'search-bar'} className={style.search}>
      <SearchPanel />
    </div>
  );
};

export default renderSearchBox;
