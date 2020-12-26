import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export const ProjectName = ({ projectName }) => {
  return (
    <h2 data-testid="project-name">
      {projectName}&nbsp;
      <span className="project-delete-icon">
        <MdDeleteForever />
      </span>
    </h2>
  );
};
