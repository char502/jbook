import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // plugins are run in the order they are listed inside this array
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    // console.log(result)

    setCode(result.outputFiles[0].text);

    try {
      eval(result.outputFiles[0].text);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h3>JBook Demo</h3>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      {/* A pre element formats the code and makes it look like cde */}
      <pre>{code}</pre>

      <iframe sandbox="allow-same-origin" src='/test.html' />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
