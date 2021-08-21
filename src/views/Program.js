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
function Program(props) {

  return (
    <>
      <div className="content">
        <h5 className="text-primary title">Week 1</h5>
        <Card>
          <CardBody>
            <ListGroup horizontal>
              <ListGroupItem>
                Sunday
                <ListGroup>
                  <ListGroupItem>
                    Warm Up
                    <ListGroup>
                      <ListGroupItem>Arm Circles</ListGroupItem>
                      <ListGroupItem>Hip Rotations</ListGroupItem>
                      <ListGroupItem>Jump Rope</ListGroupItem>
                      <ListGroupItem>Deep Lunge</ListGroupItem>
                    </ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Cardio<ListGroup></ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Lower Body<ListGroup></ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Cool Down<ListGroup></ListGroup>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Monday
                <ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Tuesday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Wednesday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Thursday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Friday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Saturday<ListGroup></ListGroup>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
        <h5 className="text-primary title">Week 2</h5>
        <Card>
          <CardBody>
            <ListGroup horizontal>
              <ListGroupItem>
                Sunday
                <ListGroup>
                  <ListGroupItem>
                    Warm Up
                    <ListGroup>
                      <ListGroupItem>Arm Circles</ListGroupItem>
                      <ListGroupItem>Hip Rotations</ListGroupItem>
                      <ListGroupItem>Jump Rope</ListGroupItem>
                      <ListGroupItem>Deep Lunge</ListGroupItem>
                    </ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Cardio<ListGroup></ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Lower Body<ListGroup></ListGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    Cool Down<ListGroup></ListGroup>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Monday
                <ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Tuesday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Wednesday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Thursday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Friday<ListGroup></ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                Saturday<ListGroup></ListGroup>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Program;
