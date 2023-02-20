import React, { useState } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import AlertMessageModel from '../../../interfaces/alert-message';
import './alert-message.scss';

function AlertMessage(props: AlertMessageModel) {
  const [show, setShow] = useState(true);
  const timer = 3000;

  setTimeout(() => {
    setShow(false);
  }, timer);

  return (
    <div>
      {show ? (
        <Alert variant={props.alertType} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{props.title}</Alert.Heading>
          <p>{props.description}</p>
        </Alert>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default AlertMessage;
