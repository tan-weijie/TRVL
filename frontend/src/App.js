import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import ShowTripPage from './pages/ShowTripPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


export const User = createContext();

function App() {

    const [userInfo, setUserInfo] = useState('');

    useEffect(()=>{
        axios.get("http://localhost:5000/user", {withCredentials:true})
        .then(response =>{
            // console.log(response)
            console.log(response.data.user)
            setUserInfo(response.data.user)
            // setEmail(response.data.email)    
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
