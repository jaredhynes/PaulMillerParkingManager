import React from "react";
import LogoutButton from "../Login/LogoutButton";

const Account = (props) => {
    return (
        <div>
            <img src={props.user.picture} alt={props.user.name} />
            <h2>{props.user.name}</h2>
            <p>{props.user.email}</p>
            <LogoutButton/>
        </div>
    );
};

export default Account;
