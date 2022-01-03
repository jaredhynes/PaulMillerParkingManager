//import Button from 'react-bootstrap/Button';
import React, { Component, Routes, Route} from 'react';
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

      <Routes>
        <Route path="/">
          <Home carList={carList} edits={edits} app={this}/>
        </Route>
        <Route path="/map">
          <ParkingMap carList={carList} edits={edits} app={this}/>
        </Route>
        <Route path="/history">
          <CompleteHistory carList={carList} edits={edits} app={this}/>
        </Route>

      </Routes>
  
      </div>
    );
  }
}

export default App;
