import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

// minsalary, hasEquity, title => job

function JobSearchForm({search}) {
  console.debug("CompanySearchForm");
  
  const [searchTerms, updateSearchTerms] = useState({
    title: "",
    minSalary: "",
    hasEquity: false
  });

  function handleChange(evt) {
    evt.persist();
    updateSearchTerms(f => ({...f, [evt.target.name]: evt.target.value}))
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const query = {};
    if(title) query.title = title;
    if(minSalary) query.minSalary = minSalary;
    if(hasEquity) query.hasEquity = true;
    console.log("query", query)
    search(query);
  }

  const { title, minSalary, hasEquity } = searchTerms;

  return (
    <div>
    <Form onSubmit={handleSubmit} className="mx-5">
      <FormGroup>
        <Label htmlFor="title">Job Title</Label>
        <Input 
          name="title"
          placeholder="search for a job by title"
          value={title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="minSalary">Minimum Salary</Label>
        <Input 
          name="minSalary"
          type="number"
          placeholder="60,000"
          value={minSalary}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup check>
        <Input 
          name="hasEquity"
          type="checkbox"
          onChange={handleChange}
        />
        <Label check>Has Equity</Label>
      </FormGroup>
      <Button type="submit" color="primary" className="btn btn-sm sm mt-2">Search Jobs</Button>
    </Form>
    </div>
  )
};

export default JobSearchForm;