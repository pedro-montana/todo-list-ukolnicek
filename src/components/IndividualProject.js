import React from 'react';

export const IndividualProject = ({ project }) => {

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
    </>
  );
};
