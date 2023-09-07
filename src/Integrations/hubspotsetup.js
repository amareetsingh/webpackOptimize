import React from 'react';
import Button from 'react-bootstrap/Button';
import { HUBSPOT_CLIENT_ID ,HUBSPOT_REDIRECT_URI } from '../Components/API';

const HubspotSetup = ({ obj, currentAssessment, params, styles, HubspotImg }) => {
  const obj1 = Object.keys(obj.listProviderSettings).filter((setting) => setting.m_nConfigKeyId === 60);

  const handleButtonClick = () => {
    const confirmed = window.confirm('Are you sure you want to reset the connection?');
    if (confirmed) {
      // Call the function to redirect to the external URL
      // You can replace the following line with your actual function call
      window.open(`https://app.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CLIENT_ID}&redirect_uri=${HUBSPOT_REDIRECT_URI}&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.lists.read%20crm.lists.write%20crm.schemas.contacts.write%20crm.schemas.contacts.read&state=${params.id}`);
    }
  };

  return (
    <div className={styles.providerMainDiv}>
      <div className={styles.providersImgDiv}>
        <img width="300px" src={HubspotImg} alt="Hubspot Logo" />
      </div>
      <div className={styles.ConstantDiv}>
        {/* <><p>HubSpot is set as your provider!</p><br></br></> */}

        {obj && obj.m_bIsConnected === false ? (
          <>
            <p>To configure HubSpot, click the button below. You will be taken to HubSpot. Please login and authorize Evalinator to send contact data.</p><br></br>
            {currentAssessment &&
              <>
              <p><b>Important</b>: Custom fields will be created for this assessment with this identifier appended: <b>{currentAssessment.m_szSurveyDisplayIdentifier}</b>.</p> 
        
              <br></br>
                1. evalinator_name_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                2. evalinator_score_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                3. evalinator_band_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                4. evalinator_date_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
        
              <br></br><p>These fields will contain the latest Evalinator quiz or assessment the contact has responsed to, their score and their assigned scoring band. <br></br><br></br>This will allow you to run automations in HubSpot based on this information. <br></br><br></br>e.g. send a custom email as soon as the quiz or assessment is complete, or add them to a specific nurturing flow based on their score. </p>
            </>
            }
            <Button className="my-button-class" variant="primary" onClick={handleButtonClick}>
              Connect HubSpot
            </Button>
          </>
        ) : (
          <>
            <br></br><p>
              You have previously authorized HubSpot. NO action is needed.
            </p><br></br>

            {currentAssessment &&
              <>
              <p><b>Important</b>: Please verify that below custom fields have been created in Hubspot for this assessment with this identifier appended: <b>{currentAssessment.m_szSurveyDisplayIdentifier}</b>.</p> 
              <br></br>
                1. evalinator_name_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                2. evalinator_score_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                3. evalinator_band_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>
                4. evalinator_date_{currentAssessment.m_szSurveyDisplayIdentifier}<br></br>

              <br></br>
              <p>
                These fields will contain the latest Evalinator quiz or assessment the contact has responsed to, their score and their assigned scoring band. 
              <br></br><br></br>This will allow you to run automations in HubSpot based on this information. 
              <br></br><br></br>e.g. send a custom email as soon as the quiz or assessment is complete, or add them to a specific nurturing flow based on their score. 
              </p>
            </>
            }

            <p><br></br>
            However, if your information has changed, then please click "Reset" below. You will be taken to HubSpot. Please login and authorize Evalinator to reset the connection and enable sending of respondent information.
            </p>
            <Button className="my-button-class" variant="primary" onClick={handleButtonClick}>
              Reset Connection
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HubspotSetup;
