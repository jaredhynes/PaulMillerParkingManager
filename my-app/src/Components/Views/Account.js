import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import LogoutButton from "../Login/LogoutButton";

const Account = (props) => {
    const { user, isAuthenticated } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "quickstarts/api";
      
          try {
            const userDetailsByIdUrl = `https://${domain}/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${props.accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [user?.sub]);

    return (
        isAuthenticated && (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>User Metadata</h3>
            {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
            ) : (
            "No user metadata defined"
            )}
            <LogoutButton/>
        </div>
        )
    );
};

export default Account;
