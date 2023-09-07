import React from 'react';
import styles from './assesment.module.css';
import AvatarIcon from '../../assets/images/user_profile.png';
import { functionService ,getColor} from '../../Context/functions';
import { Col, Container, Row } from 'react-bootstrap';
function Promotions(props) {
     
    // console.log("data in promotions", props.assessment);
	return (
		<>
		{
            typeof props.data !== "undefined"  && props.data.hasOwnProperty('m_szPromoPhrase') &&
            <div className={props.showRedeem === true ? styles.promotionSectionResults : styles.promotionSection}>
                
            {props.showRedeem === true &&<div><h2>{props.data.m_szPromoPhrase && props.data.m_szPromoPhrase}</h2></div>}
            <Container fluid>
                <Row>
            <Col md={6} className={styles.PromotionsContent}>
            {props.showRedeem === false && 
                <h2>{props.data.m_szPromoPhrase && props.data.m_szPromoPhrase}</h2>
            }
            
            { props.showPre === true && props.data.m_szPromotionDescPre && props.data.m_szPromotionDescPre.trim() !== '' &&  
                <div dangerouslySetInnerHTML={
                    { __html: (props.data.m_szPromotionDescPre)}    
                    }>
                </div>
            }

                { props.showRedeem === true && 
                <div dangerouslySetInnerHTML={{
                    __html: (props.data.m_szPromotionDesc)
                    }}>

                 </div>

                }

                {(props.showRedeem === true && props.data.m_szCallToActionURL !== '')  &&
                <div className={styles.redeemBtn}>
                    <a target="_blank" href={props.data.m_szCallToActionURL} style={{
                  background: props.btnBgColor,
                  color:props.btnTextColor,
                }}>{props.btnText}
                </a>
                </div>
            }
            </Col>
          
           <Col md={6}  className={styles.promotionsImage}>
                 {functionService.awsBucketImage(props.data && props.data.m_oMedia) !== false 
                 && <img 
                    className={styles.promotionImage} 
                    src={functionService.awsBucketImage(props.data && props.data.m_oMedia)  } 
                    alt={props.data.m_szPromoPhrase} />
                }
            </Col>
            
            </Row>
            </Container>
            </div>
        }
			</>
		
	)
}

export default Promotions;
