import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null, setShowSidebar, scrollTop }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const [blockShowSidebar, setBlockShowSidebar] = useState(false);

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
        title={project.name}
      >
        <div
          aria-label={`Select ${project.name} as the task project`}
          tabIndex={0}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
            !blockShowSidebar && setShowSidebar(false);
            scrollTop();
          }}
        >
          <IndividualProject
            setShowSidebar={setShowSidebar}
            setBlockShowSidebar={setBlockShowSidebar}
            project={project}
          />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};
