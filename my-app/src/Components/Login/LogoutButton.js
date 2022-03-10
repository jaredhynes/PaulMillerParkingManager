import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return ( 
        <Button onClick={() => logout({ returnTo: "https://frozen-crag-90219.herokuapp.com/" })}>
            Log Out
        </Button>
    );
};

export default LogoutButton;