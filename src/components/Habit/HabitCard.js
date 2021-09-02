import React from 'react'
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

export default function HabitCard() {
    return (
        <div>
            <Card className="card-user">
                <CardHeader>
                    <CardTitle tag="h5">Add Habit</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col className="pr-1" md="5">
                                <FormGroup check>
                                    <label>Select Habit Days</label>
                                    <Input
                                        type="select"
                                        name="selectMulti"
                                        id="exampleSelectMulti"
                                        multiple
                                    >
                                        <option>Sunday</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <label>Enter Question</label>
                                    <Input
                                        defaultValue=""
                                        // disabled
                                        placeholder="Question"
                                        type="text"
                                    />
                                </FormGroup>
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit"
                                >
                                    Add Habit
                                </Button>
                            </Col>
                            <Col>
                                <ListGroup>
                                    <ListGroupItem>
                                        {/* <ListGroupItemHeading>
                            List group item heading
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            Donec id elit non mi porta gravida at eget metus.
                            Maecenas sed diam eget risus varius blandit.
                          </ListGroupItemText> */}
                                        <h6>Sunday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Monday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Tuesday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                            <ListGroupItem>Practice DJ-ing</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Wednesday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Thursday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                            <ListGroupItem>Practice DJ-ing</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Friday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Saturday</h6>
                                        <ListGroup>
                                            <ListGroupItem>Drink 1L of Water</ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}
