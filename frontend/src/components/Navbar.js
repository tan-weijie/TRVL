import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export default function Navbar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: 'black' }} position="static">
                <Toolbar>
                    <AirplaneTicketIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="http://localhost:3000/home" underline="none" color="inherit">
                            TRVL
                        </Link>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}