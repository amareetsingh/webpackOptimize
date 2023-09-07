import React from 'react';
import Styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => {
  const buttonStyles = `${Styles.btn} ${Styles[props.btnType]} ${
    Styles[props.btnSize]
  } ${props.styles}`;

  return (
    <button
      id={props.id}
      className={buttonStyles}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string,
  btnSize: PropTypes.string,
  
  id: PropTypes.string,
};

export default Button;
