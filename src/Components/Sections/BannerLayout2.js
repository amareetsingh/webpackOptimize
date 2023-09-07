import React from "react";
import styles from "../../Pages/Front/evalinator.module.css";
import topbannerimage from "../../assets/images/pexelsback.jpg";
import { getColor2, functionService } from "../../Context/functions";
import DOMPurify from "dompurify";
import { Container } from "react-bootstrap";

// import styless from '../../Pages/Front/evalinator.module.css'
//import styles from '../../Pages/Assesment/assesment.module.css';
// import pexelsback from '../../assets/images/pexelsback.jpg'

const BannerLayout2 = ({
  name,
  desc,
  imageURL,
  colors,
  options,
  customizations,
  handleClick,
}) => {
  return (
    <div>
    <div className={styles.hero}>
      <img
        width="100%"
        style={{ height: '100vh' }}
        className={styles.heroimg1}
        src={imageURL ? imageURL : topbannerimage}
        alt={name}
      />
      <div className={styles.herobanner} style={{height: '100vh' }}>
        <div className={styles.Mainsection}>
          <div className={styles.leftsection}>
            <span
              className={styles.leftsectionh}
              style={{color: getColor2(colors, 3) }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(name),
              }}
            ></span>
          </div>
          <p
            className={styles.leftsectp}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(desc),
            }}
          ></p>

          <button
            className={styles.leftsectbutton}
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
    </div>

    //   <div className={styless.hero} >

    //   <img
    //       width="100%"
    //       src={ imageURL ? imageURL : pexelsback }
    //       className={styless.heroimg1}
    //       alt={name}
    //     />

    //   <div className={styless.herobanner}>
    //     <div className={styless.Mainsection}>
    //       <div className={styless.leftsectiona} >

    //         <span
    //           className={styless.leftsectionh1}

    //           style={{ color: getColor2(colors, 3) }}
    //           dangerouslySetInnerHTML={{
    //             __html:name,
    //           }}
    //         ></span>
    //       </div>
    //       <p
    //         className={styless.leftsectp}
    //         dangerouslySetInnerHTML={{
    //           __html:desc,
    //         }}
    //       ></p>

    //       <button
    //         className={styless.leftsectbutton}
    //         style={{
    //           background: getColor2(colors, 2),
    //           color: getColor2(colors, 5),
    //         }}
    //       >
    //         {functionService.getCustomizeText2(customizations, 1)}
    //       </button>
    //     </div>

    //   </div>

    // </div>
  );
};

export default BannerLayout2;
