import * as React from 'react';
import Chip from '@mui/material/Chip';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlightIcon from '@mui/icons-material/Flight';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

export default function CustomizedTimeline(props) {
    let sDate = new Date(props.trip.startDate);
    let eDate = new Date(props.trip.endDate);
    let difference = eDate - sDate;
    difference = difference / 1000 / 60 / 60 / 24


    let days = [];
    console.log(difference);
    // for (let i = 0; i < difference; i++) {

    //     if (i = 0) {
    //         days.push(
    //             <TimelineItem className="day">
    //                 <TimelineOppositeContent
    //                     sx={{ m: 'auto 0' }}
    //                     align="right"
    //                     variant="body2"
    //                     color="text.secondary"
    //                 >
    //                     Day 1
    //                 </TimelineOppositeContent>
    //                 <TimelineSeparator>
    //                     <TimelineConnector />
    //                     <Chip label={sDate.toLocaleDateString('en-AU')} />
    //                     <TimelineConnector />
    //                 </TimelineSeparator>
    //                 <TimelineContent sx={{ py: '12px', px: 2 }}>
    //                 </TimelineContent>
    //             </TimelineItem>
    //         )
    //     // console.log(days[0])
    //     } //else if (i > 0 && i != difference){
    //     //     days.push(

    //     //     )
    //     // }

    // }


    return (
        <Timeline position="alternate">
            <TimelineItem className="day">
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    Day 1
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
        </Timeline>
    );
}
