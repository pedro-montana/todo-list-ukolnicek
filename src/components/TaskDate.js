import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaRegLemon, FaSun, FaArrowUp } from 'react-icons/fa';

export const TaskDate = ({
  taskDate,
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
}) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li data-testid="task-date-overlay" key={0}>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('YYYY/MM/DD'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('YYYY/MM/DD'));
            }}
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaRegLemon />
            </span>
            <span>Dnes</span>
          </div>
        </li>
        <li data-testid="task-date-tomorow" key={1}>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'days').format('YYYY/MM/DD'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'days').format('YYYY/MM/DD'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Zítra</span>
          </div>
        </li>
        <li data-testid="task-date-next-week" key={2}>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('YYYY/MM/DD'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('YYYY/MM/DD'));
            }}
            tabIndex={0}
            role="button"
            aria-label="Select next week as the task date"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Příští týden</span>
          </div>
        </li>
        <li data-testid="task-date-specific-date" key={3}>
          <div
            tabIndex={0}
            role="button"
            aria-label="Select next week as the task date"
          >
            <input
              type="date"
              onChange={(e) => {
                setTaskDate(
                  moment(e.target.value, 'YYYY-MM-DD').format('YYYY/MM/DD')
                );
              }}
              title="Zvolit přesné datum"
              min={moment().format('YYYY-MM-DD')}
              value={taskDate !== 'Invalid date' ? moment(taskDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
            />
          </div>
        </li>
        <li data-testid="task-date-close-overlay" key={4}>
          <div
            onClick={() => {
              setShowTaskDate(false);
            }}
            title="Zavřít"
          >
            <FaArrowUp className="task-date-close" />
          </div>
        </li>
      </ul>
    </div>
  );
