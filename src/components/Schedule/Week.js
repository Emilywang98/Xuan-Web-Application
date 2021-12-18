import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import Day from "./Day";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Week = () => {
  return (
    <Col>
      <Row
        style={{
          justifyContent: "center",
        }}
      >
        <ListGroup horizontal>
          {daysOfWeek.map((day) => {
            return (
              <ListGroupItem color="success">
                <Day dayOfWeek={day} />
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Row>
    </Col>
  );
};

export default Week;
