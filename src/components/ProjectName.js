import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export const ProjectName = ({ projectName, showDelete }) => {
  return (
    <h2 data-testid="project-name">
      {projectName}
      {showDelete && (
        <>
          &nbsp;
          <span className="project-delete-icon">
            <MdDeleteForever />
          </span>
        </>
      )}
    </h2>
  );
};
