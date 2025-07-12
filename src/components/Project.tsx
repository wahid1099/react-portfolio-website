import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Project.scss";

type ProjectType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  live_preview: string;
};

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://portfolio-backend-theta-ebon.vercel.app/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="projects-grid">
            {projects.slice(0, 5).map((project) => (
              <div className="project" key={project._id}>
                <a href={project.live_preview} target="_blank" rel="noreferrer">
                  <img
                    src={project.image}
                    className="zoom"
                    alt="thumbnail"
                    width="100%"
                  />
                </a>
                <a href={project.live_preview} target="_blank" rel="noreferrer">
                  <h2>{project.title}</h2>
                </a>
                <p
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/all-projects" className="see-all-projects-btn">
              See All Projects
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
