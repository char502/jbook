import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';

import './text-editor.css';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [value, setvalue] = useState('# Header');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 1. check if have ref pointing at div containing MDEditor / if ref.current is defined
      // 2. then make sure event.target is defined / we clicked on an element that does exist
      // 3. Add a comparison to make sure whether or not the thing that was just clicked on
      // is/is not inside of that div (ref.current.contains(event.target))
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log('element clicked on is inside editor');
        return;
      }

      console.log('element clicked is not inside editor');

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor value={value} onChange={(val) => setvalue(val || '')} />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;

// textarea - where typing text into (but has no way of applying syntax highlighting etc)
// It is actually rendered inside a 'pre' element (which is actually on top of the text area)
// and displays what is actually rendered on the screen
