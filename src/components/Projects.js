import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { IndividualProject } from "./IndividualProject";

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }
        title={project.name}
      >
        <div
        type="button"
        tabIndex={0}
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        onKeyDown={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        >
        <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};