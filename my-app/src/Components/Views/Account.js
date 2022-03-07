import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

const Account = () => {
    const { logout } = useAuth0();

    return (
        <Button onClick={() => logout({ returnTo: "http://localhost:3000" })}>
            Log Out
        </Button>
    );
};

export default Account;
