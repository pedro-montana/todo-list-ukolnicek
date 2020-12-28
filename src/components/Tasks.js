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
import moment from 'moment';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const { archivedTasks } = useTasks(selectedProject);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [todayArchivedTasks, setTodayArchivedTasks] = useState([]);
  const [cleanArchivedTasks, setCleanArchivedTasks] = useState([]);
  const [cleanTasks, setCleanTasks] = useState([]);

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

  function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    setTodayArchivedTasks(
      archivedTasks.filter(
        (task) =>
          moment(task.archived, 'YYYY/MM/DD').format('YYYY/MM/DD') ==
          moment().format('YYYY/MM/DD')
      )
    );
    setCleanArchivedTasks(
      archivedTasks.filter(
        (task) =>
          moment(task.archived, 'YYYY/MM/DD').format('YYYY/MM/DD') !=
          moment().format('YYYY/MM/DD')
      )
    );
  }, [archivedTasks]);

  useEffect(() => {
    setCleanTasks(
      tasks
        .filter((task) => task.archived === false));
  }, [tasks]);

  return (
    <>
      <div className="tasks" data-testid="tasks">
        <ProjectName projectName={showName} showDelete={showDelete} />
        <ul className="tasks__list">
          {tasks.length > 0 || todayArchivedTasks.length > 0 ? (
            cleanTasks.sort( compare ).map((task) => <OneTask task={task} key={task.id} project={projectName} />)
          ) : (
            <div key={0}>
              <FaInfoCircle /> Žádné úkoly k zobrazení
            </div>
          )}
          {/* today finished tasks
             ==========================*/}
          {todayArchivedTasks.length > 0 &&
            todayArchivedTasks.map((task) => (
              <li key={`${task.id}`}>
                <CheckboxRevive id={task.id} taskDesc={task.task} />
                <span className="archived-task" title="Splněno">
                  {task.task}
                </span>
              </li>
            ))}
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
            Obnovit starší úkol
          </span>
        </div>
        {showArchivedTasks && (
          <>
            {/* <h2>
              <i>Starší úkoly k obnovení</i>
            </h2> */}
            <p className="tasks__revive-disclaimer">
              <i>
                Dokončené úkoly je možné obnovit do 3 dnů než jsou automaticky
                odstraněny.
              </i>
            </p>
            <ul className="tasks__revive-list">
              {cleanArchivedTasks.length > 0 ? (
                cleanArchivedTasks.map((task) => (
                  <li key={`${task.id}`}>
                    <CheckboxRevive id={task.id} taskDesc={task.task} />
                    <span className="archived-task">{task.task}</span>
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
