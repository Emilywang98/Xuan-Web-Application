import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalBody,
} from "reactstrap";
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
import { getExercisesRepo } from "repositories/Exercises";
import { v4 as uuidv4 } from "uuid";

export default function ExerciseExerciseCard(props) {
  //exercise dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [exercise, setExercise] = useState(props.exercise??{});

  const [invalidFields, setInvalidFields] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    const required = ["name", "reps", "weight", "sets", "url"];
    let valid = true;

    const toSubmit = {
      id: exercise.id??uuidv4(),
      name: exercise.name,
      reps: e.target.reps.value,
      weight: e.target.weight.value,
      sets: e.target.sets.value,
      url: e.target.url.value,
      cues: e.target.comments.value,
      setComplete: "0",
      comments: "",
      type: "exercise",
    };

    let invalidTemp = {};
    required.forEach((attr) => {
      if (!toSubmit[attr]) {
        valid = false;
        invalidTemp[attr] = true;
      }
    });

    if (valid) {
      props.addExercise(toSubmit);
      props.toggleModal();
      setInvalidFields(null);
    } else {
      setInvalidFields(invalidTemp);
    }
  };

  const [defaultExercises, setDefaultExercises] = useState([]);
  async function getDefaultExercises() {
    // const exerciseSnapshot = await getDocs(collection(db, 'exercises'));
    // const exerciseList = exerciseSnapshot.docs.map(doc => {return {...doc.data(), key:doc.id}});
    // console.log(exerciseList);
    const exerciseList = await getExercisesRepo();
    setDefaultExercises(exerciseList);
  }
  useEffect(() => {
    getDefaultExercises();
  }, []);

  function setExerciseFromDefault(defaultExercise) {
    let tempExercise = exercise;
    Object.keys(defaultExercise).forEach(function (key) {
      tempExercise[key] = defaultExercise[key];
    });
    setExercise(tempExercise);
  }

  return (
    <ModalBody>
      <CardTitle tag="h5">Add Exercise</CardTitle>
      {invalidFields ? (
        <div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col className="pr-1" md="5">
                <FormGroup>
                  <label>Exercise Name</label>
                  <Dropdown
                    size="s"
                    isOpen={dropdownOpen}
                    toggle={toggleDropdown}
                    valid={!invalidFields.name}
                  >
                    <DropdownToggle caret>
                      {exercise.name ?? "Exercise Name"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {defaultExercises.map((defaultExercise) => {
                        return (
                          <DropdownItem
                            onClick={() => {
                              setExerciseFromDefault(defaultExercise);
                            }}
                          >
                            {defaultExercise.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>
            </Row>
            <Col className="pl-1">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>Reps</label>
                    <Input
                      name="reps"
                      id="reps"
                      placeholder="Reps"
                      type="number"
                      defaultValue={exercise.reps}
                      valid={!invalidFields.reps}
                      invalid={invalidFields.reps}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Weight</label>
                    <Input
                      name="weight"
                      id="weight"
                      placeholder="Weight"
                      type="number"
                      value={exercise.weight}
                      valid={!invalidFields.weight}
                      invalid={invalidFields.weight}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Number of sets</label>
                    <Input
                      name="sets"
                      id="sets"
                      placeholder="Sets"
                      type="number"
                      defaultValue={exercise.sets}
                      valid={!invalidFields.sets}
                      invalid={invalidFields.sets}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label>Video Link</label>
                <Input
                  name="url"
                  id="url"
                  placeholder="Video URL"
                  type="link"
                  defaultValue={exercise.url}
                  valid={!invalidFields.url}
                  invalid={invalidFields.url}
                />
              </FormGroup>
              <FormGroup>
                <label>Comments</label>
                <Input
                  name="comments"
                  id="comments"
                  type="textarea"
                  placeholder="Type your comments here."
                  defaultValue={exercise.comments}
                />
              </FormGroup>
            </Col>
            <Row>
              <div className="update ml-auto mr-auto">
                <Button className="btn-round" color="primary" type="submit">
                  Add Exercise
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      ) : (
        <div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col className="pr-1" md="5">
                <FormGroup>
                  <label>Exercise Name</label>
                  <Dropdown
                    size="s"
                    isOpen={dropdownOpen}
                    toggle={toggleDropdown}
                  >
                    <DropdownToggle caret>
                      {exercise.name ?? "Exercise Name"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {defaultExercises.map((defaultExercise) => {
                        return (
                          <DropdownItem
                            onClick={() => {
                              setExerciseFromDefault(defaultExercise);
                            }}
                          >
                            {defaultExercise.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Col>
            </Row>
            <Col className="pl-1">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>Reps</label>
                    <Input
                      name="reps"
                      id="reps"
                      placeholder="Reps"
                      type="number"
                      defaultValue={exercise.reps}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Weight</label>
                    <Input
                      name="weight"
                      id="weight"
                      placeholder="Weight"
                      type="number"
                      defaultValue={exercise.weight}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Number of sets</label>
                    <Input
                      name="sets"
                      id="sets"
                      placeholder="Sets"
                      type="number"
                      defaultValue={exercise.sets}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label>Video Link</label>
                <Input
                  name="url"
                  id="url"
                  placeholder="Video URL"
                  type="link"
                  defaultValue={exercise.url}
                />
              </FormGroup>
              <FormGroup>
                <label>Comments</label>
                <Input
                  name="comments"
                  id="comments"
                  type="textarea"
                  placeholder="Type your comments here."
                  defaultValue={exercise.comments}
                />
              </FormGroup>
            </Col>
            <Row>
              <div className="update ml-auto mr-auto">
                <Button className="btn-round" color="primary" type="submit">
                  Add Exercise
                </Button>
                <Button className="btn-round" color="secondary" onClick={props.toggleModal}>
                  Cancel
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      )}
    </ModalBody>
  );
}
