import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function SignupForm({ signup }) {
  const history = useHistory();

  const [form, updateForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  function handleChange(evt) {
    evt.persist();
    updateForm(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(form);
    history.push("/")
  };

  const { username, password, firstName, lastName, email } = form;

  return (
    <Form className="m-5" onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input 
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input 
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="firstName">First Name</Label>
        <Input 
          name="firstName"
          placeholder="first name"
          value={firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name</Label>
        <Input 
          name="lastName"
          placeholder="last name"
          value={lastName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
      </FormGroup>
      <Button color="primary" className="btn btn-sm sm mt-2" type="submit">Sign Up</Button>
    </Form>
  )
};

export default SignupForm;