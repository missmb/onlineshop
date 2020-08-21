import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../../context/userContext";

export default function Item() {
  const { userData } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
  </BrowserRouter>
  );
}
