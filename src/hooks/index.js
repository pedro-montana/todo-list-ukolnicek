import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [fetchCount, setFetchCount] = useState(1);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'af4t56yd6667');

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject == 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject == 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
  });
    setFetchCount(fetchCount + 1);
    console.log(`useTasks was fetched ${fetchCount} times from Firebase`);
    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [fetchCount, setFetchCount] = useState(1);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'af4t56yd6667')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        // if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        //   setProjects(allProjects);
        // }
        if (
          JSON.stringify(allProjects.map((a) => a.projectId + '_' + a.name)) !==
          JSON.stringify(projects.map((p) => p.projectId + '_' + p.name))
        ) {
          setProjects(allProjects);
        }
      });
    setFetchCount(fetchCount + 1);
    console.log(`useProjects was fetched ${fetchCount} times from Firebase`);
  }, [projects]);
  return { projects, setProjects };
};

export const useArchivedTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [fetchCount, setFetchCount] = useState(1);

  useEffect(() => {
    let subscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'af4t56yd6667');

    subscribe =
      selectedProject
        ? (subscribe = subscribe.where('projectId', '==', selectedProject))
        : selectedProject == 'TODAY'
        ? (subscribe = subscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject == 'INBOX' || selectedProject === 0
        ? (subscribe = subscribe.where('date', '==', ''))
        : subscribe;

    subscribe = subscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== false
            )
          : newTasks.filter((task) => task.archived !== false)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
  });
    setFetchCount(fetchCount + 1);
    console.log(`useArchivedTasks was fetched ${fetchCount} times from Firebase`);
    console.log(tasks);
    return () => subscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};