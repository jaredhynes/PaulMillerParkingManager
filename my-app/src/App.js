import {React, useEffect, useState} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Views/Home.js"
import ParkingMap from "./Components/Views/ParkingMap.js"
import Edits from "./Components/Views/Edits.js"
import Login from "./Components/Login/index.js"
import 'materialize-css/dist/css/materialize.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';


const App = () => {
    let edits = []
    
    const [carList, setCarList] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/cars')
            .then(res => {
            return res.json();
            })
            .then(data => {
            setCarList(data);
            })
    }, [])

    function useForceUpdate(){
      // eslint-disable-next-line
      const [value, setValue] = useState(0); // integer state
      return () => setValue(value => value + 1); // update the state to force render
    }
    let update = useForceUpdate()

    return(
      <Router>
      <div>
      <Navbar edits={edits} app={this}/>

      {carList && <Routes>
        <Route path="/" element={<Home carList={carList} edits={edits} update={update}/>}>
        </Route>
        <Route path="/map" element={<ParkingMap carList={carList} edits={edits} update={update} />}>
        </Route>
        <Route path="/history" element={<Edits carList={carList} edits={edits} update={update}/>}>
        </Route>
        <Route path="/login" element={<Login carList={carList} edits={edits} update={update}/>}>
        </Route>
      </Routes>}
  
      </div>
      </Router>
    );
}

export default App;
