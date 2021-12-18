import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { getClientWeek } from "repositories/Client";

import {getExercisesRepo, addExercisesRepo} from "../repositories/Exercises";

function Exercises(props) {
  const [exercises, setExercises] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exercise = {
      name : event.target.exerciseInput.value,
      url : event.target.urlInput.value
    }
    const exerciseList = await addExercisesRepo(exercise);
    setExercises([...exerciseList]);

    event.target.reset();
  };

  async function getExercises(){
    const exerciseList = await getExercisesRepo();
    setExercises(exerciseList);
  }

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            <h5 className="text-primary title">Add New Exercise</h5>
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="exerciseInput" sm={2}>
                  Exercise Name
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="exerciseInput"
                    id="exerciseInput"
                    placeholder="New exercise name"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="urlInput" sm={2}>
                  URL
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="urlInput"
                    id="urlInput"
                    placeholder="New exercise URL"
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button type="submit">Add</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>Exercise Name</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {exercises==null?<div></div>:exercises.map((prop, key) => {
                  return (
                    <tr>
                      <td>{prop.name}</td>
                      <td>{prop.url}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Exercises;
