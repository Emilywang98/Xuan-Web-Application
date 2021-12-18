import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { format } from "date-fns";
import Habit from "./Habit";

export default function HabitDay(props) {
  return (
    <DayContainer>
      <TitleContainer onClick={() => {}}>
        <Title>{format(Date.parse(props.day.replace("-", "/")), "EEEE")}</Title>
      </TitleContainer>
      {props.data &&
      <HabitList>
        {props.data[props.day].map((habit, index) => {
          return (
            <Habit
              date={props.day}
              setData={props.setData}
              data={props.data}
              index={index}
            />
          );
        })}
      </HabitList>}
    </DayContainer>
  );
}

const DayContainer = styled.div`
  margin: 1px;
  padding: 5px;
  border-radius: 2px;
  ${"" /* background-color: white; */}
  width: 100%;
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

const HabitList = styled.div`
  padding: 5px;
`;
