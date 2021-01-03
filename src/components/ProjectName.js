import React, { useEffect, useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { MdDeleteForever } from 'react-icons/md';
import { firebase } from '../firebase';

export const ProjectName = ({ projectName, showDelete, setShowSidebar }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  const deleteProject = () => {
    if (
      selectedProject !== 'INBOX' &&
      selectedProject !== 'TODAY' &&
      selectedProject !== 'NEXT_7' &&
      projects.filter(project => project.projectId == selectedProject)[0].docId
    ) {
      firebase
        .firestore()
        .collection('projects')
        .doc(projects.filter(project => project.projectId == selectedProject)[0].docId)
        .delete()
        .then(() => {
          setProjects([...projects]);
          setSelectedProject('INBOX');
        });
        setShowConfirm(false);
    }
  };

  return (
    <>
      <h2 data-testid="project-name">
        <span onClick={() => setShowSidebar(true)}>{projectName}</span>
        {showDelete && (
          <>
            &nbsp;
            <span
              className="project-delete-icon"
              title={`Smazat '${projectName}'`}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <MdDeleteForever />
            </span>
          </>
        )}
      </h2>
      {showDelete && showConfirm && (
        <div className="project-delete-modal">
          <p>
            Opravdu chcete smazat projekt <strong>{projectName}</strong> ?
            <br />
            Projekt bude navždy odstraněn.
          </p>
          <button
            type="button"
            onClick={() => {
              deleteProject();
            }}
          >
            Smazat
          </button>
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            role="button"
            tabIndex={0}
            aria-label="Cancel adding project, do not delete"
          >
            Zrušit
          </span>
        </div>
      )}
    </>
  );
};
