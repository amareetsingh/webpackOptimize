import React from 'react'
import Styles from '../Pages/Login/login.module.css';


const NotificationBar = (props) => {
  // console.log("props", props);
  return (
    <div className={Styles.NotificationContainer} 
      style={{backgroundColor: props.bgColor}}>
        <h4 style={{color: props.textColor}}> {props.message} </h4>

    </div>
  )
}

export default NotificationBar