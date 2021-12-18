import React, { useState } from "react";
import { Col, ListGroupItem, Row, Button } from "reactstrap";
import styled from "styled-components";
import { FiX, FiEdit2 } from "react-icons/fi";
import ExerciseModal from "components/Modals/ExerciseModal";

export default function ExerciseListView(props) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <ListGroupItem
      color="info"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ExerciseModal
        exercise={props.exercise}
        activeModal={modal}
        toggleModal={() => setModal(!modal)}
        addExercise={props.editEntry}
      />
      <Row style={{ justifyContent: "space-between" }}>
        <b>{props.exercise.name}</b>
        {hover && (
          <EditContainer>
            <FiEdit2 onClick={() => setModal(true)} />
            <FiX onClick={() => props.removeEntry(props.exercise)} />
          </EditContainer>
        )}
      </Row>
      <Row>
        <i style={{ fontSize: "70%" }}>
          {/* Weight: {props.exercise.weight}, Reps: {props.exercise.reps}, Sets:{" "}
        {props.exercise.sets} */}
          {props.exercise.weight} x {props.exercise.reps} reps x{" "}
          {props.exercise.sets} sets
        </i>
      </Row>
    </ListGroupItem>
  );
}

const EditContainer = styled.div`
  margin: 1px;
  ${"" /* border: 1px solid lightgrey; */}
  ${"" /* border-radius: 2px; */}
  ${"" /* background-color: white; */}
  ${(props) => (props.isSelected ? `border: 2px solid pink;` : "")}
`;
