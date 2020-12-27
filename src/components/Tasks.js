import React, { useEffect, useState } from 'react';
import { ProjectName } from './ProjectName';
import { CheckboxRevive } from './CheckboxRevive';
import { AddTask } from './AddTask';
import { OneTask } from './OneTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { FaFastBackward, FaInfoCircle } from 'react-icons/fa';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const { archivedTasks } = useTasks(selectedProject);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);
  const [showDelete, setShowDelete] = useState(true);

  let projectName = '';
  let showName = '';
  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  showName = projectName;

  if (projectName === 'Inbox') {
    showName = 'Příchozí';
  }

  if (projectName === 'Today') {
    showName = 'Dnes';
  }

  if (projectName === 'Next 7 Days') {
    showName = 'Do týdne';
  }

  useEffect(() => {
    document.title = `${showName} | Todo List`;
    if (
      projectName == 'Inbox' ||
      projectName == 'Today' ||
      projectName == 'Next 7 Days'
    ) {
      setShowDelete(false);
    } else {
      setShowDelete(true);
    }
  }, [showName]);

  return (
    <>
      <div className="tasks" data-testid="tasks">
        <ProjectName projectName={showName} showDelete={showDelete} />
        <ul className="tasks__list">
          {tasks.length > 0 ? (
            tasks.map((task) => <OneTask task={task} key={task.id} />)
          ) : (
            <div key={0}>
              <FaInfoCircle /> Žádné úkoly k zobrazení
            </div>
          )}
        </ul>

        <AddTask />

        <hr className="revive-task-hr" />
        <div
          className={
            showArchivedTasks ? 'revive-task revive-task-active' : 'revive-task'
          }
          data-testid="revive-task"
          onClick={() => setShowArchivedTasks(!showArchivedTasks)}
          tabIndex={0}
          aria-label="Obnovit úkol"
          role="button"
        >
          <span className="revive-task__icon" title="Obnovit úkol">
            <FaFastBackward />
          </span>
          <span className="revive-task__text" title="Obnovit úkol">
            Obnovit úkol
          </span>
        </div>
        {showArchivedTasks && (
          <>
            <h2>
              <i>Úkoly k obnovení</i>
            </h2>
            <p className="tasks__revive-disclaimer">
              <i>
                Dokončené úkoly je možné obnovit do 3 dnů než jsou automaticky
                odstraněny.
              </i>
            </p>
            <ul className="tasks__revive-list">
              {archivedTasks.length > 0 ? (
                archivedTasks.map((task) => (
                  <li key={`${task.id}`}>
                    <CheckboxRevive id={task.id} taskDesc={task.task} />
                    <span>
                      <i>{task.task}</i>
                    </span>
                  </li>
                ))
              ) : (
                <div>
                  <FaInfoCircle /> Žádné úkoly k obnovení
                </div>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
