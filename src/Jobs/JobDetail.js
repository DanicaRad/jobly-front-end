import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../Api";
import LoadingSpinner from "../Common/Spinner";
import JobCard from "./JobCard";
import CompanyCard from "../Companies/CompanyCard";

function JobDetail() {
  console.debug("JobDetail");

  const {id} = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function getJobFromApi() {
      setJob(await JoblyApi.getJob(id));
    }
    getJobFromApi();
  }, [id]);

  if(!job) return <LoadingSpinner />
   
   return (
    <>
    <JobCard
      id={job.id}
      title={job.title}
      salary={job.salary}
      equity={job.equity}
      companyHandle={job.company.handle}
      companyName={job.company.name}
    />
    <CompanyCard 
      name={job.company.name}
      description={job.company.description}
      logoUrl={job.company.logoUrl}
      handle={job.company.handle}
    />
    </>
   )
};

export default JobDetail;