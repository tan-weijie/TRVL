import React, { useState } from 'react'
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            username, 
            password
        };
        console.log(data);
        axios.post('http://localhost:5000/login', data)
        .then(res => {
            if(res.data == "logined"){
                window.location.href = "./home";
            } else 
                console.log(res.data);
        })
        .catch (err=>{
            console.log(err.message);
        })
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">
                Login to TRVL
            </Typography>
            <TextField
                fullWidth margin='normal'
                id="outlined-basic"
                label="Username"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleUsername}
                value={username}
            />
            <TextField
                fullWidth margin='normal'
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handlePassword}
                value={password}
            />
            <Button onClick={handleSubmit}>
                Login
            </Button>
            <br/>
            <Button href="./signup">
                signup
            </Button>
        </Box>
    )
}

export default LoginForm
