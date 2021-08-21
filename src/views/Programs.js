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
  Modal,
} from "reactstrap";
import ProgramModal from "../components/Modals/Program.js";

let tempPrograms = [
  {
    name: "Homework Club",
    desc: "Community, accountability and movement. A six week program focusing on habit forming and physical health.",
  },
  {
    name: "Online Personal Training",
    desc: "Personalized @ home workouts that you will complete on Zoom with me",
  },
];

function Programs(props) {
  const [programs, setPrograms] = useState(tempPrograms);
  const [modalShow, setModalShow] = useState(false);
  const toggle = () => setModalShow(!modalShow);

  return (
    <>
      <div className="content">
        <ProgramModal
          show={modalShow}
          toggle={toggle}
        />
        <Button onClick={() => {
          setModalShow(true)
          console.log("modal")
          }} color="primary" block>
          Add Program
        </Button>
        {programs.map((prop, key) => {
          return (
            <Card>
              <CardBody>
                <h6>{prop.name}</h6>
                <p>{prop.desc}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Programs;
