import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

function CompanyCard({name, description, logoUrl, handle}) {
  console.debug("CompanyCard");

  return (
    <Link to={`companies/${handle}`} className="text-decoration-none">
        <Card className="m-5">
          <CardBody>
            <CardTitle className="h4">
              {logoUrl &&
                <img
                  src={logoUrl}
                  alt="company logo"
                  style={{width: "5rem"}}
                  className="pe-3"
                />}
                <span className="text-center">{name}</span>
              </CardTitle>
              <CardText className="text-dark">{description}</CardText>
          </CardBody>
        </Card>

    </Link>
  )
};

export default CompanyCard;