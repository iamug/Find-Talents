import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary, Layout } from "./components";
import { Loading } from "./components/Loading";
import "./App.css";

import { Home, Saved } from "./pages";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Layout>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/saved" exact component={Saved} />
                <Route component={Home} />
              </Switch>
            </Layout>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
