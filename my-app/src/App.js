import React, { Component } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import CompleteHistory from "./Components/Views/CompleteHistory.js"
import Login from "./Components/Login/index.js"
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

class App extends Component{

  render() {
    let edits = []
    let carList = []

    return(

      <Router>
      <div>
      <Navbar edits={[]} app={this}/>

      <Routes>
        <Route path="/" element={<Home carList={carList} edits={edits} app={this}/>}>
        </Route>
        <Route path="/map" element={<ParkingMap carList={carList} edits={edits} app={this}/>}>
        </Route>
        <Route path="/history" element={<CompleteHistory carList={carList} edits={edits} app={this}/>}>
        </Route>
        <Route path="/login" element={<Login carList={carList} edits={edits} app={this}/>}>
        </Route>
      </Routes>
  
      </div>
      </Router>
    );
  }
}

export default App;
