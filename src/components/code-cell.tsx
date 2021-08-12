import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  // debouncing, want a function/some code to run as much as possible and then only after some period of time elapses will then want to do some other process
  // limits the rate at which a function gets invoked

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    // if you return a function in useEffect, it will be called automatically the next time useEffect is called
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='// Enter Code Here'
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}

        <Preview code={code} BundleStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
