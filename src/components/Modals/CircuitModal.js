import React, { useState } from 'react';
import { Button, Modal, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";
import ExerciseCircuitCard from 'components/Exercise/Circuit/ExerciseCircuitCard';


const CircuitModal = (props) => {
    return (
        <Modal isOpen={props.activeModal} >
            <ExerciseCircuitCard
              addCircuit={props.addCircuit}
              toggleModal={props.toggleModal}
              circuit={props.circuit}
            />
        </Modal>
    )
}

export default CircuitModal;
