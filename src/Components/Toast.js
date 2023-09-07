import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const FlickToast = (props) => {
   const[showtoast,toggleShowToast]=useEffect(false);
   useEffect(()=>{
       toggleShowToast(true);
   },[])
    return (
        <>
            <Toast delay={3000} autohide className={props.type === 1 ? 'danger':"success"} show={showtoast} onClose={toggleShowToast}>    
                <Toast.Header style ={{color: '#fff'}} className={props.type === 1 ? 'danger':"success"}>                
                <div className="toast-inner">
                    <FontAwesomeIcon icon={props.type === 1 ? faBan: faCheckCircle} size={'lg'}/>
                        <div>
                            <p>{props.type === 1 ? 'Error':"Success"}</p>
                            <p>{props.message}</p>
                        </div>
                </div>
                </Toast.Header>  
                                   
            </Toast>
        </>
    )
}
export default FlickToast;