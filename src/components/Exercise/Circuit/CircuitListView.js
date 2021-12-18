import React, { useState } from "react";
import CircuitModal from "components/Modals/CircuitModal";
import styled from "styled-components";
import { FiX, FiEdit2 } from "react-icons/fi";
import { ListGroupItem, Row } from "reactstrap";

export default function CircuitListView(props) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <ListGroupItem
      color="info"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CircuitModal
        circuit={props.circuit}
        activeModal={modal}
        toggleModal={() => setModal(!modal)}
        addCircuit={props.editEntry}
      />
      <Row style={{ justifyContent: "space-between" }}>
        <b>Circuit</b> ({props.circuit.name})
        {hover && (
          <EditContainer>
            <FiEdit2 onClick={() => setModal(true)} />
            <FiX onClick={() => props.removeEntry(props.exercise)} />
          </EditContainer>
        )}
      </Row>
      <Row>
        <i style={{ fontSize: "70%" }}>
          {props.circuit.exercises.map((exercise, index) => {
            return (index ? ", " : "") + exercise.name;
          })}
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
  ${"" /* ${(props) => (props.isSelected ? `border: 2px solid pink;` : "")} */}
`;
