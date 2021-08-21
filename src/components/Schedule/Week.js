import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Day from "./Day";

const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const Week = () => {

    return (
        <ListGroup horizontal>
            {daysOfWeek.map((day) => {
                return <ListGroupItem>
                    <Day dayOfWeek={day} />
                </ListGroupItem>
            })}
        </ListGroup>
    )
};

export default Week;
