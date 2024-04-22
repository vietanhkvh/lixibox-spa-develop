import Image from 'presentation-component/ui/image';
import STYLE from './style';

const renderSizeGuide = ({ list, onClick }) => {
  if (!list || !list.length) return null;

  return (
    <div style={STYLE.container}>
      <div style={STYLE.list}>{Array.isArray(list) && list.map(renderItem)}</div>
    </div>
  );
};

function renderItem(item) {
  if (!item) return null;

  return (
    <div style={STYLE.item}>
      <Image alt={item.title} style={STYLE.img} src={item.image_url} />
    </div>
  );
}
export default renderSizeGuide;
