import { Button } from "bootstrap";
import React from "react";
import CircuitListView from "./Circuit/CircuitListView";
import ExerciseListView from "./Exercise/ExerciseListView";
import SupersetListView from "./Superset/SupersetListView";

export default function EntryListView(props) {
  switch (props.entry.type) {
    case "exercise":
      return (
        <ExerciseListView
          exercise={props.entry}
          removeEntry={props.removeEntry}
          editEntry={props.editEntry}
        />
      );
    case "superset":
      return (
        <SupersetListView
          superset={props.entry}
          removeEntry={props.removeEntry}
          editEntry={props.editEntry}
        />
      );
    case "circuit":
      return (
        <CircuitListView
          circuit={props.entry}
          removeEntry={props.removeEntry}
          editEntry={props.editEntry}
        />
      );
    default:
  }
}
