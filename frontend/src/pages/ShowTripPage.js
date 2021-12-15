import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Timeline from '../components/Timeline'

// mui
import { Typography, Box } from '@mui/material';

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

    const [trip, setTrip] = useState('');
    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();

    const uri = process.env.REACT_APP_SERVERURI;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchTrip(signal);

        return(() => {
            controller.abort();
        })
    }, [refresh])

    const fetchTrip = (signal) => {

        setRefresh(false);
        axios.get(uri + `trip/${id}`, { signal })
            .then((response) => {
                setTrip(response.data);  
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

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
        <div>
            {trip.src && <img style={{ width: '100vw', height: '70vh', objectFit: 'cover' }} className="background-image" src={trip.src} alt="" />}
            <Box sx={style}>
                {trip.days && <Typography sx={{fontFamily: "Lato"}} variant="h3" style={{ textShadow: '0 15px 40px rgb(0 0 0 / 100%)', textAlign: 'center' }}>{trip.days.length} days in {trip.country}</Typography>}
                {trip && <Typography sx={{fontFamily: "Lato"}} variant="h5" style={{ textShadow: '0 15px 40px rgb(0 0 0 / 100%)', textAlign: 'center' }}>{`${sDay} ${sMonth} ${sYear}`} - {`${eDay} ${eMonth} ${eYear}`}</Typography>}
            </Box>
            {trip.days ? <Timeline trip={trip} setRefresh={setRefresh}/> : <div>Loading</div>}
        </div>
    )


}

export default ShowTripPage
