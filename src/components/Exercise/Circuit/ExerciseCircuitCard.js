import React, { useEffect, useState } from "react";
import {
  Button,
  CardTitle,
  Col,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  ModalBody,
  Row,
} from "reactstrap";
import ExerciseModal from "../../Modals/ExerciseModal";
import Exercise from "../Exercise/ExerciseListView";
import { v4 as uuidv4 } from "uuid";

export default function ExerciseCircuitCard(props) {
  const [exercises, setExercises] = useState(props.circuit?.exercises??[]);
  const [exerciseIds, setExerciseIds] = useState([]);
  const [name, setName] = useState(props.circuit?.name??"");

  const [exerciseModal, setExerciseModal] = useState(false);

  useEffect(()=>{
    const tempExerciseIds = exercises.map(e => e.id);
    setExerciseIds(tempExerciseIds);
  }, [])

  function addExercise(e) {
    setExerciseIds([...exerciseIds, e.id]);
    setExercises([...exercises, e]);
  }

  function editExercise(e) {
    const index = exerciseIds.indexOf(e.id);
    const exercisesTemp = exercises;
    exercisesTemp[index] = e;
    setExercises([...exercisesTemp]);
  }

  function removeEntry(e){
    const index = exerciseIds.indexOf(e.id);
    const exercisesTemp = exercises;
    const exerciseIdsTemp = exerciseIds;
    exercisesTemp.splice(index, 1);
    exerciseIdsTemp.splice(index, 1);
    setExercises([...exercisesTemp]);
    setExerciseIds([...exerciseIdsTemp]);
  }

  function submitCircuit() {
    const circuit = {
      id: uuidv4(),
      name: name,
      exercises: exercises,
      type: "circuit",
    };
    props.addCircuit(circuit);
    props.toggleModal();
  }
  return (
    <ModalBody>
      <ExerciseModal
        activeModal={exerciseModal}
        toggleModal={() => setExerciseModal(!exerciseModal)}
        addExercise={addExercise}
      />
      <CardTitle tag="h5">Add Circuit</CardTitle>
      <Col>
        <Row>
          <FormGroup>
            <Input
              placeholder="Circuit Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormGroup>
        </Row>
        <Row>
          <ListGroup>
            {exercises.map((e) => {
              return <Exercise exercise={e} editEntry={editExercise} removeEntry={removeEntry}/>;
            })}
          </ListGroup>
        </Row>
        <Row>
          <Button onClick={() => setExerciseModal(!exerciseModal)}>
            Add Exercise
          </Button>
          <Button onClick={() => submitCircuit()}>Save Circuit</Button>
          <Button onClick={() => props.toggleModal()}>Cancel</Button>
        </Row>
      </Col>
    </ModalBody>
  );
}
