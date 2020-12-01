import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaRegLemon, FaSun } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="tak-date-overlay">
      <ul className="task-date__list">
        <li data-testid="task-date-overlay">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaRegLemon />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li data-testid="task-date-tomorow">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li data-testid="task-date-next-week">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select next week as the task date"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );
