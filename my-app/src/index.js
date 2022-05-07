import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
	const navigate = useNavigate();

	const onRedirectCallback = (appState) => {
		navigate((appState && appState.returnTo) || window.location.pathname);
	};

	return (
		<Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
			{children}
		</Auth0Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithRedirectCallback
				domain="dev-w1z8wy-p.us.auth0.com"
				clientId="RHaM86sHqrwsD6rk8wTpi1YsU2z9FyhQ"
				redirectUri={window.location.origin}
				audience="https://quickstarts/api"
			>
				<App />
			</Auth0ProviderWithRedirectCallback>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
