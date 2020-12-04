import React, { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { FaFastBackward } from 'react-icons/fa';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const { archivedTasks } = useTasks(selectedProject);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);

  let projectName = '';

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

  useEffect(() => {
    document.title = `${projectName} | CheckIt`;
  });

  return (
    <>
      <div className="tasks" data-testid="tasks">
        <h2 data-testid="project-name">{projectName}</h2>
        <ul className="tasks__list">
          {tasks.map((task) => (
            <li key={`${task.id}`}>
              <Checkbox id={task.id} taskDesc={task.task} />
              <span>{task.task}</span>
            </li>
          ))}
        </ul>

        <AddTask />
        <div
          className="revive-task"
          data-testid="revive-task"
          onClick={() => setShowArchivedTasks(!showArchivedTasks)}
          tabIndex={0}
          aria-label="Retrieve task"
          role="button"
        >
          <span className="revive-task__icon" title="Retrieve Task">
            <FaFastBackward />
          </span>
          <span className="revive-task__text" title="Retrieve Task">
            Retrieve Task
          </span>
        </div>
        {showArchivedTasks && (
          <>
            <h2>Tasks to revive</h2>
            <ul className="tasks__revive-list">
              {archivedTasks.map((task) => (
                <li key={`${task.id}`}>
                  <Checkbox id={task.id} taskDesc={task.task} />
                  <span>{task.task}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
