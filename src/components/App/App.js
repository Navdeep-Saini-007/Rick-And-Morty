import React from "react";
import "./App.css";
import Home from "../Home/index";
import Single from "../SingleCharacter/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/character">
            <Single />
          </Route>
          {/* <Route exact path="/" element={<Navigate to="/character" />} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
