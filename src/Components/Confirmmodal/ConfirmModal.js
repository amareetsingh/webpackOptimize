import React from 'react';
import styles from './confirmmodal.module.css';
import { Button} from "react-bootstrap";
import Warning from '../../assets/images/warning.png'
import Modal from 'react-bootstrap/Modal'


function ConfirmModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
          
            <div className= {styles.content}>
                {/* <img src={Warning} alt="warning" /> */}
                <h2>Are you sure?</h2>               

                <div className= {styles.btnbox}>
                    <Button className= {styles.closebtn} onClick={props.handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{props.handleAction(props.data)}}>
                        Confirm
                    </Button>
                </div>
            </div>
               
    </Modal>			   
					  
	);
}

export default ConfirmModal;
