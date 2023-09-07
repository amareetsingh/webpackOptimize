import React from 'react';
import styles from './evalinator.module.css';
import topbannerimage from '../../assets/images/pexelsback.jpg';
import { checkOptionSetting, getColor2 } from '../../Context/functions';
function Mainbanner({options, imageURL, name, colors, authorFName, authorLName, authorImage, authorProfileDesc, authorURL}) {
//console.log("row",row)
	return (

                <>
                    <div style={(checkOptionSetting(170, 1, options) && imageURL !== '')  ? {} : {background:getColor2(colors,1)}} className={checkOptionSetting(170, 1, options) ? styles.fullImageBanner : styles.mainbannertop}>
                        <div className={`${styles.imagebanner} ${checkOptionSetting(170, 1, options) ? styles.frontshortBanner : styles.fronttallBanner}`}>
                            {(checkOptionSetting(170, 1, options) && imageURL !== '') ?
                            <img src={(imageURL !== '') ? imageURL  :topbannerimage } alt="Banner " />
                        :
                        <div className={styles.noImageBanner}></div>    
                        }                            
                        </div>
                        <div className= {checkOptionSetting(30, 1, options) ? styles.bannerauthorbox : styles.bannerauthorboxnew}>
                        
                        
                        <div className={`${checkOptionSetting(30, 1, options) ? styles.contantbannerWithAuthr : styles.contantbanner}`}>
                            <div className={styles.nosmallBanner} >
                            {(imageURL !== '') && 
                            <img src={(imageURL !== '') ? imageURL  :topbannerimage } alt="Banner " />
                            }
                            </div>
                            {checkOptionSetting(140, 1, options) &&
                            <h3 style={{color:getColor2(colors,3)}} dangerouslySetInnerHTML={{
                                __html: (name)
                                }}></h3>
                            }
                        </div>
                       
                        {checkOptionSetting(30, 1, options) &&
                                        <div className={`${styles.bannerAuthor} ${ checkOptionSetting(35,1, options) ? styles.backgroundNone: ''}`}>
                                        <div className={styles.inneruserdetails}>
                                            <div className={styles.userdetailsection} style={checkOptionSetting(170, 2, options) ? {background:getColor2(colors,8)}:{}}> 
                                                <div className={`${styles.mainuserdetaillist} ${ checkOptionSetting(35,1, options) ? styles.backgroundNone: ''}` }>
                                                    <div className={styles.imageboxuserlist}>
                                                        <img src={ authorImage } className={styles.minilogofooterimage} alt="Author" />
                                                    </div>
                                                    {checkOptionSetting(35,0, options) && 
                                                    <><h1>{ authorFName } { authorLName }</h1>
                                                    <p>{ authorProfileDesc } </p>
                                                    <a style={{ background: getColor2(colors,2),color:getColor2(colors,5) }}  rel="noopener noreferrer" href={authorURL} target={"_blank"}  className={styles.KnowMorenew} >Know More</a>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>        
                                        }
                        </div>
                    </div>
                </>
	);
}

export default Mainbanner;
