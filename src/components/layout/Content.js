import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({ offset, showSidebar, setShowSidebar, tasks }) => (
  <section className="content">
    <Sidebar
      offset={offset}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      tasks={tasks}
    />
    <Tasks
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
    />
  </section>
);
