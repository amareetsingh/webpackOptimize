import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Toaster = ({showtoast, toggleShowToast, bgclass,status, message, toasticon}) => {

    return (
        <>
            <Toast delay={3000} autohide className={bgclass} show={showtoast} onClose={toggleShowToast}>    
                <Toast.Header style ={{color: '#fff'}} className={bgclass}>                
                <div className="toast-inner">
                    <FontAwesomeIcon icon={toasticon} size={'lg'}/>
                        <div>
                            <p>{status}</p>
                            <p>{message}</p>
                        </div>
                </div>
                </Toast.Header>  
                                   
            </Toast>
        </>
    )
}
export default Toaster;