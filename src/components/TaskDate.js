import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaRegLemon, FaSun, FaArrowUp } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
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
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
            }}
            title="Zavřit"
          >
            <FaArrowUp className="task-date-close" />
          </div>
        </li>
      </ul>
    </div>
  );
