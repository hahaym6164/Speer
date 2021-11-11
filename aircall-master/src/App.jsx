import React from 'react';
import ReactDOM from 'react-dom';
import Calls from './components/Calls.jsx';
import Header from './Header.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Calls />
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
