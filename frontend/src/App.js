import React from "react";
import './App.css';
import SignUp from './components/SignUp/SignUp'
import Switch from "react-bootstrap/Switch";
import {Route} from "react-router-dom";
import Home from "./components/Home/Home";
import MultiStepForm from "./components/MultipStepForm/MultiStepForm";

function App() {

  return (
      <>
        <Switch>
            <Route path="/" exact>
                <SignUp/>
            </Route>
            <Route path="/Home">
                <Home/>
            </Route>
            <Route path="/MultiStepForm">
                <MultiStepForm/>
            </Route>
        </Switch>
      </>
  );
}

export default App;
