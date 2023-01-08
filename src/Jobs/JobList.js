import React, { useState, useEffect, useContext } from "react";
import UserContext from "../Auth/UserContext";
import JoblyApi from "../Api";
import JobCard from "./JobCard";
import LoadingSpinner from "../Common/Spinner";
import JobSearchForm from "./JobSearchForm";

function JobList() {
  console.debug("JobList")

  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function getJobsFromApi() {
      search();
    }
    getJobsFromApi()
  }, []);

  async function search(query) {
    const jobs = await JoblyApi.getJobs(query);
    setJobs(jobs);
  }

  if(!jobs) return <LoadingSpinner />

  return (
    <>
    <JobSearchForm search={search}/>
    <div className="h5 text-center">All Job Listings</div>
    <div>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyHandle={job.companyHandle}
          companyName={job.companyName}
        />
      ))}
    </div>
    </>
  )
};

export default JobList;