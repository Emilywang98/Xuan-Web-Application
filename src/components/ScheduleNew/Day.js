import React, { useEffect, useState } from "react";
import { Button, Row } from "reactstrap";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { FiCheck, FiX, FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import Section from "./Section";

function Day(props) {
  const day = props.data.days[props.id];
  const title = day.title;
  const sections = day.sectionIds;

  const [displayTextBox, setDisplayTextBox] = useState(false);
  const [text, setText] = useState();

  const addSection = () => {
    const newId = uuidv4();
    let newData = props.data;
    newData.sections[newId] = {
      id: newId,
      title: text,
      entryIds: [],
    };
    newData.days[props.id].sectionIds.push(newId);
    props.setData(newData);
    setText("");
    setDisplayTextBox(false);
  };

  const onClick = (event) => {
    // marking the event as used
    event.preventDefault();
    event.preventDefault();
    if (event.ctrlKey) {
      props.toggleSelectionInGroup(props.id, "DAY", props.parentId);
    } else {
      props.toggleSelection(props.id, "DAY", props.parentId);
    }
  };

  return (
    <DayContainer isSelected={props.selectedIds.includes(props.id)}>
      <TitleContainer onClick={onClick}>
        <Title>{title}</Title>
        {!displayTextBox && <FiPlus onClick={() => setDisplayTextBox(true)} />}
      </TitleContainer>
      {displayTextBox && (
        <>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div>
            <FiCheck onClick={() => addSection()} />
            <FiX onClick={() => setDisplayTextBox(false)} />
          </div>
        </>
      )}
      <Droppable droppableId={props.id} type="DAY">
        {(provided) => (
          <SectionList {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((sectionId, index) => (
              <Section
                key={sectionId}
                id={sectionId}
                index={index}
                data={props.data}
                setData={props.setData}
                parentId={props.id}
                selectedIds={props.selectedIds}
                toggleSelection={props.toggleSelection}
                toggleSelectionInGroup={props.toggleSelectionInGroup}
              />
            ))}
            {provided.placeholder}
          </SectionList>
        )}
      </Droppable>
    </DayContainer>
  );
}
export default Day;

const DayContainer = styled.div`
  margin: 1px;
  padding: 5px;
  border-radius: 2px;
  ${"" /* background-color: white; */}
  width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${(props) =>
    props.isSelected
      ? `border: 2px solid green;`
      : "border: 1px solid lightgrey;"}
`;
const Title = styled.h6`
  padding: 5px;
  margin: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SectionList = styled.div`
  ${"" /* padding: 8px; */}
  min-height: 10px;
  flex-grow: 1;
`;
