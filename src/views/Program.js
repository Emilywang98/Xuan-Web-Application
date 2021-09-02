import React from "react";
import {
  CardBody,
  Card,
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
import Week from "../components/Schedule/Week"
function Program(props) {

  return (
    <>
      <div className="content">
        <h5 className="text-primary title">Week 1</h5>
        <Week/>
        <h5 className="text-primary title">Week 2</h5>
        <Week/>
      </div>
    </>
  );
}
export default Program;
