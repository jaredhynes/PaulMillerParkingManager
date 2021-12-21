//import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/index.js"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import CompleteHistory from "./Components/Views/CompleteHistory.js"
import 'materialize-css/dist/css/materialize.min.css';


let carList = [];
let edits = [];

class App extends Component{
  render() {
    return(
      <div>
      <Navbar edits={edits}/>
      <Home carList={carList} edits={edits} app={this}/>
      </div>
    );
  }
}

export default App;
