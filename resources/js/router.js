import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Homepage from "./components/Homepage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Layout from "./components/Layout";

import PrivateRoute from "./components/Dashboard/Common/PrivateRoute";

import DashboardHomepage from "./components/Dashboard/Components/Homepage";

import Debris from "./components/Dashboard/Components/Debris/DebrisMain";
import Ecosystem from "./components/Dashboard/Components/Ecosystem/EcosystemMain";
import Report from "./components/Dashboard/Components/Report/Report";
import Validation from "./components/Dashboard/Components/Validation/Validation";
import User from "./components/Dashboard/Components/User/User";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Authentication from "./components/Authentication";
import MapContainer from "./components/MapContainer";
import Collection from "./components/Dashboard/Components/Collection/Collection";
import Repository from "./components/Repository";

export const history = createBrowserHistory();

const Router = () => {
    return (
        <BrowserRouter history={history}>

            <Routes>
                <Route path="/repositories/*" element={<Layout><Repository /></Layout>} />
                <Route exact path="/map" element={<Layout><MapContainer /></Layout>} />
                <Route exact path="/login" element={<Layout><Authentication title="sign in"><Login /></Authentication></Layout>} />
                <Route exact path="/register" element={<Layout><Authentication title="sign up"><Registration /></Authentication></Layout>} />
                <Route exact path="/" element={<Layout><Homepage /></Layout>} />


                <Route exact path="/dashboard/debris" element={<DashboardLayout><Debris /></DashboardLayout>} />
                <Route exact path="/dashboard/biodiversity" element={<DashboardLayout><Ecosystem /></DashboardLayout>} />
                <Route exact path="/dashboard/collections" element={<DashboardLayout><Collection /></DashboardLayout>} />
                <Route exact path="/dashboard/reports" element={<DashboardLayout><Report /></DashboardLayout>} />
                <Route exact path="/dashboard/validation" element={<DashboardLayout><Validation /></DashboardLayout>} />
                <Route exact path="/dashboard/users" element={<DashboardLayout redirectPath="/dashboard" permissionLevel={2}><User /></DashboardLayout>} />

                <Route
                    exact
                    path="/dashboard"
                    element={
                        <DashboardLayout><DashboardHomepage /></DashboardLayout>
                    }
                />
            </Routes>


        </BrowserRouter >
    );
};

export default Router;
