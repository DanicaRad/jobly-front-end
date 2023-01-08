import React, { useContext, useState } from "react";
import UserContext from "../Auth/UserContext";
import JoblyApi from "../Api";
import TimedAlert from "../Common/TimedAlert";
import {
  Form, 
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

function ProfileForm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  console.debug("currUser in Profile", currUser);
  const [form, setForm] = useState({
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: ""
  });
  const[userInput, updateUserInput] = useState({});
  const [alert, setAlert] = useState(null);

  function handleChange(evt) {
    evt.persist();
    setForm(f => ({...f, [evt.target.name]: evt.target.value}));
    updateUserInput(d => ({...d, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateCurrUser(currUser.username, userInput);
      setCurrUser(updatedUser);
      setAlert(<TimedAlert message={"Profile Updated."} color={"success"}/>)
    } catch(err) {
      console.log(err);
      setAlert(<TimedAlert message={err} color={"danger"}/>);
      return
    }
  }

  const { username, firstName, lastName, email, password } = form;

  return (
    <div>
    <Form className="m-5" onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input 
          name="username"
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input 
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="firstName">First Name</Label>
        <Input 
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name</Label>
        <Input 
          name="lastName"
          value={lastName} 
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary" className="btn btn-sm sm mt-2">Update Profile</Button>
    </Form>
    {alert}
    </div>
  );
};

export default ProfileForm;