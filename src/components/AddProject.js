import React, { useState } from 'react';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';
import { firebase } from '../firebase';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: firebase.auth().currentUser.uid,
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName('');
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Pojmenujte projekt"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Přidat projekt
          </button>
          <span
            aria-label="Zrušit přidávání projektu"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            role="button"
            tabIndex={0}
          >
            Zrušit
          </span>
        </div>
      )}
      {!show && (
        <>
          <span className="add-project__plus" title="Přidat projekt">
            +
          </span>
          <span
            aria-label="Přidat projekt"
            data-testid="add-project-action"
            className="add-project__text"
            onClick={() => setShow(!show)}
            role="button"
            tabIndex={0}
            title="Přidat projekt"
          >
            Přidat projekt
          </span>
        </>
      )}
    </div>
  );
};
