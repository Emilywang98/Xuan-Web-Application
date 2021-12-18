import { format } from "date-fns";
import React, { useState } from "react";
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
import HabitDay from "./HabitDay";

export default function HabitCard(props) {
  const [selectedDays, setSelectedDays] = useState([]);
  const habitInput = "";
  function addHabit(event) {
    event.preventDefault();
    const input = event.target[1].value;
    if (input.length === 0) return;

    const tempData = props.data;
    Object.keys(props.data).forEach((date) => {
      if (selectedDays.includes(date)) {
        tempData[date].push({
          question: input,
        });
      }
    });
    event.target[1].value = "";
    props.setData(tempData);
  }
  function onDaySelect(event) {
    event.preventDefault();
    let opts = [],
      opt;
    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i];
      if (opt.selected) {
        opts.push(opt.id);
      }
    }
    setSelectedDays(opts);
  }

  return (
    <div>
      <Card className="card-user">
        <CardHeader>
          <CardTitle tag="h5">Add Habit</CardTitle>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addHabit(e);
            }}
          >
            <Row>
              <Col className="pr-1" md="5">
                <FormGroup check>
                  <label>Select Habit Days</label>
                  <Input
                    type="select"
                    name="selectMulti"
                    id="exampleSelectMulti"
                    onChange={onDaySelect}
                    multiple
                  >
                    {Object.keys(props.data).map((date) => {
                      return (
                        <option key={date} id={date}>
                          {format(Date.parse(date.replace(/-/g, "/")), "E")}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label>Enter Question</label>
                  <Input defaultValue="" placeholder="Question" type="text" />
                </FormGroup>
                <Button className="btn-round" color="primary" type="submit">
                  Add Habit
                </Button>
              </Col>
              <Col>
                <ListGroup>
                  {Object.keys(props.data).map((date) => {
                    return (
                      <HabitDay
                        day={date}
                        data={props.data}
                        setData={props.setData}
                      />
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
