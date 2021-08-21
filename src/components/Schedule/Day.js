import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Section from './Section';
import NewSection from './NewSection';

const Day = (props) => {
    const day = props.dayOfWeek;

    const [sectionNames, setSectionNames] = useState([]);
    const [displayTextBox, setDisplayTextBox] = useState(false);

    const addSection = (name) => {
        setSectionNames([...sectionNames, name]);
    }

    const displayInput = () => {
        setDisplayTextBox(true);
    }

    return (
        <div>
            <ListGroup>
                <b>{day}</b>
                {sectionNames.map((section) => {
                    return <ListGroupItem>{section}
                        <Section />
                    </ListGroupItem>
                })}
                {(displayTextBox && <NewSection addSect={(text) => addSection(text)} toggleDisplay={() => setDisplayTextBox(false)} />)}
                {(!displayTextBox && <Button onClick={() => displayInput()}>Add Section</Button>)}
            </ListGroup>
        </div>
    )
}

export default Day;
