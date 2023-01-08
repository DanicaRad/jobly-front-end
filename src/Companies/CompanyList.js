import React, { useEffect, useState } from "react";
import JoblyApi from "../Api";
import CompanySearchForm from "./CompanySearchForm";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../Common/Spinner";

function CompanyList() {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function getCompanies() {
      search()
    }
    getCompanies()
  }, []);

  async function search(searchTerms) {
    let companies = await JoblyApi.getCompanies(searchTerms);
    setCompanies(companies)
  }


  if(!companies) return <LoadingSpinner />

  return (
    <div>
      <CompanySearchForm search={search} />
      {companies.map(c => (
        <CompanyCard 
          key={c.handle}
          name={c.name}
          description={c.description}
          logoUrl={c.logoUrl}
          handle={c.handle}
        />
      ))}
    </div>
  )
};

export default CompanyList;