import { faInfo, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from '../Pages/Assesment/assesment.module.css';
import { Form } from "react-bootstrap";
import { functionService } from '../Context/functions';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Toaster from './Toaster';
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

function ImageUploader({ nPurpose, lPurposeId = 0, label = 'Upload Image', labelShow = true, setCurrentObject, setCurrentData = {},infoIcon=false, handleImageUpdate }) {

  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const [showtoast1, setShowToast1] = useState(false);
  const toggleShowToast = () => setShowToast(!showtoast);
  const toggleShowToast1 = () => setShowToast1(!showtoast1);

  //console.log("In ImageUploader: setcurrentdata",setCurrentData );
  //console.log("In ImageUploader: setcurrentObject function",setCurrentObject );

  async function sleep(ms) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        clearInterval(interval);
        resolve();
      }, ms);
    });
  }

  const handleUpload = async (event) => {
    let file = event.target.files[0];
    if(file == null || file.name == ""){
      return false;
    }
    const filename = file.name;
  
    if (disabled === true) { return false; }
    setLoader(true);
    setDisabled(true);
    let res = await functionService.post("Images/save", {
      "szExtension": filename.split('.').pop(),
      "nPurpose": nPurpose,
      "lPurposeId": lPurposeId,
      "lUserId": 0
    });

    if (res !== false && res.status !== false) {
      if (res.data.data.statusCode === 200) {
        let dataResult = res.data.data.result;
        //let image = dataResult.cStMedia;
        //let imageurl = image.m_szURL;
       if(nPurpose === 103){
        let loginUser = JSON.parse(localStorage.getItem('currentUser'));
        loginUser.oUser.m_oMedia =dataResult.cStMedia;
        localStorage.setItem('currentUser',JSON.stringify(loginUser));
        
       }
        var new_file = new File([file], dataResult.m_szFileName, { type: "image/jpg" });
        await uploadFileToS3(dataResult.m_szSignedURL, new_file, dataResult);

        //await sleep(1000);

        // manish - send the media object returned from image/save back to the calling function so they can set it back in the object for display
        if (handleImageUpdate) {
          //alert("calling handleImageUpdate:" + lPurposeId + ":" + dataResult.cStMedia.m_szURL);
          handleImageUpdate(lPurposeId, dataResult.cStMedia);
        }
       
      } else {
         //console.log("res",res);
         setShowToast1(true);
        if(res.response.status === 401 && localStorage.getItem('currentUser')){
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          window.location = "/login";
          return;
          }
      }
    }else{
      setShowToast1(true);
    }
    setDisabled(false);
    //setLoader(false);
    //event.target.value = '';
  }

  const uploadFileToS3 = async (signedUrl, file, dataResult) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrl, true);
      xhr.setRequestHeader('Content-Type', '');
      xhr.onload = () => {
        if (xhr.status === 200) {
          setLoader(false);
          //console.log("media object uploaded", dataResult.cStMedia);
          {setCurrentObject && 
            setCurrentObject({ ...setCurrentData, m_oMedia: dataResult.cStMedia })
          }
          setShowToast(true);
          resolve();
        } else {
          setShowToast1(true);
          setLoader(false);
          reject();
        }
      };
      xhr.onerror = () => {
        setLoader(false);
        setShowToast1(true);
        reject();
      };
      setLoader(false);
      xhr.send(file);
    });
  };
  


  /*const uploadFileToS3 = async (signedUrl, file, dataResult) => {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl, true);
    xhr.setRequestHeader('Content-Type', '');
    xhr.onload = () => {
      if (xhr.status === 200) {
        setLoader(false);
        setCurrentObject({ ...setCurrentData, m_oMedia: dataResult.cStMedia })
        setShowToast(true);
        //window.location.reload(true);
      }else{
        setShowToast1(true);
        setLoader(false);
      }
      
    };
    xhr.onerror = () => {
      setLoader(false);
      setShowToast1(true);
      // error...
    };
    // xhr.send("Signature="+sign); 
    setLoader(false);
    xhr.send(file);

  };*/



  return (
    <>
      <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Image updated Successfully!!" toasticon={faCheckCircle} />
      <Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message="Image Upadtion Failed!!" toasticon={faBan} />
      <Form.Group className={styles.imageUploader}>
        {labelShow && <Form.Label>
        Upload Image 

        { infoIcon && ['top'].map((placement) => (
          <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
              <Tooltip id={`tooltip-${placement}`}>
                For banner style backgrounds, suggested height is around 400 pixels.
              </Tooltip>
            }
          >
            <span className={styles.infoIcon}> <FontAwesomeIcon icon={faInfo} alt="info" /> </span> 
          </OverlayTrigger>
        ))}

        </Form.Label>}
        <Form.Control type="file" onChange={handleUpload} />
        {loader &&
          <FontAwesomeIcon className={styles.loaderIconup} icon={faSpinner} spin />
        }
      </Form.Group>
    </>
  );
}

export default ImageUploader;
