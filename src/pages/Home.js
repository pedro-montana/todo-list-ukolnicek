import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';
import { LoadingScreen } from '../components/LoadingScreen';
import {
  ProjectsProvider,
  SelectedProjectProvider,
  useSelectedProjectValue,
} from '../context';
import { firebase } from '../firebase';

export const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [docId, setDocId] = useState('');
  const [tryLoad, setTryLoad] = useState(0);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const userInfo = snapshot.docs.map((u) => ({
          ...u.data(),
          id: u.id,
        }));
        if (userInfo[0]) {
          setDocId(userInfo[0].id);
          setDarkMode(userInfo[0].darkmodeDefault);
        } else {
          if (tryLoad <= 3) {
            firebase
              .firestore()
              .collection('users')
              .add({
                userId: firebase.auth().currentUser.uid,
                darkmodeDefault: false,
              })
              .then(
                firebase
                  .firestore()
                  .collection('users')
                  .where('userId', '==', firebase.auth().currentUser.uid)
                  .get()
                  .then((snapshot) => {
                    const userInfo = snapshot.docs.map((u) => ({
                      ...u.data(),
                      id: u.id,
                    }));
                    if (userInfo[0]) {
                      setDocId(userInfo[0].id);
                    }
                  })
              );
              setTryLoad(tryLoad + 1);
          }
        }
        if (darkMode === undefined) {
          setDarkMode(false);
        }
        setPreloaded(true);
        setTimeout(() => {
          setLoaded(true);
          scrollTop();
        }, 200);
      });
  }, []);

  const [offset, setOffset] = useState(false);
  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > 70) {
        setOffset(true);
      } else {
        setOffset(false);
      }
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen preloaded={preloaded} />}
      <SelectedProjectProvider>
        <ProjectsProvider>
          <div className="App">
            <main
              data-testid="application"
              className={darkMode ? 'darkmode' : undefined}
            >
              <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                offset={offset}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                docId={docId}
              />
              <Content
                offset={offset}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            </main>
          </div>
        </ProjectsProvider>
      </SelectedProjectProvider>
    </>
  );
};
