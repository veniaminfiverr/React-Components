import React, {useEffect} from "react";
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Switch from "react-bootstrap/Switch";
import {Route, useHistory} from "react-router-dom";
import Home from "./components/Home/Home";
import MultiStepForm from "./components/MultipStepForm/MultiStepForm";
import BlockChain from "./components/BlockChain/BlockChain";
import Feeds from "./components/Feeds/Feeds";
import Header from "./components/Header/Header";

function App() {
    const tiles = [
        {path:'/MultiStepForm',heading:'MultiStepForm'},
        {path:'/BlockChain',heading:'BlockChain'},
        {path:'/Feeds',heading:'Feeds'},
    ]
    return (
      <>
        <Switch>
            <Route path="/Home">
                <Header tiles={tiles}/>
                <Home/>
            </Route>
            <Route path="/MultiStepForm">
                <Header tiles={tiles}/>
                <MultiStepForm/>
            </Route>
            <Route path="/BlockChain">
                <Header tiles={tiles}/>
                <BlockChain/>
            </Route>
            <Route path="/Feeds">
                <Header tiles={tiles}/>
                <Feeds/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route path="/" exact>
                <Login/>
            </Route>
        </Switch>
      </>
  );
}

export default App;
