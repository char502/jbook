import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  // onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  // This is only invoked when the editor is first displayed on the screen
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // console.log(getValue());
    // event listener for when the contents of the editor is updated in some way
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    })

    monacoEditor.getModel()?.updateOptions({
      tabSize: 2
    });
  }

  return (
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
  );
};

export default CodeEditor;
