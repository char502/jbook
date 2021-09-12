import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // No longer required, now doing this is redux
  // const [code, setCode] = useState('');
  // const [err, setErr] = useState('');

  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // debouncing, want a function/some code to run as much as possible and then only after some period of time elapses will then want to do some other process
  // limits the rate at which a function gets invoked

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      // No longer required, now doing this is redux
      // const output = await bundle(cell.content);
      // setCode(output.code);
      // setErr(output.err);
      createBundle(cell.id, cell.content);
    }, 750);

    // if you return a function in useEffect, it will be called automatically the next time useEffect is called
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);
  // only need to include in dependency array if they are declared/defined in the component itself or received as a prop
  // If make use of some imported thing inside a useEffect function, do NOT have to add it to dependency array

  // createBundle is bound into the useActions hook, need useMemo in useActions Hook to prevent continual re-rendering as it is being rebound on every re-render of a component

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} BundleStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
