import ReactDOM from 'react-dom';
import Form from './components/form';

const App = () => {
  return (
    <Form />
  );
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);