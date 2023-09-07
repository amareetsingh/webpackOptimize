import React, { useState } from 'react';
import styles from './settingstyle.module.css';
import stylesresults from '../Analyticsresult/analyticsresult.module.css'
import RatingBand from '../../Components/Sections/RatingBand';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RatingForm from './RatingForm';
import Toaster from '../../Components/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { functionService, checkOptionSetting } from '../../Context/functions';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../../Components/Confirmmodal/ConfirmModal';


function Ratingbandslist(props) {
    //console.log(props.row);
    const [open, setOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const[disabled,setDisabled]=useState(false);
    const params = useParams();
    const[message,setMessage]=useState('');
    const[succmessage,setSuccMessage]=useState("Deleted Successfully!!");
    const[show,setShow]=useState(false);
    const handleshowContent = () =>{
        setShowContent(!showContent)
        setOpen(false)
    }
    const handleDelete = ()=>{
        setShow(true);
        
    }
    const handleAction = async()=>{
        if(disabled === true){return;}
        setDisabled(true);
        props.setLoader(true);
        let res = await functionService.post('RatingBands/remove',{
            "lAssessmentId": params.id,
            "lRatingBandId": props.row.m_lRatingScaleId,
            "szRatingBandName": "string",
            "szRatingBandDesc": "string",
            "nStartPoints": 0,
            "nEndPoints": 0,
            "nStartPercent": 0,
            "nEndPercent": 0
          });
          if(res !== false && res.status !== false){
            setShowToast(true);
           
          }else{
            setMessage(res.error.response.result);
            setShowToast1(true);
            
          }
          setDisabled(false);
          props.setLoader(false);
          setShow(false);

        //params.id
        //props.row.m_lRatingScaleId
        props.getAllRatingBand();
    }

    //console.log('props in ratingbandslist', props);
	return (
        <>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message={succmessage} toasticon={faCheckCircle}/>
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>
            <div className={styles.mianboxratingbands}>
                <div className={styles.mianboxheaderratingbands}>
                    <div className={styles.mianboxheaderratingbandsheading}>
                    <h4>{props.row.m_szRatingScaleName}</h4> 
                    
                    { (props.currentAssesment && props.currentAssesment.m_nAssessmentType !== 1) &&    <p>(From {props.row.m_nStartPercent}% To {props.row.m_nEndPercent}%)</p> }

                    {/* show the redirect URL   */}
                    <p>Redirect to (optional): {props.row.m_szRedirectURL && props.row.m_szRedirectURL.length > 0 ? props.row.m_szRedirectURL : "Not Applicable" }</p>

                    </div>
                    <div className={styles.rightsideeditremove}>
                         <span onClick={()=>{setOpen(!open);setShowContent(false)}} className={styles.btn_edit}><FontAwesomeIcon icon={faEdit} size={'sm'}/></span>
                        <span className={styles.btn_redborder} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} size={'sm'}/></span>    
                        <span onClick={handleshowContent} className={styles.btn_accord}>
                            <FontAwesomeIcon icon={faChevronDown} size={'sm'} className= {showContent === true ? "rotate" : "norotate"}/></span>                     
                    </div>
                </div>
                {(showContent) && 
                    <Row>
                    <Col className="justify-content-md-center text-center">
                    <div className={stylesresults.contantforresult}>
                        {/* <img src={functionService.awsBucketImage(props.row && props.row.m_oMedia) !== false ? functionService.awsBucketImage(props.row && props.row.m_oMedia) : Leftimagebands} alt="imageleft"/> */}
                        {/* <h2>{props.row && props.row.m_szRatingScaleName}</h2>
                        {functionService.awsBucketImage(props.row && props.row.m_oMedia)  && (
                            <div style={{ paddingTop: '20px' }} className={styles.ratingImage}>
                                <img
                                src={functionService.awsBucketImage(props.row && props.row.m_oMedia)}
                                alt={props.row && props.row.m_szRatingScaleName} />
                            </div>
                        )}
                        <br></br>
                        <div 
                        className={stylesresults.textDescription}
                        dangerouslySetInnerHTML={{
                        __html: ((props.row.m_szRatingScaleDesc) && props.row.m_szRatingScaleDesc)}}>                    
                        </div> */}

                        <RatingBand band={props.row} />
                    </div>
                    </Col>
                    </Row>
                }
                
            
                {open &&
                <div className={styles.mianboxratingbands}>
                            <div className={styles.mianboxheaderratingbands}>
                                <h4>Edit Rating Band</h4>
                            </div>
                            <div className={styles.mianboxinnerbodyratingbands}>
                                <RatingForm getAllRatingBand={props.getAllRatingBand}  
                                setOpen={setOpen} 
                                setShowToast={setShowToast} 
                                setShowToast1={setShowToast1}
                                lRatingBandId = {props.row.m_lRatingScaleId}
                                szRatingBandName = {props.row.m_szRatingScaleName}
                                szRatingBandDesc = {props.row.m_szRatingScaleDesc}
                                szRedirectURL = {props.row.m_szRedirectURL}
                                nStartPoints = {props.row.m_nStartPoints}
                                nEndPoints = {props.row.m_nEndPoints}
                                nStartPercent = {props.row.m_nStartPercent}
                                nEndPercent = {props.row.m_nEndPercent}
                                setLoader={props.setLoader}
                                row={props.row}
                                type = "1"      
                                setSuccMessage={setSuccMessage}   
                                currentAssesment={props.currentAssesment} 
                                setCurrentAssesment={props.setCurrentAssesment}  
                                handleImageUpdate={props.handleImageUpdate}                     
                                />
                            </div>
                </div>
                }    
            </div>   
            <ConfirmModal show={show} handleClose={()=>setShow(false)} handleAction={handleAction} data={'0'} />
        </>
	);
}

export default Ratingbandslist;
