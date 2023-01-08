import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import TimedAlert from "../Common/TimedAlert";
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button
} from "reactstrap";

function JobCard({id, title, salary, equity, companyHandle, companyName }) {
  const { applyForJob, hasAppliedForJob } = useContext(UserContext);
  const [applied, setApplied] = useState();
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    setApplied(hasAppliedForJob(id));
  }, [id, applied])


  async function handleApply(evt) {
    evt.preventDefault();
    if(hasAppliedForJob(id)) {
      showAlert("You have already submitted this application.", "danger");
      return;
    }
    const res = await applyForJob(id);
    setApplied(true);
    showAlert(`Application for ${title} submitted.`, "success");
  }

  function showAlert(message, color) {
    setAlert(<TimedAlert message={message} color={color} />);
  }

  return (
    <>
    <Card key={id} className="mx-5 mb-5">
      <Link className="text-decoration-none" to={`../jobs/${id}`}>
      <CardBody>
        <CardTitle className="h5 text-decoration-none">{title}</CardTitle>
      </CardBody>
      </Link>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="text-decoration-none" to={`companies/${companyHandle}`}>{companyName}</Link></li>
          <li className="list-group-item">Salary: ${salary}</li>
          { equity &&
            <li className="list-group-item">Equity: ${equity}</li>
          }
        </ul>     
        <CardBody>
        { applied ?
            <button className="btn btn-secondary btn-sm sm" onClick={handleApply}>Applied</button>
            :
            <Button color="primary" className="btn btn-sm sm" onClick={handleApply}>Apply</Button>
          }
        </CardBody>  
    </Card>
    {alert}
    </>
  )
};

export default JobCard;