import React from 'react';
import { firebase } from '../firebase';

export const CheckboxRevive = ({ id, taskDesc }) => {
  const reviveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: false,
    });
  };
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => reviveTask()}
      aria-label={`Označit úkol ${taskDesc} jako nedokončený`}
      title={`Označit úkol '${taskDesc}' jako nedokončený`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox checkbox-revive"></span>
    </div>
  );
};
