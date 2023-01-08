import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../Api";
import Spinner from "../Common/Spinner";
import JobCard from "../Jobs/JobCard";

function CompanyDetail() {
  console.debug("CompanyDetail");
  const { handle } = useParams()

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompanyAndJobs() {
      setCompany(await JoblyApi.getCompany(handle))
    }
    getCompanyAndJobs();
  }, [handle]);

  if(!company) return <Spinner />

  return (
    <div>  
      <div className="mx-5">
        <div className="h3">{company.name}</div>
        <p>
          {company.description}
        </p>
        <div className="h5 mt-5">Job Listings</div>
      </div>
        <div className="">
          {company.jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={company.name}
              companyHandle={job.companyHandle}
            />
          ))}
        </div>
    </div>
  )
};

export default CompanyDetail;