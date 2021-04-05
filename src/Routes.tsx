import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import Asteroid from "./Asteroid";
import React from "react";

interface Props {}

class Routes extends React.Component {
  constructor(props: Props) {
    super(props);
    console.log('Routes =================', props)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/asteroid">
            <Asteroid />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
