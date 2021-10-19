import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// mui
import ActivityModal from './ActivityModal'
import Chip from '@mui/material/Chip';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlightIcon from '@mui/icons-material/Flight';
import Typography from '@mui/material/Typography';
import ExploreIcon from '@mui/icons-material/Explore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import { Box } from '@mui/system';


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

export default function CustomizedTimeline(props) {

    const[refresh, setRefresh] = useState(false);

    let sDate = new Date(props.trip.startDate);
    let eDate = new Date(props.trip.endDate);
    let difference = eDate - sDate;
    difference = difference / 1000 / 60 / 60 / 24;

    console.log(props.trip)

    const uri = "http://localhost:5000/activities/"

    const handleDelete = (e) => {
        console.log(e.target.id);
        e.preventDefault();
        axios.delete(uri + e.target.id)
        .then(res =>{
            console.log(res);
            window.location.href = `./${props.trip._id}`
        })
        .catch (err=>{
            console.log(err);
        })
    }

    useEffect(() => {

    }, [])

    return (
        <Timeline>
            {props.trip.days.map((day, index) => {
                if (index == 0) {
                    return (
                        <>
                            <TimelineItem className="day">
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Day {index + 1}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <Chip label={sDate.toLocaleDateString('en-AU')} />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem className="departure">
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    9:30 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <FlightIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography variant="h6" component="span">
                                        Singapore - {props.trip.country}
                                    </Typography>
                                    <Typography>Departure</Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </>
                    )
                } else if (index == props.trip.days.length - 1) {
                    return (
                        <>
                            <TimelineItem className="day">
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Day {index + 1}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <Chip label={eDate.toLocaleDateString('en-AU')} />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem className="arrival">
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    10:30 pm
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <FlightIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography variant="h6" component="span">
                                        {props.trip.country} - Singapore
                                    </Typography>
                                    <Typography>Arrival</Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </>
                    )
                } else {
                    return (
                        <>
                            <TimelineItem className="day">
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Day {index + 1}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <Chip label={sDate.toLocaleDateString('en-AU')} />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography variant="h6" component="span">
                                    </Typography>
                                    {/* <Typography>Activity: {day.activities[0].name}</Typography> */}
                                    <ActivityModal trip={props.trip} id={day._id} />
                                </TimelineContent>
                            </TimelineItem>
                            {day.activities.map(element => {
                                return (
                                    <TimelineItem key="1" className="day">
                                        <TimelineOppositeContent
                                            sx={{ m: 'auto 0' }}
                                            align="right"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot>
                                                <ExploreIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px' }}>
                                            <Box sx={{ width: 300, p: 2, border: '1px dashed grey' }}>
                                            <Typography variant="h6" component="span">
                                                Activity: {element.name}
                                            </Typography>
                                            <Typography>
                                                Location: {element.location}
                                            </Typography>
                                            <Typography>
                                                Time: {element.startTime}H - {element.endTime}H
                                            </Typography>
                                            <Typography>
                                                Transport: {element.transport}
                                            </Typography>
                                            <Button   id={element._id} 
                                            onClick={(handleDelete)}>
                                            {/* <DeleteForeverIcon
                                            id={element._id} 
                                            onClick={handleDelete} 
                                         /> */}DEL
                                            </Button>
                                            </Box>
                                        </TimelineContent>
                                    </TimelineItem>
                                )
                            })}
                        </>
                    )
                }
            })}
        </Timeline>
    );
}
