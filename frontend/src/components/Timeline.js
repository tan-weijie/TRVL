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


export default function CustomizedTimeline(props) {

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
                                <Chip style={{ fontSize: 17}} label={`${date.toLocaleString('default', { weekday: 'short' })}, ${date.toLocaleString('default', { day: '2-digit' })} ${date.toLocaleString('default', { month: 'short' })}`} />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                </Typography>
                                <ActivityModal trip={props.trip} id={day._id} />
                            </TimelineContent>
                        </TimelineItem>
                        {index === 0 &&
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
                                    <TimelineDot style={{ backgroundColor: '#403d3d' }}>
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
                        }
                        {index === props.trip.days.length - 1 &&
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
                                    <TimelineDot style={{ backgroundColor: '#403d3d' }}>
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
                            </TimelineItem>}
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
                                                Time: {element.startTime > 12 ? `${element.startTime - 12}PM` : `${element.startTime}AM`} - {element.endTime > 12 ? `${element.endTime - 12}PM` : `${element.endTime}AM`}
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
            })}
        </Timeline>
    );
}
