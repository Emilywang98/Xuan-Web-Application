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
import ExerciseExerciseCard from '../Exercise/Exercise/ExerciseExerciseCard';


const ExerciseModal = (props) => {
    return (
        <Modal isOpen={props.activeModal} >
            <ExerciseExerciseCard
              addExercise={props.addExercise}
              toggleModal={props.toggleModal}
              exercise={props.exercise}
            />
        </Modal>
    )
}

export default ExerciseModal;
