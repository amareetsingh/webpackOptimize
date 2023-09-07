import React, {useEffect, useState} from 'react';
import question_images from "../assets/images/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from './ImageUploader';
import { functionService } from '../Context/functions';
import styles from "../Pages/Assesment/assesment.module.css"

const ImageAddEdit = ({oMedia, nPurposeType, lPurposeId, handleImageUpdate, setCurrentObject, setCurrentData}) => {


    //console.log("media holder", oMedia);
    const [media, setMedia] = useState(oMedia);
    const [purposeType, setPurposeType] = useState(nPurposeType);
    const [purposeId, setPurposeId] = useState(lPurposeId);
    //const [imageUpdate, setImageUpdate] = useState(handleImageUpdate);

  useEffect(() => {
    setMedia(oMedia);
    setPurposeId(lPurposeId);
    setPurposeType(nPurposeType);
    //setImageUpdate(handleImageUpdate);
  }, [oMedia]);

  return (
    
    <div className={styles.left_partquestion}>
    <img
      src={
        functionService.awsBucketImage(
          media
        ) !== false
          ? functionService.awsBucketImage(
              media
            )
          : question_images
      }
      alt="question_images"
    />
    <div className={styles.deletImage}>
      {" "}
      <FontAwesomeIcon icon={faTrashAlt} />{" "}
    </div>
    <div className={styles.editIconbox}>
      <div className={styles.editImage}>
        {" "}
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      {/* <input type="file" className={styles.editImagechoose}/> */}
      <div className={styles.editImagechoose}>
        <ImageUploader
          setCurrentObject={setCurrentObject}
          setCurrentData={setCurrentData}
          nPurpose={purposeType}
          lPurposeId={
            purposeId
          }
          label={"Upload/change"}
          handleImageUpdate={handleImageUpdate}
        />
      </div>
    </div>
  </div>







  );
};

export default ImageAddEdit;