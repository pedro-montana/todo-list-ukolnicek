import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegCalendarAlt } from 'react-icons/fa';
import Linkify from 'react-linkify';
import { firebase } from '../firebase';
import { TaskDate } from './TaskDate';

export const TaskDescription = ({
  task,
  id,
  descId,
  desc,
  // date,
  editTask,
  setEditTask,
  showDescription,
  setShowDescription,
}) => {
  const [description, setDescription] = useState(desc);
  const [taskName, setTaskName] = useState(task);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const updateTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      task: taskName,
      description,
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
          onClick={() => setEditTask(false)}
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
      <span onClick={() => setShowDescription(!showDescription)}>{task}</span>
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
              <a
                href={decoratedHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {decoratedText}
              </a>
            )}
          >
            {desc ? desc : <span onClick={() => setEditTask(true)}><i>Přidat podrobnosti</i></span>}
          </Linkify>
        </div>
      </div>
    </>
  );
};
