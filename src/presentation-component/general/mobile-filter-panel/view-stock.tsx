import { Panel, SelectList } from './view-general';

interface StockFilterOption {
  id: string;
  title: string;
  selected: boolean;
}
export interface StockFilterProps {
  options: Array<StockFilterOption>;
  onSelect?: (option: StockFilterOption) => any;
}
export const StockFilter = ({ options, onSelect }: StockFilterProps) => {
  return (
    <Panel title={'TRẠNG THÁI'}>
      <SelectList list={options} type={'column'} onClick={(option) => onSelect?.(option)} />
    </Panel>
  );
};
