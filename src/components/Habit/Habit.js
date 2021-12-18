import React, { useState } from "react";
import { ListGroupItem, Row } from "reactstrap";
import styled from "styled-components";
import { FiX, FiEdit2, FiCheck } from "react-icons/fi";

export default function Habit(props) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props.data[props.date][props.index].question??"");
  function editHabit(){
    const tempData = props.data;
    tempData[props.date][props.index].question = text;
    console.log(props.data)
    console.log(tempData)
    props.setData({...tempData});
    setText("");
    setEdit(false);
  }
  function removeHabit(){
      const tempData = props.data;
      tempData[props.date].splice(props.index,1);
      props.setData({...tempData})

  }
  return (
    <ListGroupItem
      color="info"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={`${props.date}-${props.index}`}
    >
      <Row style={{ justifyContent: "space-between" }}>
        {edit ? (
          <>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div>
              <FiCheck onClick={() => editHabit()} />
              <FiX onClick={() => setEdit(false)} />
            </div>
          </>
        ) : (
          <b>{props.data[props.date][props.index].question}</b>
        )}
        {hover && !edit && (
          <EditContainer>
            <FiEdit2 onClick={() => setEdit(true)} />
            <FiX onClick={() => removeHabit()} />
          </EditContainer>
        )}
      </Row>
    </ListGroupItem>
  );
}

const EditContainer = styled.div`
  margin: 1px;
  ${"" /* border: 1px solid lightgrey; */}
  ${"" /* border-radius: 2px; */}
  ${"" /* background-color: white; */}
  ${(props) => (props.isSelected ? `border: 2px solid pink;` : "")}
`;
