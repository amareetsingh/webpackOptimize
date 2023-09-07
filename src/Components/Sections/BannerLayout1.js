import React from 'react'
//import styles from '../../Pages/Assesment/assesment.module.css';
import styles from "../../Pages/Front/evalinator.module.css";
import Container from 'react-bootstrap/Container';
import DOMPurify from "dompurify";
import { checkOptionSetting, getColor2, functionService } from '../../Context/functions';
import topbannerimage from '../../assets/images/pexelsback.jpg';
import Image from 'react-bootstrap/Image'

// import pexelsback from '../../assets/images/pexelsback.jpg'

const BannerLayout1 = ({name, desc, imageURL, colors, options, customizations, handleClick}) => {
    
  return (
    // <div className={styles.layout} style={{ background: getColor2(colors,1) }}>
    //       <h2 style={{ textAlign: 'center' }} >
    //         {checkOptionSetting(140, 1, options) && (
    //           <div
    //             className={
    //               checkOptionSetting(170, 1, options)
    //                 ? styles.leftHeadingtopbannertitle
    //                 : styles.leftHeadingtopbannertitles
    //             }
    //             style={{ color: getColor2(colors, 3)}}
    //             dangerouslySetInnerHTML={{
    //               __html:name,
    //             }}
    //           ></div>
    //         )}

    //       </h2>
          
    //       <div >
    //             <img
    //               src={imageURL ? imageURL : pexelsback
    //               }
    //               className={styles.heroimg1}
    //               alt={name}
    //             />
    //       </div>
    //       <div>

    //         <p className={styles.para}>
    //           <div
    //             dangerouslySetInnerHTML={{
    //               __html: desc,
    //             }}
    //           ></div>
    //         </p>

    //         <button

    //           className={styles.button}
    //           style={{
    //             background: getColor2(colors, 2),
    //             color: getColor2(colors, 5),
    //           }}
    //         >
    //           {functionService.getCustomizeText2(customizations, 1)}
    //         </button>
    //       </div>
    //     </div>

    <div className={styles.LayoutPage} style={{ background: getColor2(colors, 1) }}>
    <h2 className={styles.descriptionLayout} >
      {checkOptionSetting(140, 1, options) && (
        <div
          className={
            checkOptionSetting(170, 1, options)
              ? styles.leftHeadingtopbannertitle
              : styles.leftHeadingtopbannertitles
          }
          style={{ color: getColor2(colors, 3) }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(name)
          }}
        ></div>
      )}

    </h2>
    <Container>
      <Image thumbnail className={styles.heroimg} width="100%" src={imageURL ? imageURL : topbannerimage} alt={name} />
    </Container>

    <Container>
      <div style={{ marginTop: '20px' }}>
        <p className={styles.para}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(desc)
            }}
          ></div>
        </p>

        <button
          onClick={handleClick}
          className={styles.button}
          style={{ background: getColor2(colors, 2), color: getColor2(colors, 5) }}
        >
          {functionService.getCustomizeText2(customizations, 1)}
        </button>
      </div>
    </Container>
  </div>


  )
}

export default BannerLayout1