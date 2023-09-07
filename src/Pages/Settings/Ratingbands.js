import React, { useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Collapse from 'react-bootstrap/Collapse';
import Ratingbandslist from './Ratingbandslist';
import { useParams } from 'react-router-dom';
import { functionService } from '../../Context/functions';
import RatingForm from './RatingForm';
import Toaster from '../../Components/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { faBan} from '@fortawesome/free-solid-svg-icons';
import { faPlus} from '@fortawesome/free-solid-svg-icons';


function Ratingbands(props) {
    const [open, setOpen] = useState(false);
    const [ratingBand, setRatingBand] = useState({});
    const params = useParams();
    const [showtoast, setShowToast] = useState(false);
    const[message, setMessage] = useState("Some error occurs!");
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast(!showtoast1);
    const[succmessage,setSuccMessage]=useState("Updated Successfully!!");
//     const getAllRatingBand = async () => {
//     props.setLoader(true);
//      let res = await functionService.post('RatingBands/getAssessmentBands',{
//          "assessmentId": params.id,
//          "userId": 0
//        });
//      if(res !== false && res.status !== false){
//          let data = JSON.parse(res.data.data.result);
//          //console.log('Rating Band',JSON.parse(res.data.data.result));
//           setRatingBand(data['m_oRatingScalesGroup']['m_dictRatingScales']);
//      }else{
//         if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
//             localStorage.removeItem('currentUser');
//             localStorage.removeItem('token');
//             window.location = "/login";
//             return;
//           }
//      }
//      props.setLoader(false);
     
//   }
const getAllRatingBand = async () => {
    props.setLoader(true);
    if (props.currentAssesment !== undefined) {

    if (props.currentAssesment.m_oRatingScalesGroup) {
        setRatingBand(
            props.currentAssesment &&
            props.currentAssesment.m_oRatingScalesGroup.m_dictRatingScales 
        );
    }
    
    }
    props.setLoader(false)
}

const handleImageUpdate = (bandId, oMedia) => {

    console.log('updated image: ', bandId, oMedia);
    let assessment = props.currentAssesment;
    let dictBands = assessment.m_oRatingScalesGroup.m_dictRatingScales;

    let  index = Object.values(dictBands).findIndex((band) => band.m_lRatingScaleId === bandId);
 
    console.log('index', index);
    index = index + 1;

    const updatedBand = {
        ...dictBands[index],
        m_oMedia: oMedia,
      };

    console.log('updated band', updatedBand);

    const updatedDictionary = {
    ...dictBands,
    [index]: updatedBand,
    };

    assessment.m_oRatingScalesGroup.m_dictRatingScales = updatedDictionary;
    console.log('new scales in assessment', updatedDictionary);
    props.setCurrentAssesment(assessment);
    getAllRatingBand();

    //props.setLoader(false)
}

useEffect(()=>{
    getAllRatingBand();
  },[params,getAllRatingBand]);
  //console.log("ratingBand",ratingBand)
	return (
        <>
            <div className={styles.Ratingbandsdetails}>
                <div className={styles.settingheaderbox}>
                    <h3 >Rating Bands & Scoring Details</h3>
                    {/* <div className={styles.flexrightbutton}>
                        <a href="#" className={styles.btn_skyblue}>Rating Bands</a>
                        <a href="#" className={styles.btn_skyblue}>Scoring Details</a>
                    </div> */}
                </div>

                <div className={styles.ratingbandsdetailsinnerbody}>
                    <div className={styles.headerdflexnewbands}>
                    <h3>Your respondents can be shown a custom result or rating based on their total score. Specify those rating bands here.</h3>
                        <span className={styles.btn_skyblue}                         
                        onClick={() => setOpen(!open)} 
                        aria-controls="example-collapse-text" 
                        aria-expanded={open}>
                        <FontAwesomeIcon className="me-2" icon={faPlus} size={'sm'}/>Add New Bands</span>
                    </div>

                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <div className={styles.mianboxratingbands}>
                                <div className={styles.mianboxheaderratingbands}>
                                    <h4>Add Rating Band</h4>
                                </div>
                                <div className={styles.mianboxinnerbodyratingbands}>
                                  <RatingForm 
                                  setLoader={props.setLoader}  
                                  getAllRatingBand={getAllRatingBand} 
                                  setOpen={setOpen}
                                  setShowToast={setShowToast} 
                                  setShowToast1={setShowToast1}
                                  setMessage={setMessage}
                                  setSuccMessage={setSuccMessage} 
                                  currentAssesment={props.currentAssesment}
                                  setCurrentAssesment={props.setCurrentAssesment}
                                  />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    {ratingBand && Object.keys(ratingBand).map((obj,index)=>(
                        <div key={index}>
                            {
                                ratingBand[obj].m_nIsScoringBand === 0 &&
                                 
                                <Ratingbandslist 
                                    currentAssesment={props.currentAssesment}  
                                    setCurrentAssesment={props.setCurrentAssesment} 
                                    setLoader={props.setLoader} 
                                    key={index} 
                                    row={ratingBand[obj]} 
                                    getAllRatingBand={getAllRatingBand}
                                    handleImageUpdate={handleImageUpdate}
                                />
                            }
                        </div>
                        
                    ))}
                    
                    
                </div>

                
                {/* <Ratingbandscoringdetails/> */}


                {/* <div className={styles.ratingbandsdetailsinnerbody}>
                    <div className={styles.mianboxratingbands}>
                        <div className={styles.mianboxheaderratingbands}>
                            <h4>Rating Levels</h4>
                        </div>
                        <div className={styles.mianboxinnerbodyratingbands}>
                            <p>
                            Your respondents can be shown a custom result or rating based on their total score. Specify those rating bands here.
                            </p>
                        </div>
                        <div className={styles.ratinglavel}>
                            <div className={styles.main_ratinglavelbox}>
                                <h4>Brand Nirvana</h4>
                                <div className={styles.ratinglavelinnerpart}>
                                    <Form>
                                        <Form.Group className={styles.formgroupratinglavel}>
                                            <div className={styles.inlineformfileds}>
                                            <Form.Label>% greater than:</Form.Label> <Form.Control type="text" placeholder="80" />
                                            </div>  
                                            <div className={styles.inlineformfileds}>
                                            <Form.Label>Points greater than:</Form.Label>   <Form.Control type="text" placeholder="4" />
                                            </div>
                                            <div className={styles.inlineformfileds}>
                                            <Form.Label>% less than or equal to:</Form.Label>   <Form.Control type="text" placeholder="3" />
                                            </div>
                                            <div className={styles.inlineformfileds}>
                                            <Form.Label>Points less than or equal to:</Form.Label>   <Form.Control type="text" placeholder="2" />
                                            </div>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">  Save </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status ="Success" message={succmessage} toasticon={faCheckCircle}/>
        <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status ="Error" message={message} toasticon={faBan}/>
            </div>
        </>
	);
}

export default Ratingbands;
