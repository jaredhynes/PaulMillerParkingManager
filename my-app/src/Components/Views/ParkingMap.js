import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
//import map from '../../Images/prototype_map.png'
import ShowOnHover from './ShowOnHover';
import { Container, Row, Col } from 'react-grid-system';
import model from '../../Dummydb/dummyCardata';
 
function ParkingMap(props) {
  let cl = model

  let carsTwoWay = []

  function make2dList(){
      let COL_SIZE = 1
      let ROW_SIZE = cl.length / COL_SIZE
      for (let y = 0; y < COL_SIZE; y++){
        let temp_arr = []
        for (let x = 0; x < ROW_SIZE ; x++){
          temp_arr.push(cl[x + y * ROW_SIZE])
        }
        carsTwoWay.push(temp_arr)
      }
  }
  make2dList()
  console.log(carsTwoWay)

  return (
    <div>
    <Container> 
      {carsTwoWay.map((row) => (
        <Row>
        {row.map((car) => (
          <Col>
          <ShowOnHover car={car}/>
          </Col>
        ))}
        </Row>
      ))}
    </Container>
    </div>
  );
}
 
export default ParkingMap;