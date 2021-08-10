import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import './syntax.css';
import './code-editor.css';
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  // onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  // This is only invoked when the editor is first displayed on the screen
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    // console.log(getValue());
    // event listener for when the contents of the editor is updated in some way
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({
      tabSize: 2
    });

    const highlighter = new Highlighter(
      // don't try to type check his line
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    //whenever the contents of the editor change in some way try to apply
    // some syntax highlighting to it
    highlighter.highLightOnDidChangeModelContent(
      // prevents some unnecessary console logging
      // the below are substitutions for the internal logging
      // that the highlighter is trying to do
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    // console.log(editorRef.current);

    // get curent value from the editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        // value is actually initial value only
        value={initialValue}
        editorDidMount={onEditorDidMount}
        language='javascript'
        theme='dark'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
