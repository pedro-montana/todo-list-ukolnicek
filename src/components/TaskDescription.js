import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Linkify from 'react-linkify';
import { firebase } from '../firebase';
import moment from 'moment';

export const TaskDescription = ({
  task,
  id,
  descId,
  desc,
  taskDate,
  editTask,
  setEditTask,
  showDescription,
  setShowDescription,
}) => {
  const [description, setDescription] = useState(desc);
  const [taskName, setTaskName] = useState(task);
  const [date, setDate] = useState(taskDate);

  const updateTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      task: taskName,
      description,
      date,
    });
  };

  if (editTask)
    return (
      <div className="task-edit-holder">
        <div className="task-edit-heading">Upravit úkol</div>
        <input
          className="task-edit-name"
          aria-label="Enter your task"
          data-testid="edit-task-content"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="add-task__description-header">Podrobnosti úkolu</div>
        <textarea
          className="task-edit-description"
          placeholder="Bližší popis"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
          <label className="task-edit-date">
            Datum&nbsp;
            <input
              type="date"
              onChange={(e) => {
                setDate(
                  moment(e.target.value, 'YYYY-MM-DD').format('YYYY/MM/DD')
                );
              }}
              title="Změnit datum"
              min={moment().format('YYYY-MM-DD')}
              value={
                date !== 'Invalid date' && date !== 'Important'
                  ? moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD')
                  : moment().format('YYYY-MM-DD')
              }
            />
          </label>
        <button
          type="button"
          className="add-task__submit"
          data-testid="add-task"
          onClick={() => {
            updateTask();
            setEditTask(false);
            setShowDescription(true);
          }}
        >
          Uložit
        </button>
        <span
          className="add-task__cancel"
          data-testid="add-task-main-cancel"
          onClick={() => {
            setEditTask(false);
            setDate(taskDate);
            setDescription(desc);
            setTaskName(task);
          }}
          aria-label="Cancel adding a task"
          tabIndex={0}
          role="button"
        >
          Zrušit
        </span>
      </div>
    );

  return (
    <>
      <span onClick={() => setShowDescription(!showDescription)}>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText) => (
            <a
              href={decoratedHref}
              target="_blank"
              rel="noopener noreferrer"
              key={decoratedHref}
            >
              {decoratedText}
            </a>
          )}
        >
          {taskDate && taskDate.includes('Important') ? '❗' + task : task}
        </Linkify>
      </span>
      <div
        className="task-toggle-description"
        title="Podrobnosti"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        key={descId}
        className={
          !showDescription ? 'task-description' : 'task-description show'
        }
        data-testid="task-description"
        tabIndex={0}
      >
        <div className="task-description__text">
          <Linkify
            componentDecorator={(decoratedHref, decoratedText) => (
              <a href={decoratedHref} target="_blank" rel="noopener noreferrer">
                {decoratedText}
              </a>
            )}
          >
            {desc ? (
              desc
            ) : (
              <span onClick={() => setEditTask(true)}>
                <i>Přidat podrobnosti</i>
              </span>
            )}
          </Linkify>
        </div>
      </div>
    </>
  );
};
