import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import NewExercise from './NewExercise';
import Exercise from './Exercise';

const Section = () => {

    const [exercises, setExercises] = useState([]);
    const [displayTextBox, setDisplayTextBox] = useState(false);

    const addExercise = (text) => {
        setExercises([...exercises, text]);
    }

    // change this to display the modal; input some indicator of what section you're in
    // also remove the text box
    const displayInput = () => {
        setDisplayTextBox(true);
    }

    useEffect(() => {

    }, [exercises])

    return (
        <div>
            <ListGroup>
                {exercises.map((exercise) => {
                    return <Exercise name={exercise} />
                })}
                {(displayTextBox && <NewExercise addExer={(text) => addExercise(text)} toggleDisplay={() => setDisplayTextBox(false)} />)}
                {(!displayTextBox && <Button onClick={() => displayInput()}>Add Exercise</Button>)}
            </ListGroup>
        </div>
    )
}


export default Section;
