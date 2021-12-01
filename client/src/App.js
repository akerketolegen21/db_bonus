import React, { Fragment } from 'react'
import './App.css';
import FindAverage from './components/FindAverage';

//components
import InputRecord from './components/inputRecord'
import ListRecords from './components/ListRecords'
import Menu from './components/Menu';

function App() {
  return (<Fragment>
    <Menu />
    <Fragment>
      <h1 className="text-center mt-5">Health Center</h1>
    </Fragment>
    <div className="container">
      <InputRecord />
      <FindAverage />
      <ListRecords />
    </div></Fragment>
  );
}

export default App;
