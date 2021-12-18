import React, { useState } from 'react';
import {  Modal, } from 'reactstrap';
import ExerciseSupersetCard from 'components/Exercise/Superset/ExerciseSupersetCard';


const SupersetModal = (props) => {
    return (
        <Modal isOpen={props.activeModal} >
            <ExerciseSupersetCard
              addSuperset={props.addSuperset}
              toggleModal={props.toggleModal}
              superset={props.superset}
            />
        </Modal>
    )
}

export default SupersetModal;
