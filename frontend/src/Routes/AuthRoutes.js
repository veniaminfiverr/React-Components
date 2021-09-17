import {Route} from "react-router-dom";
import Layout from "../../components/UI/Layout/Layout";
import Login from "../components/Login/Login";
import React from "react";

const sectionStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
}
let authRoutes = [
<Route path="/" exact >
    <Layout sectionStyle={sectionStyle}>
        <div style={{marginRight: "10%"}}>
            <Login/>
        </div>
    </Layout>
</Route>
];

export default authRoutes;