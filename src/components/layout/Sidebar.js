import React, { useState, useEffect } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useTasks } from '../../hooks';
import { Projects } from '../Projects';
import { useSelectedProjectValue } from '../../context';
import { AddProject } from '../AddProject';
import { firebase } from '../../firebase';
import { Redirect } from 'react-router-dom';

export const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  const { tasks } = useTasks('TODAY');
  const [logOut, setLogOut] = useState(false);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  if (logOut) {
    return <Redirect to="/logout" />;
  }
  return (
    <div
      className={showSidebar ? 'sidebar sidebar-mobile' : 'sidebar'}
      data-testid="sidebar"
    >
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
          key={0}
        >
          <div
            aria-label="Příchozí úkoly"
            title="Příchozí úkoly"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
              setShowSidebar(false);
              scrollTop();
            }}
            onKeyDown={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Příchozí</span>
          </div>
        </li>
        <li
          data-testid="today"
          key={1}
          className={active === 'today' ? 'active' : undefined}
        >
          <div
            aria-label="Dnešní úkoly"
            title="Dnešní úkoly"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('today');
              setSelectedProject('TODAY');
              setShowSidebar(false);
              scrollTop();
            }}
            onKeyDown={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Dnes{tasks.length > 0 && ` (${tasks.length})`}</span>
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next_7' ? 'active' : undefined}
          key={2}
        >
          <div
            aria-label="Úkoly pro dalších 7 dní"
            title="Úkoly pro dalších 7 dní"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
              setShowSidebar(false);
              scrollTop();
            }}
            onKeyDown={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Do týdne</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Ukázat/Skrýt projekty"
        title={!showProjects ? 'Ukázat projekty' : 'Skrýt projekty'}
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => setShowProjects(!showProjects)}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projekty</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && (
          <Projects
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            scrollTop={scrollTop}
          />
        )}
      </ul>
      {showProjects && <AddProject />}
      <div className="sidebar-logout">
        <div className="sidebar-logout__inner" title="Odhlásit se" onClick={() => {firebase.auth().signOut(); setLogOut(true);}}>
          <span><FaSignOutAlt /></span><span>Odhlásit se</span>
        </div>
      </div>
    </div>
  );
};
