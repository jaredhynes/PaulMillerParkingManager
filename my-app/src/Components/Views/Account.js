import React from "react";
import LogoutButton from "../Login/LogoutButton";
import '../../Styles/account.css';
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
</style>

const Account = (props) => {
    
    let data = props.data;
    return (
        <div className="settings">
            <h2><center>Hello, {data.user.name}</center></h2>
            <img src={data.user.picture} alt={data.user.name} />
            <p><span className="info"><b>Name: </b></span>{data.user.name}</p>
            <p><span className="info"><b>Email: </b></span>{data.user.email}</p>
            <LogoutButton data={data} />
        </div>
    );
};

export default Account;
