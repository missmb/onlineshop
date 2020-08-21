import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ItemPage from "../components/pages";

class MainRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/items" component={ItemPage} />

      </Switch>
    );
  }
}

export default RouteProcess;
