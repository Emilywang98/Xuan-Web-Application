import React, { useState, useEffect }  from 'react'
import { Button } from 'reactstrap';

const NewExercise = (props) => {
    const [text, setText] = useState();
    const toggleDisplay = () => props.toggleDisplay();
    const addExercise = (text) => props.addExer(text);

    const onSubmit = () => {
        addExercise(text);
        toggleDisplay();
    }

    return <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        <Button onClick={() => onSubmit()}>Add</Button>
    </div>
}

export default NewExercise;
