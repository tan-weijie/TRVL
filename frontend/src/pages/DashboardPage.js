import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import "./dashboard.css";

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function DashboardPage(props) {
    const uri = "http://localhost:5000/"
    const beach = "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";


    const [background, setBackground] = useState();
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trips, setTrips] = useState(['']);

    useEffect(() => {
        fetchTrips();
    }, [])

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

    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        let difference = eDate - sDate;
        difference = difference / 1000 / 60 / 60 / 24;
        console.log(difference)
        let days = [];
        for (let i = 0; i <= difference; i++) {
            days.push({ date: i, activities: [] })
        }
        // const getDatesBetweenDates = (sDate, eDate) => {
        //     let dates = []
        //     //to avoid modifying the original date
        //     const theDate = new Date(sDate)
        //     while (theDate < eDate) {
        //         dates = [...dates, new Date(theDate)]
        //         theDate.setDate(theDate.getDate() + 1)
        //     }
        //     return {dates}
        // }

        // let dates = getDatesBetweenDates(sDate, eDate);

        const data = {
            _id: uuid(),
            country,
            startDate,
            endDate,
            days,
        };
        axios.post(uri, data)
            .then(response => {
                console.log('posted', response);
                setCountry('');
                setStartDate('');
                setEndDate('');
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
        axios.delete(uri + e.target.id)
        .then(response => {
            console.log('deleted');
            window.location = ('./home')
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div>
            <img className="dashboard-background" src={beach} />
            THE WORLD AWAITS
            <div>
                <form className='center' onSubmit={handleSubmit}>
                    <label className='center'>Itinerary Planner</label>
                    Country:<input className='block' onChange={handleCountry} type="text" value={country} placeholder="Enter destination" />
                    Start Date:<input onChange={handleStartDate} type="date" value={startDate} />
                    End Date: <input onChange={handleEndDate} type="date" value={endDate} />
                    <button type="submit">Add</button>
                </form>
            </div>
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
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={handleClick} id={trip._id}>
                            <CardMedia
                                id={trip._id}
                                component="img"
                                height="140"
                                image={beach}
                                alt="green iguana"
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
        </div>
    )
}

export default DashboardPage
