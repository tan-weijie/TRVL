import React, { useState, useEffect, useContext } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import { User } from '../App';
import TrendingDestinations from '../components/TrendingDestinations';

// mui
import { Box, minHeight } from '@mui/system';
import { Alert, Button, Card, CardContent, CardMedia, CardActionArea, CardActions, Divider, Typography, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

// Box style
const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    p: 4,
};

function DashboardPage() {
    const uri = "http://localhost:5000/"
    const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
    const beach = "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

    const user = useContext(User);

    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trips, setTrips] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [alert, setAlert] = useState('');

    const fetchTrips = (signal) => {

        user && axios.get(uri + `trips/${user._id}`, { signal })
            .then(response => {
                setTrips(response.data);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetchTrips(signal);

        return(()=>{
            controller.abort();
        })
    }, [user, refresh])
    
    const fetchImage = async () => {
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
        console.log(country.charAt(0).toUpperCase() + country.slice(1).toLowerCase());
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setAlert('Please login.')
            return
        }
        if (!country || !startDate || !endDate) {
            setAlert('Please enter all fields.')
            return
        } else if (new Date(startDate) < new Date()) {
            setAlert('Oops. Time travelling not allowed.')
            return
        } else if (endDate < startDate) {
            setAlert('End date should not be earlier than start date.');
            return
        }

        const src = await fetchImage();
        console.log(src);
        let formattedCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
        console.log(formattedCountry);
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        let difference = eDate - sDate;
        difference = difference / 1000 / 60 / 60 / 24;
        let days = [];
        for (let i = 0; i <= difference; i++) {
            days.push({ date: new Date(sDate.getTime() + (i * 24 * 60 * 60 * 1000)), activities: [] })
        }
        
        const data = {
            _id: uuid(),
            country: formattedCountry,
            startDate,
            endDate,
            days,
            src,
            userId: user
        };

        axios.post(uri + 'trip', data)
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
        axios.delete(uri + `trip/${e.target.id}`)
            .then(response => {
                setRefresh(!refresh)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <img style={{ width: '100vw', height: '80vh', objectFit: 'cover' }} className="dashboard-background" src={beach} alt="" />
                <Box sx={style}>
                    <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                        <Typography style={{ fontFamily: 'Lato', margin: 10 }} variant='h4'>
                            Itinerary Planner
                        </Typography>
                        {alert && <Alert severity="error">{alert}</Alert>}
                        <TextField
                            fullWidth margin='normal'
                            inputProps={{style: {fontFamily: 'Lato'}}}
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                                style: {fontFamily: "Lato"}
                            }}
                            onChange={handleCountry}
                            type="text"
                            value={country}
                            placeholder="Enter destination" />
                        <TextField
                            fullWidth margin='normal'
                            inputProps={{style: {fontFamily: 'Lato'}}}
                            id="outlined-basic"
                            label="Start Date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                                style: {fontFamily: "Lato"}
                            }}
                            onChange={handleStartDate}
                            type="date"
                            value={startDate} />
                        <TextField
                            fullWidth margin='normal'
                            inputProps={{style: {fontFamily: 'Lato'}}}
                            id="outlined-basic"
                            label="End Date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                                style: {fontFamily: "Lato"}
                            }}
                            onChange={handleEndDate}
                            type="date"
                            value={endDate} />
                        <Button style={{ fontFamily: 'Lato', margin: 10 }} variant="outlined" type="submit">Add Trip</Button>
{/* new shit */}
{/* more new shit */}
                    </form>
                </Box>
            <Divider>
                <Typography style={{ fontFamily: 'Lato', textAlign: 'center', margin: 30 }} variant='h5'>My Trips ({trips.length})</Typography>
            </Divider>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100vw'
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
                            <Card sx={{ borderRadius: 2, boxShadow: 20, transition: "transform 0.15s ease-in-out", "&:hover": { transform: "scale3d(1.1 , 1.1, 1)" }, p: 1, m: 2, minWidth: 250, maxWidth: 345, flexGrow: 1, flexShrink: 1 }}>
                                <CardActionArea onClick={handleClick} id={trip._id}>
                                    <CardMedia
                                        id={trip._id}
                                        component="img"
                                        height="140"
                                        image={trip.src}
                                        alt="no image"
                                    />
                                    <CardContent id={trip._id}>
                                        <Typography style={{fontFamily: 'Lato'}} id={trip._id} gutterBottom variant="h5" component="div">
                                            {trip.country}
                                        </Typography>
                                        <Typography style={{fontFamily: 'Lato'}} id={trip._id} variant="body2" color="text.secondary">
                                            {`${sDay} ${sMonth} ${sYear}`} - {`${eDay} ${eMonth} ${eYear}`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button style={{fontFamily: 'Lato'}} startIcon={<Delete />} onClick={handleDelete} id={trip._id} size="small" color="primary">
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Box>
            <Divider>
                <Typography style={{ fontFamily: 'Lato' ,textAlign: 'center', margin: 30 }} variant='h5'>Trending Destinations</Typography>
            </Divider>
            <TrendingDestinations />
        </div>
    )
}

export default DashboardPage
