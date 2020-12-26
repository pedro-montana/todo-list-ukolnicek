import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({ offset, showSidebar, setShowSidebar }) => (
  <section className="content">
    <Sidebar
      offset={offset}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
    />
    <Tasks />
  </section>
);
