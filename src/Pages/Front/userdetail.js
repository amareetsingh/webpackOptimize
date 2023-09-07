import React from 'react';
import { Container } from 'react-bootstrap';
import { checkOptionSetting, getColor2 } from '../../Context/functions';
import styles from './evalinator.module.css';
function Userdetail({ row , options, colors, fname, lname, profileURL, profileDesc, imageURL}) {

    return (
        <>
            <div className={checkOptionSetting(170, 1,options) ? '' : styles.userdetailpageshort}>
                <div className={styles.userdetailpage} style={checkOptionSetting(170, 2,options) ? {background:getColor2(colors,8)}:{}}>
                    <Container>
                        <div className={`${styles.inneruserdetails} ${ checkOptionSetting(35,1,options) ? styles.backgroundNone: ''}`}>
                            <div className={styles.userdetailsection}>
                                <div className={`${styles.mainuserdetaillist} ${ checkOptionSetting(35,1,options) ? styles.backgroundNone: ''}` }>
                                    <div className={styles.imageboxuserlist}>
                                        <img src={imageURL} className={styles.minilogofooterimage} alt="Author" />
                                    </div>
                                    {checkOptionSetting(35, 0,options) &&
                                        <><h1>{fname} {lname}</h1>
                                            <p>{profileDesc} </p>
                                            <a rel="noopener noreferrer" style={{ background: getColor2(colors,2),color:getColor2(colors,5) }} href={profileURL} target={"_blank"} className={styles.KnowMorenew} >Know More</a>
                                        </>}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Userdetail;
