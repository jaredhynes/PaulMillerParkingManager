//import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import './App.css';
import Navbar from "./Components/NavBar/index.js"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import CompleteHistory from "./Components/Views/CompleteHistory.js"
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';


let carList = [];
let edits = [];

class App extends Component{
  render() {

    return(
      <Router>
      <div>
      <Navbar edits={edits} app={this}/>

      <Routes>
        <Route path="/" element={<Home carList={carList} edits={edits} app={this}/>}>
        </Route>
        <Route path="/map" element={<ParkingMap carList={carList} edits={edits} app={this}/>}>
        </Route>
        <Route path="/history" element={<CompleteHistory carList={carList} edits={edits} app={this}/>}>
        </Route>
      </Routes>
  
      </div>
      </Router>
    );
  }
}

export default App;
