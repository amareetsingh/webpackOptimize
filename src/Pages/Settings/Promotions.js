import React, { useCallback, useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap'
import styles from './settingstyle.module.css';
//import Imagepromotions from '../../assets/images/topbanner.png';
import { useParams } from 'react-router-dom';
import { functionService, getPreviewColor } from '../../Context/functions';
import PromotionForm from './PromotionForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import {Form} from "react-bootstrap";

function Promotions(props) {
    const params = useParams();
    const[promotionList,setPromotionList]=useState([]);
    const[hideForm,setHideForm] = useState(true);
    const btnBgColor = getPreviewColor(props.currentAssesment, 2);
    const btnTxtColor = getPreviewColor(props.currentAssesment, 5);
    const [btnText, setBtnText] = useState(functionService.getCustomizeText(props.currentAssesment,2));
    const defaultAttr = {
        "m_lPromotionId": 0,
        "m_szPromoPhrase": '',
        "m_szPromotionDesc": '',
        "m_szPromotionDescPre": '',
        "m_szCallToActionURL": '',
        "m_dtPromoFrom": '',
        "m_dtPromoTo":''
    };

    const[editPromotion,setEditPromotion]=useState(defaultAttr);
    const getAllPromotions =  useCallback( async() =>  {
     let res = await functionService.post('Promotions/getAssessmentPromotions',{
         "assessmentId": params.id,
         "userId": 0
       });
     if(res !== false && res.status !== false){
       if(res.data.data.statusCode === 200){
        let listItem = JSON.parse(res.data.data.result);
       console.log('listItem', listItem)
        if(listItem.length === 0){setHideForm(false);}
        setPromotionList(listItem);

        //update this back to the assessment
        props.currentAssesment.m_listPromotions = listItem;
        //console.log("assessment", props.currentAssesment);
       }
       
     }else{
        setHideForm(false);
        if(res.error && res.error.response && res.error.response.status === 401 && localStorage.getItem('currentUser')){
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            window.location = "/login";
            return;
          }
     }
     
  },[params])


  useEffect(()=>{
    getAllPromotions();
  },[params,getAllPromotions]);


//   const handleCustomizationUpdate = (key) =>
//   {

//     let array = props.currentAssesment;
//     array["m_oEvalCustomizations"]["m_dictEvalCustomizations"][key] = btnText;
//     props.setCurrentAssesment(array);

//   }

  const handlePromotionSave = () =>
  {
    let assess = props.currentAssesment;
    assess.m_nPublishStatus = 3;
    assess["m_oEvalCustomizations"]["m_dictEvalCustomizations"][2] = btnText;
    props.setCurrentAssesment(assess);
    getAllPromotions();

  }

  const handleUpdate = (keyIndex)=>{
    let data = promotionList[keyIndex];
    setEditPromotion(data);
    setHideForm(false);
  }
// console.log("promotion",promotionList)
	return (
        <>
         
            <div className={styles.Ratingbandsdetails}>
                    {promotionList && promotionList.map((obj,index)=>(
                        
                    <div key={index}>
                       
                    <div className={styles.settingheaderboxpromotion}>
                    <h3>Promotions <span className={styles.ratingbandurl}> {obj && obj.m_szCallToActionURL && "(" + obj.m_szCallToActionURL + ")"}</span> </h3>

                        <div className={styles.flexrightbutton}>
                            <span className={styles.btn_redborder}>Remove</span>
                            <span className={styles.btn_edit} onClick={()=>handleUpdate(index)}>Edit</span>
                        </div>
                    </div>

                    <div className={styles.settingbodyboxcontant}>
                        <div className={styles.bodyQuestionlist}>
                            <div className={styles.promotionpagedetails}>
                                
                            <div style={hideForm === false?{'display':'none'}:{'display':'block'}} className="promotionTabs">
                            <Row>
                                <Col lg={7} className={styles.promotione_left}>
                                <Tabs defaultActiveKey="landing" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="landing" title="On Landing Page">
                                <div className={styles.promotionpagedetailsinner}>
                                    <div className={styles.promotione_innercontant}>
                                        <h2>{obj.m_szPromoPhrase}</h2>
                                        <div className={styles.promotione_desc} dangerouslySetInnerHTML={{__html: obj.m_szPromotionDescPre}}></div>                     
                                    </div>
                                 </div>
                                </Tab>
                                <Tab eventKey="results" title="On Results Page" >
                                <div className={styles.promotionpagedetailsinner}>
                                    <div className={styles.promotione_innercontant}>
                                        <h2>{obj.m_szPromoPhrase}</h2>
                                        <div className={styles.promotione_desc} dangerouslySetInnerHTML={{__html: obj.m_szPromotionDesc}}></div>
                                       {/* {obj && obj.m_szCallToActionURL &&
                                            "<a href=" + obj.m_szCallToActionURL + " className={styles.btn_redeemhere}>Redeem Here</a>"
                                        } */}

                                    {/* {console.log('bgcolor', btnBgColor)} */}
                                    {obj && obj.m_szCallToActionURL && obj.m_szCallToActionURL.trim() !=='' && 
                                    <a 
                                        href={obj && obj.m_szCallToActionURL} 
                                        className={styles.btn_redeemhere} 
                                        style={{background: btnBgColor, color:btnTxtColor}}
                                    >
                                        {btnText}
                                    </a> 
                                    }
                                </div>
                                    
                                </div> 
                                </Tab>                                
                            </Tabs>
                                </Col>
                                {/* {console.log('media obj',functionService.awsBucketImage(obj && obj.m_oMedia))} */}
                                <Col lg={5} className={styles.promotione_right}>
                                {functionService.awsBucketImage(obj && obj.m_oMedia) 
                                    && <div className={styles.promotione_innerimage}>
                                     <img 
                                        src={functionService.awsBucketImage(obj && obj.m_oMedia)} 
                                        alt="offer" />  
                                    </div>
                                } 
                                   
                                </Col>
                            </Row>
                            
                            </div>                        

                                {/* <div className={styles.promotionpagedetailsheader}>
                                    <h3 onClick={handleProTab} className={proTab ? 'aactive' : 'noactive'} >On Landing Page</h3>
                                    <h3 onClick={handleProTab1} className={proTab1 ? 'aactive' : 'noactive'}>On Results Page</h3>
                                </div>
                                <div className={styles.promotionpagedetailsinner}>
                                    {proTab &&
                                        <div className={styles.promotione_innercontant}>
                                            <h2>{obj.m_szPromoPhrase}</h2>
                                            <p>
                                            {obj.m_szPromotionDesc}
                                            </p>                                        
                                        </div>
                                    }
                                    {proTab1 &&
                                        <div className={styles.promotione_innercontant}>
                                            <h2>{obj.m_szPromoPhrase}</h2>
                                            <p>
                                            {obj.m_szPromotionDescPre}
                                            </p>
                                            <a href='/' className={styles.btn_redeemhere}>Redeem Here</a>
                                        </div>
                                    }
                                    <div className={styles.promotione_innerimage}>
                                        <img src={Imagepromotions} alt="Option" />
                                    </div>
                                </div> */}

                            </div>                            
                        </div>
                    </div>
                    </div>
                    ))}
                    { hideForm === false &&
                    <PromotionForm 
                        setHideForm={setHideForm} 
                        data={editPromotion} 
                        currentAssesment={props.currentAssesment} 
                        getAllPromotions={getAllPromotions} 
                        handlePromotionSave = {handlePromotionSave}
                        btnText={btnText} setBtnText={setBtnText}  
                        lPromotionId={0} 
                        setLoader={props.setLoader}/>
                    }
            </div>
        </>
	);
}

export default Promotions;
