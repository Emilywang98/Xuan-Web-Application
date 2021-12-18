import React, { useEffect, useState } from "react";
import { Button, Row } from "reactstrap";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiCheck, FiX, FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import SectionEntryModal from "components/Modals/SectionEntryModal";
import Entry from "./Entry";

function Section(props) {
  const section = props.data.sections[props.id];
  const title = section.title;
  const entries = section.entryIds;

  const [activeModal, setActiveModal] = useState(false);
  const addEntry = (newEntry) => {
    let newData = { ...props.data };
    newData.entries[newEntry.id] = newEntry;
    newData.sections[props.id].entryIds.push(newEntry.id);
    console.log(newData);
    props.setData(newData);
    setActiveModal(false);
  };
  const toggleModal = () => setActiveModal(!activeModal);

  const removeSection = () => {
    let newData = { ...props.data };
    entries.forEach((entryId) => {
      delete newData.entries[entryId];
    });
    console.log(props.parentId);
    newData.days[props.parentId].sectionIds = newData.days[
      props.parentId
    ].sectionIds.filter((item) => item !== props.id);
    delete newData.sections[props.id];
    props.setData(newData);
  };

  const onClick = (event) => {
    // marking the event as used
    event.preventDefault();
    if (event.ctrlKey) {
      props.toggleSelectionInGroup(props.id, "SECTION", props.parentId);
    } else {
      props.toggleSelection(props.id, "SECTION", props.parentId);
    }
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <SectionContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isSelected={props.selectedIds.includes(props.id)}
        >
          <TitleContainer onClick={onClick}>
            <Title>{title}</Title>
            <div>
              <FiPlus
                onClick={(e) => {
                  setActiveModal(true);
                }}
              />
              <FiX onClick={() => removeSection()} />
            </div>
          </TitleContainer>
          <SectionEntryModal
            addEntry={addEntry}
            activeModal={activeModal}
            toggleModal={toggleModal}
          />
          <Droppable droppableId={props.id} type="SECTION">
            {(provided) => (
              <EntryList ref={provided.innerRef} {...provided.droppableProps}>
                {provided.placeholder}
                {props.data.sections[props.id].entryIds.map(
                  (entryId, index) => (
                    <Entry
                      key={entryId}
                      id={entryId}
                      index={index}
                      data={props.data}
                      setData={props.setData}
                      parentId={props.id}
                      selectedIds={props.selectedIds}
                      toggleSelection={props.toggleSelection}
                      toggleSelectionInGroup={props.toggleSelectionInGroup}
                    />
                  )
                )}
              </EntryList>
            )}
          </Droppable>
        </SectionContainer>
      )}
    </Draggable>
  );
}

export default Section;

const Title = styled.p`
  padding: 5px;
  margin: 0;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
  padding: 1px 5px;
`;
const SectionContainer = styled.div`
  margin: 5px 0px;
  background-color: lightgrey;
  ${(props) => (props.isSelected ? `border: 2px solid blue;` : "")}
`;
const EntryList = styled.div`
  padding: 2px 0px;
  min-height: 100px;
`;
