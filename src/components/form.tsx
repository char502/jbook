import React, {useState} from 'react';

// interface formProps {
//   rows: string,
//   cols: string,
// }

const Form: React.FC = () => {

  

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    console.log(e)

    setCode(input)
    
  }

  return (
    <div>
      <h3>JBook Demo</h3>
      
        <textarea value={input} onChange={(e) => setInput(e.target.value) }></textarea>
        <div>
        <button onClick={handleClick}>Submit</button>
        </div>
        {/* A pre element formats the code and makes it look like cde */}
        <pre>{code}</pre>
      
    </div>
  );
};

export default Form;
