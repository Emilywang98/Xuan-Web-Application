import { Button } from "bootstrap";
import SupersetModal from "components/Modals/SupersetModal";
import React, { useState } from "react";
import { ListGroupItem, Row } from "reactstrap";
import styled from "styled-components";
import { FiX, FiEdit2 } from "react-icons/fi";

export default function SupersetListView(props) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <ListGroupItem
      color="info"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <SupersetModal
        superset={props.superset}
        activeModal={modal}
        toggleModal={() => setModal(!modal)}
        addSuperset={props.editEntry}
      />
    <Row style={{ justifyContent: "space-between" }}>
    <b>Superset</b> ({props.superset.name})
        {hover && (
          <EditContainer>
            <FiEdit2 onClick={() => setModal(true)} />
            <FiX onClick={() => props.removeEntry(props.exercise)} />
          </EditContainer>
        )}
      </Row>
      <Row>
        <i style={{ fontSize: "70%" }}>
          {props.superset.exercises.map((exercise, index) => {
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
