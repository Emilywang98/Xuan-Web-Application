import React, { useEffect, useState } from "react";
import { Button, Row } from "reactstrap";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiCheck, FiX, FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import EntryListView from "components/Exercise/SectionEntryListView";

function Entry(props) {
  const entry = props.data.entries[props.id];

  const onClick = (event) => {
    // marking the event as used
    event.preventDefault();
    if (event.ctrlKey) {
      props.toggleSelectionInGroup(props.id, "ENTRY", props.parentId);
    } else {
      props.toggleSelection(props.id, "ENTRY", props.parentId);
    }
  };

  function removeEntry() {
    let newData = { ...props.data };
    delete newData.entries[props.id];
    newData.sections[props.parentId].entryIds = newData.sections[
      props.parentId
    ].entryIds.filter((item) => item !== props.id);
    props.setData(newData);
  };

  function editEntry(entry) {
    let newData = { ...props.data };
    newData.entries[props.id] = entry;
    props.setData(newData);
  }

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <EntryContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onClick}
          isSelected={props.selectedIds.includes(props.id)}
        >
          <EntryListView entry={entry} removeEntry={removeEntry} editEntry={editEntry}/>
        </EntryContainer>
      )}
    </Draggable>
  );
}

export default Entry;

const EntryContainer = styled.div`
  margin: 1px;
  ${"" /* border: 1px solid lightgrey; */}
  ${"" /* border-radius: 2px; */}
  ${"" /* background-color: white; */}
  ${(props) => (props.isSelected ? `border: 2px solid pink;` : "")}
`;
