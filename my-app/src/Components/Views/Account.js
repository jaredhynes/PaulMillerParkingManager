import React from "react";
import LogoutButton from "../Login/LogoutButton";

const Account = (props) => {
    let data = props.data;
    return (
        <div>
            <img src={data.user.picture} alt={data.user.name} />
            <h2>{data.user.name}</h2>
            <p>{data.user.email}</p>
            <LogoutButton/>
        </div>
    );
};

export default Account;
