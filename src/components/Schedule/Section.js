import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "reactstrap";
import SectionEntryModal from "components/Modals/SectionEntryModal";
import EntryListView from "components/Exercise/SectionEntryListView";

const Section = (props) => {
  const [entries, setEntries] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const addEntry = (e) => {
    console.log("new exercise");
    console.log(e);
    setEntries([...entries, e]);
  };

  const toggleModal = () => {
    setActiveModal(!activeModal);
  };

  useEffect(() => {}, [entries]);

  return (
    <div>
      <SectionEntryModal
        addEntry={addEntry}
        activeModal={activeModal}
        toggleModal={toggleModal}
      />
      <ListGroup>
        {entries.map((entry) => {
          return <EntryListView entry={entry} />;
        })}
        <Button onClick={() => toggleModal()}>Add Exercise</Button>
      </ListGroup>
    </div>
  );
};

export default Section;
