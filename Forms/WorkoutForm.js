import * as React from "react";
import { useForm } from "react-hook-form";
import Headers from "./Header";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Headers />
      <ReactTextField
        name="Exercise"
        type="text"
        placeholder="Enter Exercise"
        validators={usernameValidators}
        // successMessage=""
        />
        <ReactTextField
        name="Rest time"
        type="text"
        placeholder="username"
        validators={usernameValidators}
        successMessage="This Username is available."
        />

      <TextInput source="Execise" validate={required()} />
      <TextInput source="Rest Time" validate={required()} />
      <input {...register("firstName")} placeholder="First name" />
      <input {...register("lastName")} placeholder="Last name" />
      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input type="submit" />
    </form>
  );
}