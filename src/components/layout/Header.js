import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { AddTask } from '../AddTask';
import { firebase } from '../../firebase';

export const Header = ({
  darkMode,
  setDarkMode,
  offset,
  showSidebar,
  setShowSidebar,
  docId,
  tasks,
}) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [tasksToFinish, setTasksToFinish] = useState(0);

  const saveTheme = () => {
    localStorage.setItem('darkTheme', !darkMode);
    firebase.firestore().collection('users').doc(docId).update({
      darkmodeDefault: !darkMode,
    });
  };

  useEffect(() => {
    if (showQuickAddTask) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }, [showQuickAddTask]);

  useEffect(() => {
    setTasksToFinish(
      tasks.filter(
        (task) =>
          moment(task.date, 'YYYY/MM/DD').format('YYYY/MM/DD') <=
          moment().format('YYYY/MM/DD')
      ).length
    );
  }, [tasks]);

  return (
    <header
      className={offset ? 'header small-header' : 'header'}
      data-testid="header"
    >
      <nav>
        <div className="logo">
          <img
            src={darkMode ? '/images/logo.png' : '/images/logo-dark.png'}
            alt="Blbnicek"
            onClick={() => setShowSidebar(!showSidebar)}
          />
          {tasksToFinish > 0 && (
            <span
              onClick={() => setShowSidebar(!showSidebar)}
              title={
                tasksToFinish &&
                tasksToFinish > 0 &&
                `${tasksToFinish} ${
                  tasksToFinish == 1
                    ? `aktuální úkol`
                    : tasksToFinish >= 2 && tasksToFinish <= 4
                    ? `aktuální úkoly`
                    : `aktuálních úkolů`
                }`
              }
            >
              {tasksToFinish > 0 && `${tasksToFinish}`}
            </span>
          )}
        </div>
        <div className="settings">
          <ul>
            <li className="settings__today-date" key={0}>
              <span>{moment().format('DD.MM.YYYY')}</span>
            </li>
            <li className="settings__add" key={1}>
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                title="Rychle přidat úkol"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode" key={2}>
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => {
                  setDarkMode(!darkMode);
                  saveTheme();
                }}
              >
                {!darkMode ? (
                  <FaToggleOff title="Tmavý režim" />
                ) : (
                  <FaToggleOn title="Světlý režim" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};
