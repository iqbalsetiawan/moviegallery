import React, { Suspense, Component, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Loading from "../components/Loading";

const Movie = lazy(() => import("../components/Movie"));
const BaseLayout = lazy(() => import("../components/BaseLayout"));

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/">
              <BaseLayout>
                <Switch>
                  <Route exact path="/" component={() => <Movie />} />
                  <Redirect to="/" />
                </Switch>
              </BaseLayout>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Routing;
