import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
// import "./dashboard.css";

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Box style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DashboardPage(props) {
    const uri = "http://localhost:5000/"
    const beach = "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trips, setTrips] = useState(['']);
    const [refresh, setRefresh] = useState(false);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        fetchTrips();
    }, [refresh])

    const fetchTrips = () => {
        axios.get(uri)
            .then(response => {
                console.log('THIS IS RETURNED', response.data);
                setTrips(response.data);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const fetchImage = async (country) => {
        const apiKey = "563492ad6f91700001000001fb4b588e36424f5db5e96fd30f05c911";
        const imgUri = `https://api.pexels.com/v1/search?query=${country}&orientation=landscape`;

        try {
            let res = await fetch(imgUri,
                {
                    method: 'GET',
                    headers: {
                        Authorization: apiKey,
                        Accept: 'application/json',
                    },
                })
            res = await res.json();
            return res.photos[1].src.landscape
        }
        catch (err) {
            console.log("ERROR", err);
        }
    }

    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const src = await fetchImage(country);
        console.log(src);
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        let difference = eDate - sDate;
        difference = difference / 1000 / 60 / 60 / 24;
        console.log(difference)
        let days = [];
        for (let i = 0; i <= difference; i++) {
            days.push({ date: new Date(sDate.getTime() + (i * 24 * 60 * 60 * 1000)), activities: [] })
        }

        const data = {
            _id: uuid(),
            country,
            startDate,
            endDate,
            days,
            src,
        };
        if (!country || !startDate || !endDate) {
            setAlert('Please enter all fields.')
            return
        } else if (endDate < startDate) {
            setAlert('End Date should not be earlier than Start Date');
            return
        }
        axios.post(uri, data)
            .then(response => {
                console.log('posted', response);
                setCountry('');
                setStartDate('');
                setEndDate('');
                setAlert('');
                window.location = (`./trip/${data._id}`)
            })
            .catch(error => {
                console.log({ status: 'bad', msg: error.message })
            })
    }

    const handleClick = (e) => {
        e.preventDefault();
        window.location = (`./trip/${e.target.id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        axios.delete(uri + `trip/${e.target.id}`)
            .then(response => {
                console.log('deleted');
                setRefresh(!refresh)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <img style={{ width: '100vw', height: '80vh', objectFit: 'cover' }} className="dashboard-background" src={beach} />
            {/* <Typography>
                THE WORLD AWAITS
            </Typography> */}
            <div>
                <form className='center' onSubmit={handleSubmit}>
                    <Box sx={style}>
                        <Typography variant='h5'>
                            Itinerary Planner
                        </Typography>
                        {alert}
                        <TextField
                            fullWidth margin='normal'
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleCountry}
                            type="text"
                            value={country}
                            placeholder="Enter destination" />
                        <TextField
                            fullWidth margin='normal'
                            id="outlined-basic"
                            label="Start Date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleStartDate}
                            type="date"
                            value={startDate} />
                        <TextField
                            fullWidth margin='normal'
                            id="outlined-basic"
                            label="End Date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleEndDate}
                            type="date"
                            value={endDate} />
                        <Button type="submit">Add</Button>
                    </Box>
                </form>
            </div>
            <Divider>
            <Typography style={{textAlign: 'center'}} variant='h5'>My Trips ({trips.length})</Typography>
            </Divider>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                height: 100,
                width: '100%'
            }}>
                
                {trips.map(trip => {
                    // startDate
                    let sDate = new Date(trip.startDate);
                    const sDay = sDate.toLocaleString('default', { day: '2-digit' });
                    const sMonth = sDate.toLocaleString('default', { month: 'short' });
                    const sYear = sDate.toLocaleString('default', { year: 'numeric' });
                    // endDate
                    let eDate = new Date(trip.endDate);
                    const eDay = eDate.toLocaleString('default', { day: '2-digit' });
                    const eMonth = eDate.toLocaleString('default', { month: 'short' });
                    const eYear = eDate.toLocaleString('default', { year: 'numeric' });
                    return (
                        <Card sx={{ p: 1, minWidth: 200, maxWidth: 345 }}>
                            <CardActionArea onClick={handleClick} id={trip._id}>
                                <CardMedia
                                    id={trip._id}
                                    component="img"
                                    height="140"
                                    image={trip.src}
                                    alt="no image"
                                />
                                <CardContent id={trip._id}>
                                    <Typography id={trip._id} gutterBottom variant="h5" component="div">
                                        {trip.country}
                                    </Typography>
                                    <Typography id={trip._id} variant="body2" color="text.secondary">
                                        {`${sDay} ${sMonth} ${sYear}`} - {`${eDay} ${eMonth} ${eYear}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={handleDelete} id={trip._id} size="small" color="primary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>
        </div>
    )
}

export default DashboardPage
