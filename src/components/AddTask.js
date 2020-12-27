import React, { useEffect, useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt, FaPlusCircle } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(false);
  const [description, setDescription] = useState('');

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';
    let createdTime = moment().format('YYYY/MM/DD HH:mm:ss');

    if (projectId === 'TODAY') {
      collatedDate = moment('YYYY/MM/DD').format('YYYY/MM/DD');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('YYYY/MM/DD');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId, // projectId: projectId
          task, // task: task
          date: collatedDate || taskDate,
          createdTime,
          userId: firebase.auth().currentUser.uid,
          description,
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <>
          <div
            className="add-task__shallow"
            data-testid="show-main-action"
            onClick={() => setShowMain(!showMain)}
            onKeyDown={() => setShowMain(!showMain)}
            tabIndex={0}
            aria-label="Přidat úkol"
            role="button"
          >
            <span className="add-task__plus" title="Přidat úkol">
              +
            </span>
            <span
              className={showMain ? 'add-task__text-active' : 'add-task__text'}
              title="Přidat úkol"
            >
              Přidat úkol
            </span>
          </div>
        </>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Rychle přidat úkol</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Zrušit přidávání úkolu"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            placeholder={showAddDescription ? "Název úkolu" : "Váš úkol zde"}
            onChange={(e) => setTask(e.target.value)}
          />
          {showAddDescription && (<>
            <div className="add-task__description-header">Podrobnosti úkolu</div>
            <textarea
              className="add-task__description-content"
              placeholder="Bližší popis"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>)}
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false) && setDescription('') && setShowAddDescription(false)
                : addTask() && setDescription('') && setShowAddDescription(false)
            }
          >
            Přidat úkol
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
                setShowAddDescription(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Zrušit
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
            tabIndex={0}
            role="button"
            title="Zvolit projekt"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
            tabIndex={0}
            role="button"
            title="Zvolit datum"
          >
            <FaRegCalendarAlt />
          </span>
          <span
            className="add-task__desc"
            title={showAddDescription ? "Odebrat podrobnosti" : "Přidat podrobnosti"}
            onClick={() => {setShowAddDescription(!showAddDescription); setDescription('');}}
            tabIndex={0}
            rol="button"
          >
            <FaPlusCircle />
          </span>
        </div>
      )}
    </div>
  );
};
