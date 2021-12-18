import React, { useState } from "react";
import { Button, Modal, ModalFooter } from "reactstrap";
import ExerciseCircuitCard from "../Exercise/Circuit/ExerciseCircuitCard";
import ExerciseExerciseCard from "../Exercise/Exercise/ExerciseExerciseCard";
import ExerciseSelectCard from "../Exercise/SectionEntrySelectCard";
import ExerciseSupersetCard from "../Exercise/Superset/ExerciseSupersetCard";

const SectionEntryModal = (props) => {
  //add to section
  const addEntry = props.addEntry;
  //modal active state
  const activeModal = props.activeModal;
  const toggleModal = () => {
    setModalState("select");
    props.toggleModal();
  };
  //modal state
  const [modalState, setModalState] = useState("select");
  function renderModal() {
    switch (modalState) {
      case "select":
        return (
          <ExerciseSelectCard
            setModalState={(state) => {
              setModalState(state);
            }}
            toggleModal={toggleModal}
          />
        );
      case "exercise":
        return (
          <ExerciseExerciseCard
            addExercise={addEntry}
            toggleModal={toggleModal}
          />
        );
      case "superset":
        return (
          <ExerciseSupersetCard
            addSuperset={addEntry}
            toggleModal={toggleModal}
          />
        );
      case "circuit":
        return (
          <ExerciseCircuitCard
            addCircuit={addEntry}
            toggleModal={toggleModal}
          />
        );
      default:
    }
  }

  return (
    <Modal isOpen={activeModal}>
      {renderModal()}
    </Modal>
  );
};

export default SectionEntryModal;
