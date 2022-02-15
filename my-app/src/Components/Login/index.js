import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../../App.css'; 
import 'materialize-css/dist/css/materialize.min.css';
//npimport {Auth0Provider} from '@auth0/auth0-react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

// ReactDOM.render(
//     <React.StrictMode>
//         <Auth0Provider
//             domain = "dev-qlpc0vzz.us.auth0.com"
//             clientId="H71lRyOjbsbLD5Qr2pdQSzGbodsRi930"
//             redirectUri={window.location.origin}
//         >
//             <App />
//         </Auth0Provider>
//     </React.StrictMode>
// )

class Login extends Component{
    render() {
        const checkLogin = (event) => {
            alert("Logged in as " + event.target.username.value);
            
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