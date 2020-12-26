import React, { useState } from 'react';
import moment from 'moment';
import { Checkbox } from './Checkbox';
import { EditTask } from './EditTask';
import { TaskDescription } from './TaskDescription';
import { FaRegEdit } from 'react-icons/fa';

export const OneTask = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [editTask, setEditTask] = useState(false);

  return (
    <li key={task.id} className={editTask ? 'edit' : undefined}>
      {!editTask && <Checkbox id={task.id} taskDesc={task.task} />}
      <div className="task-holder">
        <TaskDescription
          id={task.id}
          descId={`desc_${task.id}`}
          desc={task.description && task.description}
          task={task.task}
          date={task.date}
          editTask={editTask}
          setEditTask={setEditTask}
          showDescription={showDescription}
          setShowDescription={setShowDescription}
        />
      </div>
      {!editTask && (
        <div className="task-info-container">
          {task.date && (
            <span
              className={
                showDescription ? 'task-finish-date show' : 'task-finish-date'
              }
              title={task.date && !task.date.includes('Invalid') ? moment(task.date).format('DD.MM.YYYY') : undefined}
            >
              {task.date && !task.date.includes('Invalid') &&  moment(task.date, 'YYYY/MM/DD').format('DD.MM.')}
            </span>
          )}
          <span
            className={showDescription ? 'task-edit show' : 'task-edit'}
            onClick={() => setEditTask(!editTask)}
            title="Upravit úkol"
          >
            <FaRegEdit />
          </span>
        </div>
      )}
    </li>
  );
};
