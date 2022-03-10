import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";
import LogoutButton from "../Login/LogoutButton";

const Account = () => {
    const { logout } = useAuth0();

    return (
        <LogoutButton></LogoutButton>
    );
};

export default Account;
