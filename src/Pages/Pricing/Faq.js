import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styles from './pricing.module.css';

function Faq(props) {
    return (
        <div className="price_faq">
        <Accordion defaultActiveKey= "0" className={styles.faq_box}>
        <Accordion.Item eventKey="0" className={styles.faq_item}>
            <Accordion.Header className={styles.faq_header}>{props.title} 
            </Accordion.Header>
                < Accordion.Body className={styles.faq_body}>
                    {props.content}
                </Accordion.Body>
        </Accordion.Item>        
        </Accordion>
        </div>
    );
}
export default Faq;