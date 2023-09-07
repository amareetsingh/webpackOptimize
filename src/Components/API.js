
/*Dev envoironment*/

let API_PATH_LOCAL="https://evalinatordevapi.azurewebsites.net/api/";
//let API_PATH_LOCAL="https://localhost:44346/api/";
let STRIPE_KEY_LOCAL = "pk_test_UKxlIF3ODSa7SLSVbwHiwEa2";
let AMAZON_BUCKET_LOCAL = "qa.evalinator.com";
let CONFIG_CONSTANT_CONTACT_CLIENT_ID = "b2f2f713-53dc-4b9f-bb1c-919918b5cebc";
let CONFIG_CONSTANT_CONTACT_REDIRECT_URI = "http://localhost:59835/constantcontact";
let CONFIG_HUBSPOT_CLIENT_ID = "181a3594-0610-4373-ab2e-2fd199fe04b2";
//let CONFIG_HUBSPOT_REDIRECT_URI = "http://localhost:59835/hubspot";
let CONFIG_HUBSPOT_REDIRECT_URI = "https://evalinatorv2dev.azurewebsites.net/hubspot";
let CONFIG_GOOGLE_RECAPTCHAV3_SITE_KEY = "6Lf2f1QkAAAAAAIaD8FJl7MjKpJ2Q3HWAIeBYJ6o";
let CONFIG_GOOGLE_ANALYTICS_TAG = "";
let CONFIG_GOOGLE_TAG_MANAGER = "";


/*QA envoironment*/
/*
let API_PATH_LOCAL ="https://evalinator-qa-api.azurewebsites.net/api/";
let STRIPE_KEY_LOCAL = "pk_live_wELKOD9kffNtzBGKpFSmyWWa";
let AMAZON_BUCKET_LOCAL = "media.evalinator.com";
let CONFIG_CONSTANT_CONTACT_CLIENT_ID = "2c1f4f1d-f66b-49d5-bc7a-71a910e32c19";
let CONFIG_CONSTANT_CONTACT_REDIRECT_URI = "https://evalinatorv2qa.azurewebsites.net/constantcontact";
let CONFIG_GOOGLE_RECAPTCHAV3_SITE_KEY = "6LcKhFQkAAAAAEb6VKT3dxu-1vI3xmnfwwETd4-x";
let CONFIG_HUBSPOT_CLIENT_ID = "7d047374-7d2a-437f-a938-b727c8042e9d";
let CONFIG_HUBSPOT_REDIRECT_URI = "https://evalinatorv2qa.azurewebsites.net/hubspot";
let CONFIG_GOOGLE_ANALYTICS_TAG = "";
let CONFIG_GOOGLE_TAG_MANAGER = "";
*/

/*prod envoironment*/
/*
let API_PATH_LOCAL ="https://evalinator-prod-api.azurewebsites.net/api/";
let STRIPE_KEY_LOCAL = "pk_live_wELKOD9kffNtzBGKpFSmyWWa";
let AMAZON_BUCKET_LOCAL = "media.evalinator.com";
let CONFIG_CONSTANT_CONTACT_CLIENT_ID = "2c1f4f1d-f66b-49d5-bc7a-71a910e32c19";
let CONFIG_CONSTANT_CONTACT_REDIRECT_URI = "https://app.evalinator.com/constantcontact";
let CONFIG_HUBSPOT_APP_ID = "229973";
let CONFIG_HUBSPOT_CLIENT_ID = "7d047374-7d2a-437f-a938-b727c8042e9d";
let CONFIG_HUBSPOT_REDIRECT_URI = "https://app.evalinator.com/hubspot";
let CONFIG_GOOGLE_RECAPTCHAV3_SITE_KEY = "6LcKhFQkAAAAAEb6VKT3dxu-1vI3xmnfwwETd4-x";
let CONFIG_GOOGLE_ANALYTICS_TAG = "G-F2TBJDS3XT";
let CONFIG_GOOGLE_TAG_MANAGER = "GTM-WDJ2TS5";
*/

// exports
export const API_PATH=API_PATH_LOCAL;
export const STRIPE_KEY = STRIPE_KEY_LOCAL;
export const AMAZON_BUCKET = AMAZON_BUCKET_LOCAL;
export const STARTER_PRODUCT_ID = "STARTER";//"prod_BjiHlg9lbGRdk8";
export const ESSENTIALS_PRODUCT_ID = "ESSENTIALS";//"prod_IlqWdHCbXu7j7Q";
export const ADVANCED_PRODUCT_ID = "ADVANCED";
export const CONSTANT_CONTACT_CLIENT_ID = CONFIG_CONSTANT_CONTACT_CLIENT_ID;
export const CONSTANT_CONTACT_REDIRECT_URI = CONFIG_CONSTANT_CONTACT_REDIRECT_URI;
export const HUBSPOT_CLIENT_ID = CONFIG_HUBSPOT_CLIENT_ID;
export const HUBSPOT_REDIRECT_URI = CONFIG_HUBSPOT_REDIRECT_URI;
export const GOOGLE_RECAPTCHAV3_SITE_KEY = CONFIG_GOOGLE_RECAPTCHAV3_SITE_KEY;
export const GOOGLE_ANALYTICS_TAG = CONFIG_GOOGLE_ANALYTICS_TAG;
export const GOOGLE_TAG_MANAGER = CONFIG_GOOGLE_TAG_MANAGER ;
//export const API_PATH="http://192.168.1.250:5000/api/";
