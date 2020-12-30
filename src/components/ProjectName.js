import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export const ProjectName = ({ projectName, showDelete, showSidebar, setShowSidebar }) => {
  return (
    <h2 data-testid="project-name">
      <span onClick={() => setShowSidebar(true)}>{projectName}</span>
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
