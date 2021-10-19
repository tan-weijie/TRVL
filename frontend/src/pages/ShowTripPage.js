import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Timeline from '../components/Timeline'

// mui
import { Typography, Box } from '@mui/material';
import { textAlign } from '@mui/system';

require('dotenv').config();

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: 'white',
    boxShadow: 24,
    p: 4,
};

function ShowTripPage() {

    const [trip, setTrip] = useState(['']);
    const { id } = useParams();

    console.log(id);

    // const uri = process.env.URI;
    const uri = "http://localhost:5000/";
    console.log(uri);


    useEffect(() => {
        fetchTrip();
    }, [])

    const fetchTrip = () => {
        axios.get(uri + `trip/${id}`)

            .then((response) => {
                console.log(response.data);
                setTrip(response.data);
                console.log(response.data.country)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    let sDate = new Date(trip.startDate);
    let eDate = new Date(trip.endDate);
    let difference = eDate - sDate;
    difference = difference / 1000 / 60 / 60 / 24
    console.log(eDate)
    console.log(sDate)

    return (
        <div>
            {trip.src && <img style={{ width: '100vw', height: '70vh', objectFit: 'cover' }} className="background-image" src={trip.src} />}
            <Box sx={style}>
                <Typography variant="h3" style={{textShadow: '3 3 #ff0000', textAlign: 'center'}}>{difference + 1} days in {trip.country}</Typography>
            </Box>
            {trip.days ? <Timeline trip={trip} /> : <div>Loading</div>}
        </div>
    )


}

export default ShowTripPage
