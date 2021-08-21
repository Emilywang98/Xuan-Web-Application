import React, { useState } from 'react';
import { Button, Modal, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

const defaultWorkouts = [
    'Push-ups',
    'Sit-ups',
    'Pull-ups',
    'Bicep Curls',
]


const ExerciseModal = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const activeModal = props.activeModal;
    const toggleModal = () => props.toggleModal();

    const setWorkoutName = (name) => props.setWorkoutName(name);
    const setWeight = (weight) => props.setWeight(weight);
    const setReps = (reps) => props.setReps(reps);
    const setSets = (set) => props.setSets(set);
    const setVideoLink = (link) => props.setVideoLink(link);
    const setComments = (comment) => props.setComments(comment);

    const handleSubmit = (e) => {
        e.preventDefault();
        setReps(e.target.reps.value);
        setWeight(e.target.weight.value);
        setSets(e.target.sets.value);
        setVideoLink(e.target.link.value);
        setComments(e.target.comments.value);
        toggleModal();
    }

    return (
        <Modal isOpen={activeModal} >
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Workout</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Workout Name</label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                            {props.workoutName}
                            </DropdownToggle>
                            <DropdownMenu>
                                {defaultWorkouts.map((workout) => {
                                    return <DropdownItem onClick={() => {setWorkoutName(workout)}}>{workout}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Reps</label>
                        <Input name="reps" id="reps" placeholder="Reps" type="number" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Weight</label>
                        <Input name="weight" id="weight"  placeholder="Weight" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Number of sets</label>
                      <Input name="sets" id="sets"  placeholder="Sets" type="number" />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Video Link</label>
                      <Input  name="link" id="link"  placeholder="Video URL" type="link" />
                    </FormGroup>
                  </Col>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Comments</label>
                        <Input name="comments" id="comments" type="textarea" placeholder="Type your comments here." />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Add Exercise
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
        </Modal>
    )
}

export default ExerciseModal;
