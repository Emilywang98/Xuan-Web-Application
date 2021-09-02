/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Calendar from "react-calendar";

import Week from "../components/Schedule/Week"
import ExerciseModal from "../components/Modals/ExerciseModal"
import HabitCard from "components/Habit/HabitCard";

function Workout() {
  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [activeModal, setActiveModal] = useState(false);

  const [workoutName, setWorkoutName] = useState('Choose Workout');
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [videoLink, setVideoLink] = useState('No video link.');
  const [comments, setComments] = useState('No comments were added.');

  function selectDate(value) {
    var firstday = new Date(value.setDate(value.getDate() - value.getDay()));
    var lastday = new Date(value.setDate(value.getDate() - value.getDay() + 6));
    console.log(firstday);
    console.log(lastday);
    console.log(value);

    setFirstDate(firstday);
    setLastDate(lastday);
    setDate(value);
  }

  function formatDate(date) {
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  const toggleModal = () => {
    setActiveModal(!activeModal);
  }

  const submitWorkoutInfo = () => {
    // you'd use this to submit the info into a database or something probably
    // would assign default values if nothing input on server-side
    console.log(workoutName);
    console.log(weight);
    console.log(reps);
    console.log(sets);
    console.log(videoLink);
    console.log(comments);
  }

  return (
    //this is the user info section on the top left
    <>
      <div className="content">
        {/* attach this to created (new exercise) buttons and provide input of section where it should b stored */}
        <Button onClick={() => toggleModal()}>Hello</Button>
        <Button onClick={() => submitWorkoutInfo()}>zzzzz</Button>
        <ExerciseModal 
        workoutName={workoutName}
            setWorkoutName={(name) => setWorkoutName(name)}
            setWeight={(weight) => setWeight(weight)}
            setReps={(reps) => setReps(reps)}
            setSets={(set) => setSets(set)}
            setVideoLink={(link) => setVideoLink(link)}
            setComments={(comment) => setComments(comment)}
            activeModal={activeModal}
            toggleModal={() => toggleModal()}
            />
        <Card>
          <CardBody>
            <Calendar calendarType="US" onChange={selectDate} value={date} />
            <h4 className="text-primary title">
              {formatDate(firstDate)} - {formatDate(lastDate)}
            </h4>
            <Week  />
          </CardBody>
        </Card>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <h5 className="title">Xuan-Nguyen-Marshall</h5>
                  </a>
                  <p className="description">@xuanfitness</p>
                </div>
                <p className="description text-center">
                  "I love working out <br />
                  and you should too! <br /> :D"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        12 <br />
                        <small>Files</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        2GB <br />
                        <small>Used</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        24,6$ <br />
                        <small>Spent</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Other members</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/ayo-ogunseinde-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        DJ Khaled <br />
                        <span className="text-muted">
                          {/* <small>Offline</small> */}
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/joe-gardner-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Emily Wang
                        <br />
                        <span className="text-success">
                          {/* <small>Available</small> */}
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/clem-onojeghuo-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Vivian Wu
                        <br />
                        <span className="text-danger">
                          {/* <small>Busy</small> */}
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>

          <Col md="8">
            {/* <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Workout</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Workout Name</label>
                        <Input
                          defaultValue=""
                          // disabled
                          placeholder="Workout"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Reps</label>
                        <Input defaultValue="" placeholder="Reps" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Weight</label>
                        <Input placeholder="Weight" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Number of sets</label>
                      <Input placeholder="Sets" type="text" />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Video Link</label>
                      <Input defaultValue="" placeholder="Video" type="link" />
                    </FormGroup>
                  </Col>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Comments</label>
                        <Input type="textarea" defaultValue="" />
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
            </Card> */}
            <HabitCard/>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Workout;
