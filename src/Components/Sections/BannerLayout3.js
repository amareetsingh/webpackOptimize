import React from "react";
import { functionService, getColor2 } from "../../Context/functions";
import pexelsback from "../../assets/images/pexelsback.jpg";
import styles from "../../Pages/Front/evalinator.module.css";
const BannerLayout3 = ({
  name,
  desc,
  imageURL,
  colors,
  customizations,
  handleClick,
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{padding: '0px', height: '100vh', background: getColor2(colors, 1) }}
    >
    
      <div className="row mx-3">
        <div className=" col-md-6">
          <img
            width="100%"
            src={imageURL ? imageURL : pexelsback}
            className="rounded "
            alt={name}
          />
        </div>
        <div className=" col-md-6">
          <span
            className={styles.leftsectionh1}
            style={{ color: getColor2(colors, 3) }}
            dangerouslySetInnerHTML={{
              __html: name,
            }}
          ></span>
          <p
            dangerouslySetInnerHTML={{
              __html: desc,
            }}
          ></p>
          <button
            className={styles.leftsectbutton} //"btn mt-3"
            onClick={handleClick}
            style={{
              background: getColor2(colors, 2),
              color: getColor2(colors, 5),
            }}
          >
            {functionService.getCustomizeText2(customizations, 1)}
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default BannerLayout3;
