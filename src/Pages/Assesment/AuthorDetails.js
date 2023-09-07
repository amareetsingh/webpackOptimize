import React from 'react';
import styles from './assesment.module.css';
import evalassessementIcon from '../../assets/images/Evalinator-assessment.svg';
import { checkOptionSetting, getColor2 } from '../../Context/functions';
// import { AMAZON_BUCKET } from '../../Components/API';
function AuthorDetails({fname, lname, profileDesc, profileURL, imageURL, colors, options}) {
	return (
        <div className={`${styles.slideRight} ${ checkOptionSetting(35,1, options) ? styles.backgroundNone: ''}`}>
        <span>
            
                <div className={`${styles.rightsideassesmentimage} ${ checkOptionSetting(35,1, options) ? styles.backgroundNone: ''}`} >
                                {/* { (author && author.m_oMedia.m_szMediaKey) ?
                                        <img src={`https://s3.amazonaws.com/${AMAZON_BUCKET}/${author.m_oMedia.m_szMediaKey}${author.m_oMedia.m_lMediaId}.${author.m_oMedia.m_szFileExtension.toLowerCase()}`} alt="edit_image"/> */}
                                {imageURL ?
                                <img src={imageURL} alt={fname + lname} />
                                : 
                                <img src={evalassessementIcon} alt={fname + lname}/>
                                }
                </div>
                {checkOptionSetting(35,0, options) && 
                        <h3 className={styles.headingrightbox} > {<>{fname}  {lname} </>} </h3>
                }
        </span>
        {checkOptionSetting(35,0, options) && 
           <> <p> {profileDesc} </p>
            <a rel="noopener noreferrer" target="_blank" href={`${(profileURL) ? profileURL:""}`} className={styles.KnowMore} 
            style={{
                background: getColor2(colors, 2),
                color: getColor2(colors, 5),
              }}
            >Know More</a>
            </> }
            </div>
	);
}

export default AuthorDetails;
