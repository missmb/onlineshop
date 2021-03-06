import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home/index";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ListItems from "./components/pages/item/ListItems";
import Items from "./components/pages/item/AddItem";
import DetailItem from "./components/pages/item/DetailItem";
import Account from "./components/pages/Account";
import UserContext from "./context/userContext";

import "./App.css";
import SearchItems from "./components/pages/item/SearchItems";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/items" component={ListItems} />
              <Route exact path="/items/add" component={Items} />
              <Route path="/detail/:name" component={DetailItem} />
              <Route path="/search/:name" component={SearchItems} />
              {/* <Route path="/users" component={Account} /> */}
              <Route path="/users/:user" component={Account} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
