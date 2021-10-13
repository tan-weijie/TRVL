import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import AddTripPage from './pages/AddTripPage';
import DashboardPage from './pages/DashboardPage';


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path='/home'>
                    <DashboardPage />
                </Route>
                <Route path='/new'>
                    <AddTripPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
