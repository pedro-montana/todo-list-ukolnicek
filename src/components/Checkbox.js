import React from 'react';
import { firebase } from '../firebase';
import moment from 'moment';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: moment().format('YYYY/MM/DD'),
    });
  };
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
      aria-label={`Označit úkol ${taskDesc} jako dokončený?`}
      title={`Označit úkol '${taskDesc}' jako dokončený`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox"></span>
    </div>
  );
};
