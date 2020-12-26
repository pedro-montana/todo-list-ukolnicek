import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { AddTask } from '../AddTask';
import { firebase } from '../../firebase';

export const Header = ({ darkMode, setDarkMode, offset, showSidebar, setShowSidebar }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [data, setData] = useState([]);

  const saveTheme = () => {
    localStorage.setItem('darkTheme', !darkMode);
    firebase
      .firestore()
      .collection('users')
      .doc('HVlvicupXs3QFLFgD2EG')
      .update({
        darkmodeDefault: !darkMode,
      });
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (showQuickAddTask) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://svatky.adresa.info/json'
      ).then((response) => response.json());
      setData(result);
    };
    fetchData();
  }, []);

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
        </div>
        <div className="settings">
          <ul>
            <li className="settings__today-date" key={0}>
              <span>Dnes:&nbsp;{moment().format('DD.MM.YYYY')}</span>
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
