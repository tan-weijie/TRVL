import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

// mui
import { Box, Button, Typography, Modal, TextField, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


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
        } else if (startTime < new Date()){
            setAlert('Start day')
            return
        } else if (endTime < startTime){
            setAlert('End time should not be earlier than start time');
            return
        } 
        const uri = process.env.REACT_APP_SERVERURI;
        axios.put(uri + `days/${props.id}`, data)
        .then(response =>{
            console.log('updated', response);
            setOpen(false);
            setName('');
            setLocation('');
            setStartTime('');
            setEndTime('');
            setTransport('');
            setAlert('')
            props.setRefresh(true);
        }) 
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <div>
            <Button style={{fontFamily: "Lato"}} size='big' startIcon={<AddIcon/>} onClick={handleOpen}>Add</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{fontFamily: "Lato"}} variant="h5">New Activity</Typography>
                    {alert && <Alert style={{fontFamily: "Lato"}} severity="error">{alert}</Alert>}
                    <TextField 
                        fullWidth margin='normal' 
                        inputProps={{style: {fontFamily: "Lato"}}}
                        id="outlined-basic" 
                        label="Activity Name" 
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true,
                        style: {fontFamily: "Lato"}
                        }}
                        onChange={handleName}
                        value={name} 
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        inputProps={{style: {fontFamily: "Lato"}}}
                        id="outlined-basic" 
                        label="Location" 
                        variant="outlined" 
                        InputLabelProps={{
                        shrink: true,
                        style: {fontFamily: "Lato"}
                        }}
                        onChange={handleLocation}
                        value={location} 
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        inputProps={{style: {fontFamily: "Lato"}}}
                        id="outlined-basic" 
                        label="Start Time" 
                        type='time' 
                        variant='outlined' 
                        InputLabelProps={{
                        shrink: true,
                        style: {fontFamily: "Lato"}
                        }} 
                        onChange={handleStartTime}
                        value={startTime}
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        inputProps={{style: {fontFamily: "Lato"}}}
                        id="outlined-basic" 
                        label="End Time" 
                        type='time' 
                        variant='outlined' 
                        InputLabelProps={{
                        shrink: true,
                        style: {fontFamily: "Lato"}
                        }} 
                        onChange={handleEndTime}
                        value={endTime}
                    />
                    <TextField 
                        fullWidth margin='normal' 
                        inputProps={{style: {fontFamily: "Lato"}}}
                        id="outlined-basic" 
                        label="Transport" 
                        variant="outlined" 
                        InputLabelProps={{
                            shrink: true,
                            style: {fontFamily: "Lato"}
                    }} 
                    onChange={handleTransport}
                    value={transport}
                    />
                    <Button style={{fontFamily: "Lato"}} onClick={handleSubmit} type='submit'>Add Activity</Button>
                </Box>
            </Modal>
        </div>
    );
}