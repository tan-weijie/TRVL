import React, { useState } from 'react'
import axios from 'axios';

// mui
import { Button, TextField, Typography, Alert } from '@mui/material'
import { Box } from '@mui/system'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    p: 4,
};

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

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
        if (!username || !password) {
            setAlert('Please input all fields.');
            return
        }
        console.log(data);
        // headers are important else cookies unable to set
        axios.post('http://localhost:5000/login', data, { withCredentials: true, credentials: 'include' })
            .then(res => {
                if (res.data.user) {
                    setAlert('');
                    window.location.href = "./home";
                } else {
                    console.log(res.data);
                    setAlert(res.data);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">
                Login to TRVL
            </Typography>
            {alert && <Alert severity="error">{alert}</Alert>}

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
            <br />
            <Button href="./signup">
                Register New User
            </Button>
        </Box>
    )
}

export default LoginForm
