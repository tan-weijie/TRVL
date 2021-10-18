import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Timeline from '../components/Timeline'
import { touchRippleClasses } from '@mui/material';
require('dotenv').config();


// have to import timeline component

function ShowTripPage(props) {

    const [background, setBackground] = useState('');
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

    // pexels API


    useEffect(() => {
        fetchImage();
    }, [])

    const fetchImage = async () => {
        const apiKey = "563492ad6f91700001000001fb4b588e36424f5db5e96fd30f05c911";
        const imgUri = `https://api.pexels.com/v1/search?query=${trip.country}&orientation=landscape`;

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
            let i = Math.floor(Math.random() * 15)
            console.log(trip.country);
            console.log(res.photos[i])
            setBackground(res.photos[1].src.landscape)
        }
        catch (err) {
            console.log("ERROR", err);
        }
    }

    console.log('background',background)

    let sDate = new Date(trip.startDate);
    let eDate = new Date(trip.endDate);
    let difference = eDate - sDate;
    difference = difference / 1000 / 60 / 60 / 24
    console.log(eDate)
    console.log(sDate)
  

    return (
        <div>
            {`${difference + 1} days in ${trip.country}`}
            {background && <img className="background-image" src={background} />}
            {trip.days ? <Timeline trip={trip}/> : <div>Loading</div>}
        </div>
    )


}

export default ShowTripPage
