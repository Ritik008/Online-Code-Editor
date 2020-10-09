import React from 'react';
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import {BrowserRouter} from "react-router-dom"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar"/>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
