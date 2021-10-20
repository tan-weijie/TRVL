import * as React from 'react';
import axios from 'axios';
import ActivityModal from './ActivityModal'
import EditActivityModal from './EditActivityModal';

// mui
import { Chip, Typography, Button } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab'
import FlightIcon from '@mui/icons-material/Flight';
import ExploreIcon from '@mui/icons-material/Explore';
import { Box } from '@mui/system';
import { Delete } from '@mui/icons-material';



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

    let sDate = new Date(props.trip.startDate);
    let eDate = new Date(props.trip.endDate);
    let difference = eDate - sDate;
    difference = difference / 1000 / 60 / 60 / 24;

    const uri = process.env.REACT_APP_SERVERURI;

    const handleDelete = (e) => {
        console.log(e.target.id);
        e.preventDefault();
        axios.delete(uri + 'activities/' + e.target.id)
            .then(res => {
                console.log(res);
                window.location.href = `./${props.trip._id}`;
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Timeline>
            {props.trip.days.map((day, index) => {
                let date = new Date(day.date);
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
                                    <Chip label={date.toLocaleDateString('en-AU')} />
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
                                    <Chip label={date.toLocaleDateString('en-AU')} />
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
                                    <Chip label={date.toLocaleDateString('en-AU')} />
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
                                            <TimelineDot color='primary'>
                                                <ExploreIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px' }}>
                                            <Box sx={{ width: 300, height: 'auto', p: 2, border: '1px solid grey', boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)', flexGrow: 1 }}>
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
                                                <div style={{ display: 'inline' }}>
                                                    <Button size='small' startIcon={<Delete />} color="primary" id={element._id}
                                                        onClick={(handleDelete)}>
                                                        DEL
                                                    </Button>
                                                </div>
                                                <EditActivityModal style={{ display: 'inline' }} activity={element} trip={props.trip} />
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
