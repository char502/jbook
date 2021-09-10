import { useActions } from '../hooks/use-actions';
import ActionButton from './ui/action-button';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ActionButton
        onClick={() => moveCell(id, 'up')}
        classNameForIcon={'fas fa-arrow-up'}
      />

      <ActionButton
        onClick={() => moveCell(id, 'down')}
        classNameForIcon={'fas fa-arrow-down'}
      />

      <ActionButton
        onClick={() => deleteCell(id)}
        classNameForIcon={'fas fa-times'}
      />
    </div>
  );
};

export default ActionBar;
