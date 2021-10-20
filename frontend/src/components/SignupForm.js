import React, { useState } from 'react'
import axios from 'axios';
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

function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            username,
            email,
            password
        };
        console.log(data);
        if (!username || !email || !password) {
            setAlert('Please enter all fields.')
            return
        } else if (!email.includes('@')) {
            setAlert('Invalid email.')
            return
        } else if (password.length < 8) {
            setAlert('Password too short. (Minimum 8 characters)')
            return
        }
        axios.post('http://localhost:5000/signup', data)
            .then(res => {
                console.log('res', res.data);
                if (res.data == "Existing user or email.") {
                    setAlert(res.data);
                } else {
                    console.log(res.data);
                    setAlert('');
                    window.location.href = './login';
                }
            })
            .catch(err => {
                console.log('err', err.message);
            })


    }
    return (
        <Box sx={style}>
            <Typography variant="h5">
                Signup New Account
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
                label="Email"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleEmail}
                value={email}
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
                Signup
            </Button>
        </Box>
    )
}

export default SignupForm
