import React, { useEffect } from 'react';
import { useProjectsValue } from '../context';
import { FaArrowUp } from 'react-icons/fa';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}
          <li>
            <div
              onClick={() => {
                setShowProjectOverlay(false);
              }}
              title="Zavřít"
            >
              <FaArrowUp
              className="project-overlay-close"
              />
            </div>
          </li>
        </ul>
      </div>
    )
  );
};
