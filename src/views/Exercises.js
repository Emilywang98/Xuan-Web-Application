import React, { useState } from "react";
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

let tempExercises = [
  {
    name: "Crunch",
    url: "https://www.youtube.com/watch?v=zbt1g9WX6bA",
  },
  {
    name: "Push Up",
    url: "https://www.youtube.com/watch?v=zbt1g9WX6bA",
  },
  {
    name: "Lunge",
    url: "https://www.youtube.com/watch?v=zbt1g9WX6bA",
  },
  {
    name: "Squat",
    url: "https://www.youtube.com/watch?v=zbt1g9WX6bA",
  },
];

function Exercises(props) {
  const [exercises, setExercises] = useState(tempExercises);
  const handleSubmit = (event) => {
    event.preventDefault();
    let temp =[...exercises];
    temp.push({
      name: event.target.exerciseInput.value,
      url: event.target.urlInput.value,
    })
    setExercises(temp);
  };

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
                <th>Exercise Name</th>
                <th>URL</th>
              </thead>
              <tbody>
                {exercises.map((prop, key) => {
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
