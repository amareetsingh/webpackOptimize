import React from 'react';
import styles from './confirmmodal.module.css';
import { Button} from "react-bootstrap";
// import Warning from '../../assets/images/warning.png'
import Modal from 'react-bootstrap/Modal'


function ConfirmModals(props) {
    return (
        <Modal shows={props.shows} onHide={props.handleCloses}>
          
            <div className= {styles.content}>
                {/* <img src={Warning} alt="warning" /> */}
                <h2>Are you sure?</h2>               

                <div className= {styles.btnbox}>
                    <Button className= {styles.closebtn} onClick={props.handleCloses}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{props.handleActions(props.data)}}>
                        Confirm
                    </Button>
                </div>
            </div>
               
    </Modal>			   
					  
	);
}

export default ConfirmModals;
