import * as React from 'react';
import { useState, useEffect } from 'react';

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

    console.log(props.trip)

    const handleAmend = (e) => {


    }
    useEffect(() => {

    }, [props])

    return (
        <Timeline >
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
                                    <ActivityModal id={day._id} />
                                </TimelineContent>
                            </TimelineItem>
                            {day.activities.map(element => {
                                return (
                                    <TimelineItem className="day">
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
                                            <Typography variant="h6" component="span">
                                                Activity: {element.name}
                                            </Typography>
                                            <Typography>
                                                Time: {element.startTime}H - {element.endTime}H
                                            </Typography>
                                                Transport: {element.transport}
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
