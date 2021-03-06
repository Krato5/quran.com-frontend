import React from 'react';
import { connect } from 'react-redux';

import { save } from 'redux/actions/auth';
import { push } from 'react-router-redux';

const styles = require('./style.scss');

const FacebookTokenButton = ({ save, push }) => { // eslint-disable-line
  let popup = null;
  let interval = null;

  const handleClick = () => {
    popup = window.open('/onequran/omniauth/facebook?omniauth_window_type=newWindow&resource_class=User', '_blank'); // eslint-disable-line
    interval = setInterval(() => popup.postMessage('requestCredentials', '*'), 1000);

    window.addEventListener('message', (event) => { // eslint-disable-line
      if (event.data.uid) {
        save(event.data);
        clearInterval(interval);

        return push('/');
      }
    }, false);
  };

  return (
    <button onClick={handleClick} className={`${styles.button} btn btn-default btn-block btn-lg`}>
      <i className="fa fa-facebook" /> Continue with Facebook
    </button>
  );
};

export default connect(null, { save, push })(FacebookTokenButton);
