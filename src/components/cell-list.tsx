import { useSelector } from 'react-redux';
// import { useTypedSelector } from '../hooks/use-typed-selector';
import { RootState } from '../state';
import { CellsState } from '../state/reducers/cellsReducer';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  // didn't work, had to use an alternative
  // useTypedSelector(({ cells: { order, data }}) => {
  //   return order.map((id) => {
  //     return data[id];
  //   });
  // });

  const cellState = useSelector(
    (state: RootState) => state.cells
  ) as CellsState;

  const cells = cellState.order.map((id) => cellState.data[id]);

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return (
    <div>
      <div>{renderedCells}</div>
    </div>
  );
};

export default CellList;
