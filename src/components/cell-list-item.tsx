import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  // let child: JSX.Element;

  let child: JSX.Element = cell.type === 'code' ? <CodeCell /> : <TextEditor />;

  // if (cell.type === 'code') {
  //   child = <CodeCell />
  // } else {
  //   child = <TextEditor />
  // }

  return <div>{child}</div>;
};

export default CellListItem;