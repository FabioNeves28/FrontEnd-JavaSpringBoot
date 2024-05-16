import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import Estudante from './components/Estudante';
import ListaDeEstudantes from './components/ListaDeEstudantes';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Appbar />
      <Estudante />
  
    </div>
  );
}

export default App;
