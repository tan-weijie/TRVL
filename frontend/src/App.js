import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import ShowTripPage from './pages/ShowTripPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';


function App() {
    return (
        <BrowserRouter>
      
            {/* <Switch> */}
                <Navbar/>
                <Route exact path='/home'>
                    <DashboardPage />
                </Route>
                <Route path='/trip/:id'>
                    <ShowTripPage />
                </Route>
            {/* </Switch> */}
        </BrowserRouter>
    )
}

export default App
