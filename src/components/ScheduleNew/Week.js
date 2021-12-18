import React, { useEffect, useState, useRef } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Day from "./Day";
import { v4 as uuidv4 } from "uuid";

const Week = (props) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedParentIds, setSelectedParentIds] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  function unselectAll() {
    setSelectedIds([]);
    setSelectedParentIds([]);
    setSelectedType(null);
  }
  function toggleSelection(id, type, parentId) {
    if (!selectedIds.includes(id) || selectedIds.length > 1) {
      setSelectedType(type);
      setSelectedIds([id]);
      setSelectedParentIds([parentId]);
    } else {
      unselectAll();
    }
  }
  function toggleSelectionInGroup(id, type, parentId) {
    if (!selectedType) {
      setSelectedType(type);
    } else if (type !== selectedType) {
      return;
    }

    const index = selectedIds.indexOf(id);
    if (index === -1) {
      setSelectedIds([...selectedIds, id]);
      setSelectedParentIds([...selectedParentIds, parentId]);
    } else {
      const shallow = [...selectedIds];
      shallow.splice(index, 1);
      setSelectedIds(shallow);
      const shallowParent = [...selectedParentIds];
      shallowParent.splice(index, 1);
      setSelectedParentIds(shallowParent);
      if (shallow.length === 0) setSelectedType(null);
    }
  }

  function onDragEndSection(src, dst, draggableId) {
    const start = props.data.sections[src.droppableId];
    const finish = props.data.sections[dst.droppableId];

    if (start === finish) {
      const newEntryIds = Array.from(start.entryIds);
      newEntryIds.splice(src.index, 1);
      newEntryIds.splice(dst.index, 0, draggableId);

      const newSection = {
        ...start,
        entryIds: newEntryIds,
      };

      const newData = {
        ...props.data,
        sections: {
          ...props.data.sections,
          [newSection.id]: newSection,
        },
      };
      props.setData(newData);
    } else {
      const startEntryIds = Array.from(start.entryIds);
      startEntryIds.splice(src.index, 1);
      const newStart = {
        ...start,
        entryIds: startEntryIds,
      };

      const finishEntryIds = Array.from(finish.entryIds);
      finishEntryIds.splice(dst.index, 0, draggableId);
      const newFinish = {
        ...finish,
        entryIds: finishEntryIds,
      };

      const newData = {
        ...props.data,
        sections: {
          ...props.data.sections,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      console.log("onDragEndSection")
      console.log(newData)
      props.setData(newData);
    }
  }
  function onDragEndDay(src, dst, draggableId) {
    const start = props.data.days[src.droppableId];
    const finish = props.data.days[dst.droppableId];

    if (start === finish) {
      const newSectionIds = Array.from(start.sectionIds);
      newSectionIds.splice(src.index, 1);
      newSectionIds.splice(dst.index, 0, draggableId);

      const newDay = {
        ...start,
        sectionIds: newSectionIds,
      };

      const newData = {
        ...props.data,
        days: {
          ...props.data.days,
          [newDay.id]: newDay,
        },
      };
      props.setData(newData);
    } else {
      const startSectionIds = Array.from(start.sectionIds);
      startSectionIds.splice(src.index, 1);
      const newStart = {
        ...start,
        sectionIds: startSectionIds,
      };

      const finishSectionIds = Array.from(finish.sectionIds);
      finishSectionIds.splice(dst.index, 0, draggableId);
      const newFinish = {
        ...finish,
        sectionIds: finishSectionIds,
      };

      const newData = {
        ...props.data,
        days: {
          ...props.data.days,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      props.setData(newData);
    }
  }
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    if (!selectedType) {
      if (result.type === "SECTION") {
        onDragEndSection(source, destination, draggableId);
      } else if (result.type === "DAY") {
        onDragEndDay(source, destination, draggableId);
      }
    } else if (selectedType === "SECTION") {
      let newData = props.data;
      const newParentId = destination.droppableId;
      const newParentDay = props.data.days[newParentId];
      selectedIds.forEach((value, index) => {
        const oldParentId = selectedParentIds[index];
        const oldParentDay = props.data.days[oldParentId];

        oldParentDay.sectionIds = oldParentDay.sectionIds.filter(
          (item) => item !== value
        );
        newParentDay.sectionIds.push(value);

        newData.days[oldParentId] = oldParentDay;
      });
      newData.days[newParentId] = newParentDay;
      props.setData(newData);
      setSelectedParentIds(Array(selectedParentIds.length).fill(newParentId));
    } else if (selectedType === "ENTRY") {
      let newData = props.data;
      const newParentId = destination.droppableId;
      const newParentSection = props.data.sections[newParentId];
      selectedIds.forEach((value, index) => {
        const oldParentId = selectedParentIds[index];
        const oldParentSection = props.data.sections[oldParentId];

        oldParentSection.entryIds = oldParentSection.entryIds.filter(
          (item) => item !== value
        );
        newParentSection.entryIds.push(value);

        newData.days[oldParentId] = oldParentSection;
      });
      newData.days[newParentId] = newParentSection;
      props.setData(newData);
      setSelectedParentIds(Array(selectedParentIds.length).fill(newParentId));
    }
  }
  function onDragStart(start) {
    if (!selectedIds.includes(start.draggableId)) {
      unselectAll();
    }
  }

  function windowCopy(event) {
    if (selectedType === "DAY") {
      const copiedSections = selectedIds.map((dayId) => {
        const selectedDay = props.data.days[dayId];
        return selectedDay.sectionIds.map((sectionId) => {
          const { title, entryIds } = props.data.sections[sectionId];
          const entries = entryIds.map((entryId) => {
            const { id, ...entry } = props.data.entries[entryId];
            return entry;
          });
          return {
            title: title,
            entries: entries,
          };
        });
      });
      const copiedSectionsFlat = Array.prototype.concat.apply([], copiedSections);
      localStorage.setItem("copied", JSON.stringify(copiedSectionsFlat));
      localStorage.setItem("copiedType", "SECTION");
    } else if (selectedType === "SECTION") {
      const copiedSections = selectedIds.map((sectionId) => {
        const { title, entryIds } = props.data.sections[sectionId];
        const entries = entryIds.map((entryId) => {
          const { id, ...entry } = props.data.entries[entryId];
          return entry;
        });
        return {
          title: title,
          entries: entries,
        };
      });
      localStorage.setItem("copied", JSON.stringify(copiedSections));
      localStorage.setItem("copiedType", "SECTION");
    } else if (selectedType === "ENTRY") {
      const copiedEntries = selectedIds.map((entryId) => {
        const { id, ...entry } = props.data.entries[entryId];
        return entry;
      });
      localStorage.setItem("copied", JSON.stringify(copiedEntries));
      localStorage.setItem("copiedType", "ENTRY");
    }
  }

  function windowPaste(event) {
    const copiedType = localStorage.getItem("copiedType");
    if (selectedType === "DAY" && copiedType === "SECTION") {
      const copiedSections = JSON.parse(localStorage.getItem("copied"));
      const newData = props.data;
      selectedIds.forEach((selectedId) => {
        const newIds = [];
        copiedSections.forEach((section) => {
          const newId = uuidv4();
          newIds.push(newId);
          section.entryIds = [];
          section.entries.forEach((entry) => {
            const newEntryId = uuidv4();
            newData.entries[newEntryId] = { id: newEntryId, ...entry };
            section.entryIds.push(newEntryId);
          });
          const { entries, ...sectionInfo } = section;
          newData.sections[newId] = { id: newId, ...sectionInfo };
        });
        newData.days[selectedId].sectionIds =
          newData.days[selectedId].sectionIds.concat(newIds);
      });
      props.setData(newData);
      unselectAll();
    } else if (selectedType === "SECTION" && copiedType === "ENTRY") {
      const copiedEntries = JSON.parse(localStorage.getItem("copied"));
      const newData = props.data;
      selectedIds.forEach((selectedId) => {
        const newIds = [];
        copiedEntries.forEach((entry) => {
          const newId = uuidv4();
          newData.entries[newId] = { id: newId, ...entry };
          newIds.push(newId);
        });
        newData.sections[selectedId].entryIds =
          newData.sections[selectedId].entryIds.concat(newIds);
      });
      props.setData(newData);
      unselectAll();
    }
  }

  useEffect(() => {
    window.addEventListener("click", windowUnselect);
    window.addEventListener("touchend", windowUnselect);
    return () => {
      window.removeEventListener("click", windowUnselect);
      window.removeEventListener("touchend", windowUnselect);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("copy", windowCopy);
    window.addEventListener("paste", windowPaste);
    return () => {
      window.removeEventListener("copy", windowCopy);
      window.removeEventListener("paste", windowPaste);
    };
  }, [selectedIds]);

  function windowUnselect(e) {
    if (e.defaultPrevented) return;
    unselectAll();
  }

  return (
    <ProgramContainer>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result)}
        onDragStart={(start) => onDragStart(start)}
      >
        {props.data.dayOrder.map((dayId) => {
          const day = props.data.days[dayId];
          return (
            <Day
              key={day.id}
              id={day.id}
              data={props.data}
              setData={props.setData}
              selectedIds={selectedIds}
              toggleSelection={(id, type, parentId) =>
                toggleSelection(id, type, parentId)
              }
              toggleSelectionInGroup={(id, type, parentId) =>
                toggleSelectionInGroup(id, type, parentId)
              }
            />
          );
        })}
      </DragDropContext>
    </ProgramContainer>
  );
};

export default Week;

const ProgramContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-itmes: flex-start;
  margin: 10px 0px;
`;
