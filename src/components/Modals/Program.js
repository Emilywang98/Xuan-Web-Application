import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import "./Modal.scss";

function ProgramModal(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.toggle}
      centered
      size="xl"
      // contentClassName="full-modal-style"
    >
      <ModalHeader toggle={props.toggle}>Add New Program</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="programInput" sm={3}>
              Program Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="programInput"
                id="programInput"
                placeholder="New program name"
              />
            </Col>
          </FormGroup>
        </Form>
        <h6 className="text-primary">Program</h6>

        <h7>Week 1</h7>
        <ListGroup horizontal>
          <ListGroupItem>
            Sunday
            <ListGroup>
              <ListGroupItem>
                Warm Up
                <ListGroup>
                  <ListGroupItem>Arm Circles</ListGroupItem>
                  <ListGroupItem>Hip Rotations</ListGroupItem>
                  <ListGroupItem>Jump Rope</ListGroupItem>
                  <ListGroupItem>Deep Lunge</ListGroupItem>
                  <Button>Add Exercise</Button>
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Cardio<ListGroup></ListGroup>
                <Button>Add Exercise</Button>
              </ListGroupItem>
              <ListGroupItem>
                Lower Body<ListGroup></ListGroup>
                <Button>Add Exercise</Button>
              </ListGroupItem>
              <ListGroupItem>
                Cool Down<ListGroup></ListGroup>
                <Button>Add Exercise</Button>
              </ListGroupItem>
              <Button>Add Section</Button>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem>
            Monday
            <ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
          <ListGroupItem>
            Tuesday<ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
          <ListGroupItem>
            Wednesday<ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
          <ListGroupItem>
            Thursday<ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
          <ListGroupItem>
            Friday<ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
          <ListGroupItem>
            Saturday<ListGroup></ListGroup>
            <Button>Add Section</Button>
          </ListGroupItem>
        </ListGroup>
        <Button
          onClick={() => {
            //   setModalShow(true)
            console.log("modal");
          }}
          color="primary"
          block
        >
          Add Week
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>
          Save
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProgramModal;
