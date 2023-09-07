import React, { useEffect, useState } from "react";
import styles from "./assesment.module.css";
// import pexelsback from "../../assets/images/pexelsback.jpg";
import SketchColorPicker from "./Sketch";
// import {
//   checkOption,
//   functionService,
//   getPreviewColor,
// } from "../../Context/functions";
import colorpikerbtn from "../../assets/images/colorpikerbtn.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import LandingLayout from "./LandingLayout";
import Loader from "../../Components/Loader";

function Landingtab(props) {
  // var layout =   props.currentAssesment.m_oLayout

  let defaultColor = {
    btnBg: `rgba(71, 62, 143)`,
    txtColor: `rgba(245, 245, 245)`,
    titleColor: `rgba(0, 0, 0,1)`,
    bgColor: `rgba(241,241,241,1)`,
  };
  const [loader, setLoader] = useState(false)
  const [colorPicker, setColorPicker] = useState(defaultColor);
  const [surveyContent, setSurveyContent] = useState({});
  /*Form variable*/

  const getData = async (data) => {
    setLoader(true)
    const defaultAttr = {
      toolId: data && data.m_lSurveyId,
      toolName: data && data.m_szSurveyName,
      toolDesc: data && data.m_szSurveyDesc,
      toolDescPostCompletion: data && data.m_szSurveyDescPostCompletion,
      assessmentType: data && data.m_nAssessmentType + "",
      userId: 0,
      nLayoutId: data && data.m_oLayout && data.m_oLayout.m_nLayoutId,
    };

    setSurveyContent(data);
    //console.log("surveyContent", surveyContent)
    setLoader(false)
    if (data && data.m_szSurveyName && data.m_oColorScheme.m_dictColors) {
      defaultColor = {
        btnBg: data.m_oColorScheme.m_dictColors[2],
        txtColor: data.m_oColorScheme.m_dictColors[5],
        titleColor: data.m_oColorScheme.m_dictColors[3],
        bgColor: data.m_oColorScheme.m_dictColors[1],
      };
      setColorPicker(defaultColor);
    }

    let dataKeys = {
      btnBg: "2",
      txtColor: "5",
      titleColor: "3",
      bgColor: "17",
    };
    defaultAttr["listMetadata"] = [];
    Object.keys(dataKeys).forEach((element) => {
      defaultAttr["listMetadata"].push({
        type: "3",
        key: dataKeys[element],
        value: defaultColor[element],
      });
    });
    let dataObject =
      Object.keys(data).length > 0
        ? data &&
          data["m_oEvalCustomizations"] &&
          data["m_oEvalCustomizations"]["m_dictEvalCustomizations"]
        : {};
    if (dataObject) {
      Object.keys(dataObject).forEach((element) => {
        defaultAttr["listMetadata"].push({
          type: "9",
          key: element,
          value: dataObject[element],
        });
      });
    }

    props.setFormData(defaultAttr);
  };
  useEffect(() => {
    if (Object.keys(props.currentAssesment).length > 0) {
      getData(props.currentAssesment);
    }
  }, [props.currentAssesment]);
  const setFormUpdatedData = () => {
    let dataKeys = { btnBg: "2", txtColor: "5", titleColor: "3", bgColor: "1" };
    let dataArray = { ...props.formData };
    dataArray["listMetadata"] = [];
    Object.keys(dataKeys).forEach((element) => {
      dataArray["listMetadata"].push({
        type: "3",
        key: dataKeys[element],
        value: colorPicker[element],
      });
    });
    let data =
      Object.keys(props.currentAssesment).length > 0
        ? props.currentAssesment["m_oEvalCustomizations"][
            "m_dictEvalCustomizations"
          ]
        : {};
    Object.keys(data).forEach((element) => {
      dataArray["listMetadata"].push({
        type: "9",
        key: element,
        value: data[element],
      });
    });

    dataArray.nLayoutId =
      props.currentAssesment &&
      props.currentAssesment.m_oLayout &&
      props.currentAssesment.m_oLayout.m_nLayoutId;

    props.setFormData(dataArray);
    //console.log("array Landing",props.formData);
  };

  useEffect(() => {
    setFormUpdatedData();
  }, [colorPicker]);

  return (
    <>
    <Loader loader={loader}/>
    <div  className={styles.scrollLanding}>
    <div className={styles.textstylings}>
        <div className={styles.color_piker}>
          <div className={styles.colorPikerBTN}>
            <div className={styles.imageiconpellete}>
              <img
                src={colorpikerbtn}
                alt="colorpikerbtn"
                className={styles.imagesetColorpelleteIcon}
              />
            </div>
            <OverlayTrigger overlay={<Tooltip>Button Background </Tooltip>}>
              <Link to="#">
                <SketchColorPicker
                  selectedColor={colorPicker["btnBg"]}
                  setSelectedColor={(e) =>
                    setColorPicker({ ...colorPicker, btnBg: e })
                  }
                  colorPelletes={styles.colorPellete}
                />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Text Color </Tooltip>}>
              <Link to="#">
                <SketchColorPicker
                  selectedColor={colorPicker["txtColor"]}
                  setSelectedColor={(e) =>
                    setColorPicker({ ...colorPicker, txtColor: e })
                  }
                  colorPelletes={styles.colorPellete}
                />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Title Color </Tooltip>}>
              <Link to="#">
                {" "}
                <SketchColorPicker
                  selectedColor={colorPicker["titleColor"]}
                  setSelectedColor={(e) =>
                    setColorPicker({ ...colorPicker, titleColor: e })
                  }
                  colorPelletes={styles.colorPellete}
                />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Background Color </Tooltip>}>
              <Link to="#">
                {" "}
                <SketchColorPicker
                  selectedColor={colorPicker["bgColor"]}
                  setSelectedColor={(e) =>
                    setColorPicker({ ...colorPicker, bgColor: e })
                  }
                  colorPelletes={styles.colorPellete}
                />{" "}
              </Link>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    <LandingLayout currentAssesment={props.currentAssesment} colorPicker={colorPicker} />
    </div>
    </>
  );
}

export default Landingtab;
