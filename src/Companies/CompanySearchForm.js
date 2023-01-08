import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

function CompanySearchForm({search}) {
  console.debug("CompanySearchForm");
  
  const [searchTerms, updateSearchTerms] = useState({
    name: "",
    minEmployees: "",
    maxEmployees: ""
  });

  function handleChange(evt) {
    evt.persist();
    updateSearchTerms(f => ({...f, [evt.target.name]: evt.target.value}))
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const query = {};
    if(name) query.name = name;
    if(minEmployees) query.minEmployees = minEmployees;
    if(maxEmployees) query.maxEmployees = maxEmployees;
    search(query);
  }

  const { name, minEmployees, maxEmployees } = searchTerms;

  return (
    <div>
    <Form onSubmit={handleSubmit} className="m-5">
      <FormGroup>
        <Label htmlFor="name">Company Name</Label>
        <Input 
          name="name"
          placeholder="search for company by name"
          value={name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="minEmployees">Minimum Employees</Label>
        <Input 
          name="minEmployees"
          type="number"
          placeholder="10"
          value={minEmployees}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="maxEmployees">Maximum Employees</Label>
        <Input 
          name="maxEmployees"
          type="number"
          placeholder="100"
          value={maxEmployees}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary" className="btn btn-sm sm mt-2">
        Search Companies
      </Button>
    </Form>
    </div>
  )
};

export default CompanySearchForm;