import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import Estudante from './components/Estudante';
import Escola from './components/Escola';

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Switch>
          <Route path="/estudante" component={Estudante} />
          <Route path="/escola" component={Escola} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
