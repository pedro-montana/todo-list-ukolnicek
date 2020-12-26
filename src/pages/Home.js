import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';
import { LoadingScreen } from '../components/LoadingScreen';
import { ProjectsProvider, SelectedProjectProvider } from '../context';
import { firebase } from '../firebase';

export const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .where('userId', '==', 'af4t56yd6667')
      .get()
      .then((snapshot) => {
        const userInfo = snapshot.docs.map((u) => ({
          ...u.data(),
        }));
        if (userInfo[0]) {
        setDarkMode(userInfo[0].darkmodeDefault);
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
