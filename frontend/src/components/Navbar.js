import * as React from 'react';
import { useContext } from 'react';
import { User } from '../App';
import axios from 'axios';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const buttonStyle = {
    transition: "transform 0.15s ease-in-out", 
    "&:hover": { transform: "scale3d(1.1 , 1.1, 1)" },
    fontFamily: 'Lato'
}

export default function Navbar() {

    const uri = process.env.REACT_APP_SERVERURI;
    const user = useContext(User);
    
    const handleLogin = (e) => {
        e.preventDefault();
        window.location.href = '../login'
    }

    const handleLogOut = () => {
        axios.post(uri + 'logout',{}, { withCredentials: true, credentials: 'include' })
        .then(response=>{
            console.log(response);
            window.location.href = '../login'
        })
    }
    return (
        <Box sx={{ flexGrow: 1, zIndex: 1, width: '100vw', position: 'sticky'}}>
            <AppBar style={{backgroundColor: 'rgba(0,0,0,.6)'}} >
                <Toolbar>
                    <AirplaneTicketIcon fontSize='large'/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{ fontFamily: 'Lato'}} href="http://localhost:3000/home" underline="none" color="inherit">
                            TRVL
                        </Link>
                    </Typography>
                    {user && <Button sx={buttonStyle} color="inherit">{user.username}</Button>}
                    {user ? <Button sx={buttonStyle} onClick={handleLogOut} color="inherit">Logout</Button> : <Button sx={buttonStyle} onClick={handleLogin} color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}