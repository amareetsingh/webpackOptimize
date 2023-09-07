import React from 'react';
import Button from 'react-bootstrap/Button';
import { CONSTANT_CONTACT_CLIENT_ID ,CONSTANT_CONTACT_REDIRECT_URI } from '../Components/API';

const ConstantContactSetup = ({ obj, params, styles, constantImg }) => {
  const obj1 = Object.keys(obj.listProviderSettings).filter((setting) => setting.m_nConfigKeyId === 10);

  const handleButtonClick = () => {
    const confirmed = window.confirm('Are you sure you want to reset the connection?');
    if (confirmed) {
      // Call the function to redirect to the external URL
      // You can replace the following line with your actual function call
      window.open(`https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${CONSTANT_CONTACT_CLIENT_ID}&redirect_uri=${CONSTANT_CONTACT_REDIRECT_URI}&response_type=code&scope=contact_data%20campaign_data%20offline_access&state=${params.id}`);
    }
  };

  return (
    <div className={styles.providerMainDiv}>
      <div className={styles.providersImgDiv}>
        <img width="300px" src={constantImg} alt="constantImg" />
      </div>
      <div className={styles.ConstantDiv}>
        <><p>Constant Contact is set as your provider!</p><br></br></>

        {obj1.m_szKeyValue === '' ? (
          <>
            <p>To configure Constant Contact, click the button below. You will be taken to Constant Contact. Please login and authorize Evalinator to send contact data.</p>
            <Button className="my-button-class" variant="primary" onClick={handleButtonClick}>
              Connect
            </Button>
          </>
        ) : (
          <>
            <p>
              You have previously authorized Constant Contact and NO action is needed.
              However, if your information has changed, then please click "Reset" below.
              You will be taken to Constant Contact. Please login and authorize Evalinator to send contact data.
            </p>
            <Button className="my-button-class" variant="primary" onClick={handleButtonClick}>
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConstantContactSetup;
