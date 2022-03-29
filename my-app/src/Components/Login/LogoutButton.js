import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    return ( 
        <Button onClick={() => logout({ returnTo: props.PATH })}>
            Log Out
        </Button>
    );
};

export default LogoutButton;