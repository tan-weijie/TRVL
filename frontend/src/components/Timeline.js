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

const timeParser = (time) => {
    let timeHour = parseInt(time.split(':')[0]); 
    console.log(time[0]);
    if (timeHour >= 12){
        timeHour = ((timeHour + 11) % 12 + 1);
        let parsedTime = `${timeHour}:${time.split(':')[1]} PM`;
        return parsedTime;
    } else {
        let parsedTime;
        time[0] === '0' ? parsedTime = `${time.slice(-4)} AM` : parsedTime = `${time} AM`;
        return parsedTime;
    }
}

export default function CustomizedTimeline(props) {

    const uri = process.env.REACT_APP_SERVERURI;

    const handleDelete = (e) => {
        console.log(e.target.id);
        e.preventDefault();
        axios.delete(uri + 'activities/' + e.target.id)
            .then(res => {
                console.log(res);
                props.setRefresh(true);
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
                                sx={{ fontFamily: "Lato", m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                Day {index + 1}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <Chip sx={{ fontFamily: "Lato" ,fontSize: 17, width: '130px'}} label={`${date.toLocaleString('default', { weekday: 'short' })}, ${date.toLocaleString('default', { day: '2-digit' })} ${date.toLocaleString('default', { month: 'short' })}`} />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span">
                                </Typography>
                                <ActivityModal trip={props.trip} setRefresh={props.setRefresh} id={day._id} />
                            </TimelineContent>
                        </TimelineItem>
                        {index === 0 &&
                            <TimelineItem className="departure">
                                <TimelineOppositeContent
                                    sx={{ fontFamily: "Lato", m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    9:30 AM
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot sx={{ backgroundColor: '#403d3d' }}>
                                        <FlightIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography sx={{fontFamily: "Lato"}} variant="h6" component="span">
                                        Singapore - {props.trip.country}
                                    </Typography>
                                    <Typography sx={{fontFamily: "Lato"}}>Departure</Typography>
                                </TimelineContent>
                            </TimelineItem>
                        }
                        {index === props.trip.days.length - 1 &&
                            <TimelineItem className="arrival">
                                <TimelineOppositeContent
                                    sx={{ fontFamily: "Lato", m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    10:30 PM
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot style={{ backgroundColor: '#403d3d' }}>
                                        <FlightIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography sx={{fontFamily: "Lato"}} variant="h6" component="span">
                                        {props.trip.country} - Singapore
                                    </Typography>
                                    <Typography sx={{fontFamily: "Lato"}}>Arrival</Typography>
                                </TimelineContent>
                            </TimelineItem>
                        }
                        {day.activities.map(element => {
                            return (
                                <TimelineItem key="1" className="day">
                                    <TimelineOppositeContent
                                        sx={{ fontFamily: "Lato", m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {timeParser(element.startTime)}
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
                                            <Typography sx={{fontFamily: "Lato"}} variant="h6" component="span">
                                                Activity: {element.name}
                                            </Typography>
                                            <Typography sx={{fontFamily: "Lato"}}>
                                                Location: {element.location}
                                            </Typography>
                                            <Typography sx={{fontFamily: "Lato"}}>
                                                Time: {timeParser(element.startTime)} - {timeParser(element.endTime)}
                                            </Typography>
                                            <Typography sx={{fontFamily: "Lato"}}>
                                                Transport: {element.transport}
                                            </Typography>
                                            <div style={{ display: 'inline' }}>
                                                <Button sx={{fontFamily: "Lato"}} size='small' startIcon={<Delete />} color="primary" id={element._id}
                                                    onClick={(handleDelete)}>
                                                    DEL
                                                </Button>
                                            </div>
                                            <EditActivityModal style={{ display: 'inline' }} activity={element} trip={props.trip} setRefresh={props.setRefresh}/>
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
