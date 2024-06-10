import React from "react";
import { Col } from "react-bootstrap";

const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col xs={12} sm={6} md={4}> {/* Adjust column sizes based on your layout */}
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} /> {/* Ensure to add alt attribute */}
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
