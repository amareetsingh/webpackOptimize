import React, { useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { functionService } from '../../Context/functions';
import TextEditor from '../../Components/TextEditor';
import ImageUploader from '../../Components/ImageUploader';
//import Leftimagebands from '../../assets/images/topbanner.png';


function RatingForm(props) {
        const params = useParams();
    const [disabled, setDisabled] = useState(false);
    const[setCurrentData,setCurrentObject]=useState({"m_oMedia":{}});

    const defaultAttr = {

        "lAssessmentId": params.id,
        "lRatingBandId": props.lRatingBandId,
        "szRatingBandName": props.szRatingBandName,
        "szRatingBandDesc": props.szRatingBandDesc,
        "szRedirectURL": props.szRedirectURL,
        "nStartPoints": props.nStartPoints,
        "nEndPoints": props.nEndPoints,
        "nStartPercent": props.nStartPercent,
        "nEndPercent": props.nEndPercent
    };
    const [formData, setFormData] = useState(defaultAttr);
    const handleSubmit = async () => {
        if (disabled === true) { return false; }
        setDisabled(true);
        props.setLoader(true);
        let res = await functionService.post('RatingBands/save', formData);
        //console.log("rat", res)
        if (res !== false && res.status !== false) {
            // console.log("props",props)
            props.getAllRatingBand();
            props.setShowToast(true)
            props.setOpen(false)
            formData.szRatingBandName = "";
            formData.nStartPercent = "";
            formData.nStartPoints = "";
            formData.nEndPercent = "";
            formData.nEndPoints = "";
            formData.szRatingBandDesc = "";
            formData.szRedirectURL = "";
            //setOpen(false);
            props.setCurrentAssesment({...props.currentAssesment,m_oRatingScalesGroup:JSON.parse(res.data.data.result)});
            props.setSuccMessage("Updated Successfully!!");
        } else {
            if(res.hasOwnProperty("data")){
                props.setMessage(res.data.data.result);
            }else{
                props.setMessage("Some error occured!!");
            }
            
            props.setShowToast1(true)
            if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
				localStorage.removeItem('currentUser');
				localStorage.removeItem('token');
				window.location = "/login";
				return;
			  }
        }
        setDisabled(false);
        props.setLoader(false);
    }

    const handleTextData = (data) => {
        let dataArray = {...formData};
        dataArray.szRatingBandDesc = data.toString();
        if(dataArray && dataArray.assessmentType !== ''){
                setFormData(dataArray)
        }
    } 
    useEffect(()=>{
        if(Object.keys(setCurrentData['m_oMedia']).length > 0){
            props.getAllRatingBand();
        }
    },[setCurrentData])
    // console.log("props.szRatingBandDesc",props.szRatingBandDesc)
    return (
        <>

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Rating band name"
                        value={formData.szRatingBandName}
                        onChange={(e) => { setFormData({ ...formData, szRatingBandName: e.target.value }) }}
                    />
                </Form.Group>
                { (props.currentAssesment && props.currentAssesment.m_nAssessmentType !== 1) && 
                <>
                <Form.Group className={styles.mbTop}>
                    <Form.Label>If both percentage and points ranges are specified, then percentage range will be used for scoring</Form.Label>
                </Form.Group>
                <Form.Group className={styles.formgroupratinglavel}>
                    <div className={styles.formgroupratinglavelone}>
                        <div className={styles.inlineformfileds}>
                            <Form.Label>% greater than:</Form.Label>
                            <Form.Control type="text" placeholder="80"
                                value={formData.nStartPercent}
                                onChange={(e) => { setFormData({ ...formData, nStartPercent: e.target.value }) }}
                            />
                        </div>
                        <div className={styles.inlineformfileds}>
                            <Form.Label>% less than or equal to:</Form.Label>
                            <Form.Control type="text" placeholder="3"
                                value={formData.nEndPercent}
                                onChange={(e) => { setFormData({ ...formData, nEndPercent: e.target.value }) }}
                            />
                        </div>
                    </div>

                    <div className={styles.formgroupratinglavelone}>
                        <div className={styles.inlineformfileds}>
                            <Form.Label>Points greater than:</Form.Label>
                            <Form.Control type="text" placeholder="4"
                                value={formData.nStartPoints}
                                onChange={(e) => { setFormData({ ...formData, nStartPoints: e.target.value }) }}
                            />
                        </div>
                        <div className={styles.inlineformfileds}>
                            <Form.Label>Points less than or equal to:</Form.Label>
                            <Form.Control type="text" placeholder="2"
                                value={formData.nEndPoints}
                                onChange={(e) => { setFormData({ ...formData, nEndPoints: e.target.value }) }}
                            />
                        </div>                  
                    </div>
                </Form.Group>
                </>
                }


                <Form.Group className="mb-3" controlId="exampleForm.ControlRedirectURL">
                    <Form.Label>External Redirect URL (optional):</Form.Label>
                    <Form.Control type="text" placeholder="External Redirect URL"
                        value={formData.szRedirectURL}
                        onChange={(e) => { setFormData({ ...formData, szRedirectURL: e.target.value }) }}
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    {/* <Form.Control as="textarea" rows={3} 
                                            value={formData.szRatingBandDesc}
                                            onChange={(e)=>{setFormData({...formData,szRatingBandDesc:e.target.value})}}
                                            /> */}
                    <TextEditor
                        datas={typeof props.szRatingBandDesc !== "undefined" ? props.szRatingBandDesc + "" : ""}
                        classes="dimDescription"
                        formData={formData}
                       // setFormData={setFormData}
                        handleTextData={handleTextData}   
                        //dataKey='szRatingBandDesc'
                    />
                </Form.Group>
                <Form.Group className={styles.rating_imageuploaderbox}>
                {props.type === "1" &&                
                    <ImageUploader 
                        className={styles.rating_imageuploader} 
                        nPurpose={5} 
                        lPurposeId={formData && formData.lRatingBandId} 
                        setCurrentObject={setCurrentObject} 
                        setCurrentData={setCurrentData}
                        handleImageUpdate={props.handleImageUpdate}
                    />
                }
              {functionService.awsBucketImage(props.row && props.row.m_oMedia) !== false && 
                    <img 
                        src={functionService.awsBucketImage(props.row && props.row.m_oMedia)
                            //  !== false 
                            //  ? functionService.awsBucketImage(props.row && props.row.m_oMedia) 
                            //  : Leftimagebands
                            } alt={formData.szRatingBandName}/>
              }
                </Form.Group>
                <span onClick={handleSubmit} className={styles.btn_skyblue1}>Save</span>
                <span onClick={() => props.setOpen(false)} className={styles.btn_cancel}>Cancel</span>
            </Form>

        </>
    );
}

export default RatingForm;
