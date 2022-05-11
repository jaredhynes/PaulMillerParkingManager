import React from "react";
import Button from "react-bootstrap/esm/Button";

const LogoutButton = (props) => {
    return (
        <Button onClick={() => props.data.auth0.logout({ returnTo: window.location.origin })}>
            Log Out
        </Button>
    );
};

export default LogoutButton;