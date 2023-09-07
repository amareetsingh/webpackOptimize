import React, { useCallback, useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateFieldForm from './ProfileUtil/CreateField';
import { useParams } from 'react-router-dom';
import { functionService } from '../../Context/functions';
import ProfileListItem from './ProfileUtil/ProfileListItem';

function Profilefileds(props) {
   
    const[profileList,setProfileList]=useState([]);
    const params = useParams();
    const getFieldList =  useCallback(async () =>  {
        let res = await functionService.post('ProfileFields/getProfileFields',{
            "assessmentId": params.id,
            "userId": 0
          });
        if(res !== false && res.status !== false){
            let data = JSON.parse(res.data.data.result);
            //console.log("datadata",data);
            setProfileList(data.m_listMappedProfileFields);
        }else{
            if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			  }
        }
    },[params])
    useEffect(()=>{
        getFieldList();
     },[params,getFieldList]);
	return (
        <>
            <div className={styles.Ratingbandsdetails}>
                <div className={styles.settingheaderbox}>
                    <h3>Profile Fields</h3>
                    <div className={styles.flexrightbutton}>
                        {/*<span className={styles.btn_skyblue}>Manage Profile Fields</span>*/}
                    </div>
                </div>
                <div className={styles.settingbodyboxcontant}>
                        <div className={styles.bodyQuestionlist}>
                            <Row>
                                <Col>
                                {profileList && profileList.map((obj,index)=>(
                                    <ProfileListItem row={obj} key={index} getFieldList={getFieldList} setLoader={props.setLoader}/>
                                ))}
                                  
                                </Col>
                            </Row>
                        </div>
                </div>

                <div className={styles.manageprofilefields}>
                    
                     <CreateFieldForm getFieldList={getFieldList} setLoader={props.setLoader}/>
                </div>

            </div>
        </>
	);
}

export default Profilefileds;
