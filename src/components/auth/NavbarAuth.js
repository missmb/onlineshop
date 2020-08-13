import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

import Button from '@material-ui/core/Button';


export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
    {userData.user ? (
        <Button color="inherit" onClick={logout}>Log out</Button>
      ) : (
        <>
          <Button color="inherit" onClick={register}>Register</Button>
          <Button color="inherit" onClick={login}>Log in</Button>
        </>
      )}
    </div>
  );
}
