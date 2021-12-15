import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

// mui
import { Box, Button, Typography, Modal, TextField, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


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

export default function EditActivityModal (props) {
    
    const uri = process.env.REACT_APP_SERVERURI;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState(props.activity.name);
    const [location, setLocation] = useState(props.activity.location);
    const [startTime, setStartTime] = useState(props.activity.startTime);
    const [endTime, setEndTime] = useState(props.activity.endTime);
    const [transport, setTransport] = useState(props.activity.transport);
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
        if (!name || !location || !startTime || !endTime || !transport){
            setAlert('Please enter all fields');
            return
        } else if (endTime < startTime){
            setAlert('End time should not be earlier than start time');
            return
        } 
        axios.put(uri + `activities/${props.activity._id}`, data)
        .then(response =>{
            console.log('updated', response);
            setOpen(false);
            props.setRefresh(true);
        }) 
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontFamily: 'Lato'}} size='small' startIcon={<EditIcon/>} color='primary' onClick={handleOpen}>
                EDIT
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{fontFamily: 'Lato'}} variant="h5">Edit Activity</Typography>
                    {alert && <Alert style={{fontFamily: 'Lato'}} severity="error">{alert}</Alert>}
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
                    <Button style={{fontFamily: "Lato"}}onClick={handleSubmit} type='submit'>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
}