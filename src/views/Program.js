import React, { useState } from "react";
import Week from "../components/ScheduleNew/Week";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getClientWeek } from "repositories/Client";

const tempData = {
  entries: {
    e1: { id: "e1", title: "e1" },
    e2: { id: "e2", title: "e2" },
    e3: { id: "e3", title: "e3" },
  },
  sections: {
    warmup: { id: "warmup", name: "warmup-content", entries: ["e1"] },
    cooldown: {
      id: "cooldown",
      name: "cooldown-content",
      entries: ["e2", "e3"],
    },
    temp: { id: "temp", name: "temp-content", entries: [] },
  },
  days: {
    sat: {
      id: "sat",
      title: "Sat",
      sectionIds: ["warmup", "temp"],
    },
    sun: {
      id: "sun",
      title: "sun",
      sectionIds: ["cooldown"],
    },
    mon: {
      id: "mon",
      title: "mon",
      sectionIds: [],
    },
    tues: {
      id: "tues",
      title: "tues",
      sectionIds: [],
    },
    wed: {
      id: "wed",
      title: "wed",
      sectionIds: [],
    },
    thurs: {
      id: "thurs",
      title: "thurs",
      sectionIds: [],
    },
    fri: {
      id: "fri",
      title: "fri",
      sectionIds: [],
    },
  },
  dayOrder: ["sat", "sun", "mon", "tues", "wed", "thurs", "fri"],
};

const DayContainer = styled.div`
  margin: 1px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 10vw;
`;
const SectionContainer = styled.div`
  margin: 1px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
`;
const Title = styled.h3`
  padding: 8px;
`;
const SectionList = styled.div`
  padding: 8px;
`;

function Entry(props) {
  // console.log(props.entry)
  return (
    <Draggable draggableId={props.entry} index={props.index}>
      {(provided) => (
        <SectionContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onCopy={() => console.log("copy!")}
        >
          {props.entry}
        </SectionContainer>
      )}
    </Draggable>
  );
}

function Section(props) {
  return (
    <Draggable draggableId={props.section.id} index={props.index}>
      {(provided) => (
        <SectionContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.section.name}
          <Droppable droppableId={props.section.id}>
            {(provided) => (
              <SectionList {...provided.droppableProps} ref={provided.innerRef}>
                {props.section.entries.map((entry, index) => (
                  <Entry key={entry.id} entry={entry} index={index} />
                ))}
                {provided.placeholder}
              </SectionList>
            )}
          </Droppable>
        </SectionContainer>
      )}
    </Draggable>
  );
}

function Day(props) {
  return (
    <DayContainer>
      <Title>{props.day.title}</Title>
      <Droppable droppableId={props.day.id}>
        {(provided) => (
          <SectionList {...provided.droppableProps} ref={provided.innerRef}>
            {props.sections.map((section, index) => (
              <Section key={section.id} section={section} index={index} />
            ))}
            {provided.placeholder}
          </SectionList>
        )}
      </Droppable>
    </DayContainer>
  );
}

const ProgramContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-itmes: flex-start;
`;

function Program(props) {
  const [data, setData] = useState(tempData);
  const newData = getClientWeek("test", new Date(2021, 10, 11));
  console.log(newData)
  return (
    <>
      <div className="content">
        <h5 className="text-primary title">Week 1</h5>
        <ProgramContainer>
          <DragDropContext
            onDragEnd={(result) => {
            //   const { destination, source, draggableId } = result;

            //   if (!destination) {
            //     return;
            //   }

            //   if (
            //     destination.droppableId === source.droppableId &&
            //     destination.index === source.index
            //   ) {
            //     return;
            //   }

            //   const start = data.days[source.droppableId];
            //   const finish = data.days[destination.droppableId];

            //   if (start === finish) {
            //     const newSectionIds = Array.from(start.sectionIds);
            //     newSectionIds.splice(source.index, 1);
            //     newSectionIds.splice(destination.index, 0, draggableId);

            //     const newDay = {
            //       ...start,
            //       sectionIds: newSectionIds,
            //     };

            //     const newData = {
            //       ...data,
            //       days: {
            //         ...data.days,
            //         [newDay.id]: newDay,
            //       },
            //     };
            //     setData(newData);
            //     return;
            //   }

            //   const startSectionIds = Array.from(start.sectionIds);
            //   startSectionIds.splice(source.index, 1);
            //   const newStart = {
            //     ...start,
            //     sectionIds: startSectionIds,
            //   };

            //   const finishSectionIds = Array.from(finish.sectionIds);
            //   finishSectionIds.splice(destination.index, 0, draggableId);
            //   const newFinish = {
            //     ...finish,
            //     sectionIds: finishSectionIds,
            //   };

            //   const newData = {
            //     ...data,
            //     days: {
            //       ...data.days,
            //       [newStart.id]: newStart,
            //       [newFinish.id]: newFinish,
            //     },
            //   };
            //   setData(newData);
             }}
          >
            {data.dayOrder.map((dayId) => {
              const day = data.days[dayId];
              const sections = day.sectionIds.map(
                (sectionId) => data.sections[sectionId]
              );

              return <Day key={day.id} day={day} sections={sections} />;
            })}
          </DragDropContext>
        </ProgramContainer>
        <Week data={newData.fitness} />
      </div>
    </>
  );
}
export default Program;
