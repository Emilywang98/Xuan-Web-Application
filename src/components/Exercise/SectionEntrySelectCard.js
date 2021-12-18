import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  ModalBody,
  Row,
  ModalFooter
} from "reactstrap";

export default function ExerciseSelectCard(props) {
  return (
    <>
      <ModalBody>
        <CardTitle tag="h5">Select Exercise Type</CardTitle>
        <Col>
          <Row>
            <Button onClick={() => props.setModalState("exercise")}>
              Exercise
            </Button>
            <Button onClick={() => props.setModalState("superset")}>
              Superset
            </Button>
            <Button onClick={() => props.setModalState("circuit")}>
              Circuit
            </Button>
          </Row>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            props.toggleModal();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
}
