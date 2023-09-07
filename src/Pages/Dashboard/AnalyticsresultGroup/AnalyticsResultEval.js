import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import styles from "../../Analyticsresult/analyticsresult.module.css";
import Table from 'react-bootstrap/Table';
// import Footer from "../../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ProfileChart1 } from "../../Assesment/ProfileChart";
// import minilogofooter from "../../assets/images/Mini_logo-footer.png";
import "react-circular-progressbar/dist/styles.css";
import printIcon from "../../../assets/printIcon.svg";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import viewLink from '../../../assets/view_link.svg';
import EvalAssessmentSection from './EvalAssessmentSection'

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import {
    checkOptionSetting,
    functionService,
    getColor,
    getColor1,
} from "../../../Context/functions";
import GraphData from "../../Front/GraphData";
// import GoalsList from "./GoalsList";
import Loader from "../../../Components/Loader";
import Promotions from "../../Assesment/Promotions";
// import QByQAnalysisSection from "../../Assesment/QByQAnalysisSection";
// import NoDataFound from "./NoDataFound";
import AssementScroreTable from './AssementScroreTable';



ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const AnalyticsResultEval = () => {
    const [loader, setLoader] = useState(false);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [resultData, setResultData] = useState({})
    const [colors, setColors] = useState({});
    const [media, setMedia] = useState({});
    const [groups, setGroups] = useState([])



    useEffect(() => {
        
        if (params.get("id") != null) {

            const getData = async () => {
                setLoader(true);
                let res = await functionService.post("Assessment/getEvalinatorResults", {
                    lEvalinatorId: params.get("id"),
                    lGroupId: params.get("groupId"),
                });

                // console.log()

                if (res.status === true) {

                    if (res.data.data.statusCode === 200) {
                        let evalResult = JSON.parse(res.data.data.result);

                        setResultData(evalResult);
                        console.log("evalResult", evalResult);

                        /*const firstKeyValuePair = Object.entries(evalResult.dictEvalinatorResults)[0];
                        const firstItem = Object.entries(firstKeyValuePair.values)[0];
                        setColors(firstItem?.oAssessment?.m_oColorScheme);
                        */
                       setColors(evalResult.m_oColorScheme);

                    }
                } else {
                    if (
                        res.response &&
                        res.response.status === 401 &&
                        localStorage.getItem("currentUser")
                    ) {
                        localStorage.removeItem("currentUser");
                        localStorage.removeItem("token");
                        window.location = "/login";
                        return;
                    }
                }
                setLoader(false);

            };
            getData();

        }

    }, []);



    return (

        <div>
            <div className={styles.analyticsresultPage}>

                <Container
                    className={
                        checkOptionSetting(170, 2, resultData)
                            ? ""
                            : styles.fluidContainer
                    }
                >
                    <div className='resutlPageBreak' >
                        <Row className={styles.mainImageDiv} >
                            <Col>

                                <div
                                    style={
                                        checkOptionSetting(
                                            170,
                                            1,

                                            resultData && resultData.oAssessment?.m_oMedia &&
                                            resultData.oAssessment.m_oMedia.m_szURL !== ''

                                        )
                                            ? {}
                                            : {

                                                background: getColor1(colors, 1)
                                            }
                                    }
                                    className={`${styles.mainContainerAnalytics} ${checkOptionSetting(170, 2, resultData)
                                        ? styles.landingshortBanner
                                        : styles.landingtallBanner
                                        }`}
                                >
                                    <div className={styles.landingfullImage}>
                                        {media &&
                                            media.m_szURL !== "" && (
                                                <img
                                                    src={media.m_szURL}
                                                    className={styles.pexelsback}
                                                    alt={resultData && resultData.oAssessment && resultData.oAssessment.m_szSurveyName}
                                                />

                                            )}

                                        <img src={printIcon} alt="print" className={styles.printbtn} onClick={() => window.print()} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>

                {/* ****************** roundcircelresult statrt*/}

                <div className={`${styles.roundcircelresult} ${styles.roundcricleEvel}`}>
                    <h4>

                        <span>
                            <CircularProgressbarWithChildren
                                value={resultData && resultData.oStatusSummary && resultData.m_sHighestPossibleScore > 0 ? 
                                    (Math.round(resultData.oStatusSummary.m_sFinalScore / resultData.m_sHighestPossibleScore) * 100) : 100}
                                styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '32px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#473E8F`,
                                    textColor: '#000',
                                    trailColor: '#C4C4C4',
                                    backgroundColor: '#000',
                                })}>
                                <div style={{ fontSize: 30, marginTop: -5 }}>

                                { resultData && resultData.oStatusSummary && resultData.m_sHighestPossibleScore > 0 ? 
                                    (`${Math.round(resultData.oStatusSummary.m_sFinalScore)} / ${resultData.m_sHighestPossibleScore}`) : "Computing..."}
                                    {/* <strong>{Math.floor(resultData.oStatusSummary && resultData.oStatusSummary
                                        .m_sFinalScore)}</strong> {resultData.m_sHighestPossibleScore > 0 && `/ ${resultData.m_sHighestPossibleScore}`} */}
                                
                                
                                </div>
                            </CircularProgressbarWithChildren>

                        </span>

                    </h4>
                </div>

                {/* *************result box start ******* */}
                <div className={styles.resultbox}>

                    <Row >
                        <div className={styles.title} style={{ color: getColor1(colors, 6), }} >
                            <span >
                                {resultData?.szRespondentName}
                            </span>
                            <span className={styles.AsseseementUser}>
                                {resultData && resultData.oEvalinator &&
                                    "Results of " + resultData.oEvalinator.m_szEvalinatorName
                                }
                            </span>
                        </div>
                    </Row>
                    <div className={styles.titlebox1main}>
                    </div>
                </div>

                {/* **********GraphData ***** */}

                <Container className='resutlPageBreak' >

                    <Row >
                        <Col className="justify-content-md-center text-center">
                            <div className={styles.contantforresult}>

                                <div className={styles.growthGrpah}>

                                    <GraphData
                                        data={resultData?.dictChartData}
                                        title={true}
                                        chartType={"51"}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    {
                        resultData 
                        && resultData.dictEvalinatorResults 
                        && Object.values(resultData.dictEvalinatorResults).map((obj) => (
                        <>
                        {/* {console.log("obj", obj)} */}
                            
                                {obj.map(assess => (
                                <>
                                {/* {console.log("assess", assess)} */}
                                    <EvalAssessmentSection obj={assess} resultData={resultData} />
                                </>
                                ))}
                            
                        </>  
                    ))}

                </Container>

            </div>
        </div>



    )
}

export default AnalyticsResultEval