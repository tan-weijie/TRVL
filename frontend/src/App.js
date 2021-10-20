import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios';

// components && pages
import Navbar from './components/Navbar';
import ShowTripPage from './pages/ShowTripPage';
import DashboardPage from './pages/DashboardPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


export const User = createContext();

function App() {

    const [userInfo, setUserInfo] = useState('');

    const uri = process.env.REACT_APP_SERVERURI;

    useEffect(()=>{
        axios.get(uri + 'user', {withCredentials:true})
        .then(response =>{
            setUserInfo(response.data.user)
        })
    },[])

    return (
        <BrowserRouter>
            <User.Provider value={userInfo}>      
                <Navbar/>
                <Route exact path='/login'>
                    <LoginForm/>
                </Route>
                <Route exact path='/signup'>
                    <SignupForm/>
                </Route>
                <Route exact path='/home'>
                    <DashboardPage />
                </Route>    
                <Route path='/trip/:id'>
                    <ShowTripPage />
                </Route>
            </User.Provider>
        </BrowserRouter>
    )
}

export default App
