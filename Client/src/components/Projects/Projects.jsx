import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import projImg2 from "../../assets/img/project-img2.png";
import projImg3 from "../../assets/img/project-img3.png";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import "animate.css";
import "./Projects.scss"

import TrackVisibility from "react-on-screen";

const Projects = () => {
  const projects = [
    {
      title: "Grammer Lessons",
      description: "Learn With EnglishEase",
      imgUrl: projImg3,
    },
    {
      title: "Our Quizes",
      description: "Learn With EnglishEase",
      imgUrl: projImg2,
    },
    {
      title: "Reading Lessons",
      description: "Learn With EnglishEase",
      imgUrl: projImg3,
    },
    {
      title: "Chat-Bot for Englis",
      description: "Learn With EnglishEase",
      imgUrl: projImg2,
    },
    {
      title: "Spoken Lessons",
      description: "Learn With EnglishEase",
      imgUrl: projImg3,
    },
    // {
    //   title: "Business Startup",
    //   description: "Design & Development",
    //   imgUrl: projImg3,
    // },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Courses</h2>
                  <p>
                    We are proud to offer a diverse range of courses tailored to enhance your language skills and knowledge. Our curriculum includes courses in grammar, spoken communication, and writing proficiency, designed to refine your linguistic abilities and elevate your communication prowess. Additionally, we provide specialized training in utilizing our chatbot technology, empowering you to engage with cutting-edge language assistance tools effectively. Furthermore, our platform offers interactive quizzes and assessments, ensuring a dynamic and engaging learning experience.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">

                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col xs={4}>
                            {projects.map((project, index) => (
                              <ProjectCard key={index} {...project} />
                            ))}
                          </Col>

                        </Row>
                      </Tab.Pane>


                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background"></img>
    </section>
  );
};
export default Projects;
