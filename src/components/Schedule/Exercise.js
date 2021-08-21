import { Button } from "bootstrap";
import React from "react";
import { ListGroupItem, Row } from "reactstrap";

export default function Exercise(props) {
  return (
    <ListGroupItem color="info">
        {props.name}
    </ListGroupItem>
  );
}
