import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';


const NewSection = (props) => {
    const [text, setText] = useState();
    const toggleDisplay = () => props.toggleDisplay();
    const addSection = (text) => props.addSect(text);

    const onSubmit = () => {
        addSection(text);
        toggleDisplay();
    }

    return <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        <Button onClick={() => onSubmit()}>Add</Button>
    </div>
}

export default NewSection
