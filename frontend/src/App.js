import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import ShowTripPage from './pages/ShowTripPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';




function App() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');

    useEffect(()=>{
        axios.get("http://localhost:5000/user")
        .then(response =>{
            console.log(response)
            setUsername(response.data.username)
            setEmail(response.data.email)    
        })
    },[])

    return (
        <BrowserRouter>
      
            {/* <Switch> */}
                <Navbar user={username}/>
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
            {/* </Switch> */}
        </BrowserRouter>
    )
}

export default App
