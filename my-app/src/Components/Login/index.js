import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css'; 
import 'materialize-css/dist/css/materialize.min.css';
import App from '../../App.js'

class Login extends Component{
    render() {
        const checkLogin = (event) => {
            ReactDOM.render(
              <App/>,
              document.getElementById('root')
            );
            event.preventDefault(event)
        }

        return(
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div>
                <h4>Welcome to the Paul Miller Audi Virtual Parking Manager</h4>
                <h5>Please log in below:</h5>
                <form onSubmit={checkLogin}>
                    <label>
                        <input type="email" name="username" placeholder="Username" required />
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="Password" required/>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
            </div>
        );
    }
}
export default Login