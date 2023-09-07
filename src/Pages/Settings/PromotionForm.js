import React, { useEffect, useState } from 'react';
import styles from './settingstyle.module.css';
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';
import { functionService } from '../../Context/functions';
import Toaster from '../../Components/Toaster';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TextEditor from '../../Components/TextEditor';
import ImageUploader from '../../Components/ImageUploader';

function PromotionForm(props) {
    const params = useParams();
    const [disabled, setDisabled] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
    const toggleShowToast = () => setShowToast(!showtoast);
    const toggleShowToast1 = () => setShowToast1(!showtoast1);

    let defaultAttr = {
        "assessmentId": params.id,
        "userId": 0,
        "lPromotionId": props.data.m_lPromotionId,
        "szPromotionPhrase": props.data.m_szPromoPhrase,
        "szPromotionDesc": props.data.m_szPromotionDesc,
        "szPromotionDescPre": props.data.m_szPromotionDescPre,
        "szCallToActionURL": props.data.m_szCallToActionURL,
        "szStartDate": props.data.m_dtPromoFrom,
        "szEndDate": props.data.m_dtPromoTo
    };
    let defaultAttr1 = {
        lAssessmentId: params.id,
        dictCustomizations:{
            '2':props.btnText
        }
        
    };
   
    const [formData, setFormData] = useState(defaultAttr);
    const [formData1, setFormData1] = useState(defaultAttr1);

    // formData1["dictCustomizations"].push({
    //     '2':functionService.getCustomizeText(
    //         props.currentAssesment, 2
    //     )
    // })
    const handleSubmit = async () => {
        if (disabled === true) { return false; }
        setDisabled(true);
        props.setLoader(true)
        let res = await functionService.post('Promotions/saveAssessmentPromotion', formData);
        let btnRes = await functionService.post('Settings/saveCustomizations', formData1);
        if (res !== false && res.status !== false) {
            //props.getAllPromotions(); 
            setShowToast(true)
            setFormData(defaultAttr);
            let oPromo = JSON.parse(res.data.data.result);
            console.log("saved promotion", oPromo);
            props.handlePromotionSave(props.index, oPromo);

        } else {
            setShowToast1(true)
            if (res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                window.location = "/login";
                return;
            }
        }
        props.setHideForm(true)
        setDisabled(false);
        props.setLoader(false)
    }
    const handleTextData = (data) => {
        let dataArray = { ...formData };
        dataArray.szPromotionDesc = data.toString();
        if (dataArray && dataArray.assessmentType !== '') {
            setFormData(dataArray)
        }
    }

    const setFormObjectData = (data) => {
        props.getAllPromotions();
    }

    useEffect(() => {
        if (props.data.m_lPromotionId !== 0) {
            let defaultAttr = {
                "assessmentId": params.id,
                "userId": 0,
                "lPromotionId": props.data.m_lPromotionId,
                "szPromotionPhrase": props.data.m_szPromoPhrase,
                "szPromotionDesc": props.data.m_szPromotionDesc,
                "szPromotionDescPre": props.data.m_szPromotionDescPre,
                "szCallToActionURL": props.data.m_szCallToActionURL,
                "szStartDate": props.data.m_dtPromoFrom,
                "szEndDate": props.data.m_dtPromoTo
            };

            setFormData(defaultAttr);
        }
    }, [props.data, params]);

    // {console.log("formDataaaaa",formData)}
    // {console.log("formD1234567890ataaaaa",props.data)}

    const handleBtnText = (key, val) => {
        
        let array = { ...props.data };
        let defaultAttr1 = {
            lAssessmentId: params.id,
            dictCustomizations:{
                '2':val
            }
            
        };

        props.setBtnText(val);
        setFormData1(defaultAttr1)
        // setFormData(array)
        // setCurrentAssesment(array);
        // alert("val",val + " " + array['m_oEvalCustomizations']['m_dictEvalCustomizations'][key]);
    };


    const handleTextDataBefore = (data) => {
        let dataArray = { ...formData };
        dataArray.szPromotionDescPre = data.toString();
        if (dataArray && dataArray.assessmentType !== '') {
            setFormData(dataArray)
        }
    }

    //console.log(' props.currentAssesment', props.currentAssesment)
    return (
        <>
            <div className={styles.mianboxratingbands}>
                <div className={styles.mianboxheaderratingbands}>
                    <h4>Edit Promotions</h4>
                </div>
                <div className={styles.mianboxinnerbodyratingbands}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter a brief phrase (2-3 words):</Form.Label>
                            <Form.Control type="text" value={formData.szPromotionPhrase} onChange={(e) => { setFormData({ ...formData, szPromotionPhrase: e.target.value }) }} />
                        </Form.Group>
                        {props.data.m_lPromotionId !== 0 &&
                            <Form.Group className="mb-3">
                                <div className={styles.optionimgupload}>
                                    <ImageUploader nPurpose={101} lPurposeId={props.data.m_lPromotionId} setCurrentObject={setFormObjectData} setCurrentData={formData} />
                                </div>
                            </Form.Group>
                        }
                        <Form.Group className="mb-3">
                            <Form.Label>What should be shown to users BEFORE starting the assessment?</Form.Label>
                            {/* <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>{setFormData({...formData,szPromotionDescPre:e.target.value})}}
                                    /> */}
                            <TextEditor
                                datas={(props.data.m_szPromotionDescPre !== undefined && props.data.m_szPromotionDescPre !== false) && props.data.m_szPromotionDescPre + ""}
                                classes="dimDescription"
                                formData={formData}
                                //setFormData={setFormData}
                                handleTextData={handleTextDataBefore}
                            //dataKey='szPromotionDescPre'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>What should be shown to users AFTER they complete the assessment?</Form.Label>
                            {/* <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>{setFormData({...formData,szPromotionDesc:e.target.value})}}
                                    /> */}
                            <TextEditor
                                datas={(props.data.m_szPromotionDesc !== undefined && props.data.m_szPromotionDesc !== false) && props.data.m_szPromotionDesc + ""}
                                classes="dimDescription"
                                formData={formData}
                                // setFormData={setFormData}
                                handleTextData={handleTextData}
                            //dataKey='szPromotionDesc'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter the URL for the call to action to redeem the offer:</Form.Label>
                            <Form.Control type="text"
                                value={formData.szCallToActionURL}
                                onChange={(e) => { setFormData({ ...formData, szCallToActionURL: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-2 mt-4"
                            controlId="exampleForm.ControlInput4"
                        >
                            <Form.Label>CTA Button Text:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Text"
                                onChange={(e) =>
                                    handleBtnText("1", e.target.value)
                                }
                               defaultValue={props.btnText
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start date of the offer (or leave blank to be active always).</Form.Label>
                            <Form.Control type="date"
                                defaultValue={functionService.convertDate(formData && formData.szStartDate, 1)}
                                onChange={(e) => { setFormData({ ...formData, szStartDate: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End date of the offer (or leave blank to be active always).</Form.Label>
                            <Form.Control type="date"
                                defaultValue={functionService.convertDate(formData && formData.szEndDate, 1)}
                                onChange={(e) => { setFormData({ ...formData, szEndDate: e.target.value }) }}
                            />
                        </Form.Group>
                        <span onClick={handleSubmit} className={styles.btn_skyblue}>{props.data.lPromotionId === 0 ? 'Save' : 'Update'}</span>
                        &nbsp;
                        {props.data.lPromotionId !== 0 && <span onClick={() => props.setHideForm(true)} className={styles.btn_skyblue}>Cancel</span>}
                    </Form>
                </div>
            </div>
            <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Updated Successfully!!" toasticon={faCheckCircle} />
            <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message="Updation Failed!!" toasticon={faBan} />
        </>
    );
}

export default PromotionForm;
