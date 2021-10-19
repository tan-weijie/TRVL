import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker'
import { Input } from '@mui/material';


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

export default function ActivityModal (props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [transport, setTransport] = useState('');
    const [alert, setAlert] = useState('');

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleLocation = (e) => {
        setLocation(e.target.value)
    }

    const handleStartTime = (e) => {
        setStartTime(e.target.value)
    }

    const handleEndTime = (e) => {
        setEndTime(e.target.value)
    }

    const handleTransport = (e) => {
        setTransport(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name,
            location,
            startTime,
            endTime,
            transport
        }
        console.log(data);
        if (!name || !location || !startTime || !endTime || !transport){
            setAlert('Please enter all fields');
            return
        } else if (endTime < startTime){
            setAlert('End Time should not be earlier than Start Time');
            return
        } 
        axios.put(`http://localhost:5000/days/${props.id}`, data)
        .then(response =>{
            console.log('updated', response);
            setOpen(false);
            setName('');
            setLocation('');
            setStartTime('');
            setEndTime('');
            setTransport('');
            setAlert('')
            window.location.href = `./${props.trip._id}`
        }) 
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <div>
            <Button onClick={handleOpen}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5">New Activity</Typography>
                    {alert}
                    <TextField 
                        fullWidth margin='normal' 
                        id="outlined-basic" 
                        label="Activity Name" 
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleName}
                        value={name} 
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        id="outlined-basic" 
                        label="Location" 
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleLocation}
                        value={location} 
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        id="outlined-basic" 
                        label="Start Time" 
                        type='time' 
                        variant='outlined' 
                        InputLabelProps={{
                        shrink: true,
                        }} 
                        onChange={handleStartTime}
                        value={startTime}
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        id="outlined-basic" 
                        label="End Time" 
                        type='time' 
                        variant='outlined' 
                        InputLabelProps={{
                        shrink: true,
                        }} 
                        onChange={handleEndTime}
                        value={endTime}
                    />
                    <TextField 
                    fullWidth margin='normal' 
                    id="outlined-basic" 
                    label="Transport" 
                    variant="outlined" 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    onChange={handleTransport}
                    value={transport}
                    />
                    <Button onClick={handleSubmit} type='submit'>Add/Edit</Button>
                </Box>
            </Modal>
        </div>
    );
}