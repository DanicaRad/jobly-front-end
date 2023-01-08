import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function LoginForm({ login }) {
  const history = useHistory();

  const [form, updateForm] = useState({
    username: "",
    password: ""
  });

  function handleChange(evt) {
    evt.persist();
    updateForm(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(form);
    history.push("/")
  };

  const { username, password } = form;

  return (
    <Form className="mt-5" onSubmit={handleSubmit}>
      <div className="fs-2 lead text-center my-3">Welcome Back.</div>
      <Row className="row-cols-lg-auto g-3 align-items-center justify-content-center">
      <Col className="col">
        <Label htmlFor="username" hidden>Username</Label>
        <Input 
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />
      </Col>
      <Col className="col">
        <Label htmlFor="password" hidden>Password</Label>
        <Input 
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
      </Col>
      <Col className="col">
        <Button color="primary" className="btn btn-sm sm mt-2" type="submit">Login</Button>
      </Col>
      </Row>
    </Form>
  )
};

export default LoginForm;