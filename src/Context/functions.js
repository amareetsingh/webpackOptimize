import axios from "axios";
import { AMAZON_BUCKET, API_PATH } from "../Components/API";
import { defaultOptions } from "./Options";
export const functionService = {
    get,
    post,
    sendTrackingData,
    getCurrentToken,
    convertToSlug,
    setQuestionStorage,
    getQuestionStorage,
    awsBucketImage,
    getCustomizeText,
    getCustomizeText2,
    setAssesmentResult,
    getAssesmentResult,
    getColors,
    convertDate,
    timeSince,
    getOptions,
    setOptions,
    validateError,
    getButtonText,
    checkPromotion
};
  function convertDate(dateTime,formatType = 0){
    let monthName = ["Jan","Feb","March","Apr","May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"];
    let date = new Date(dateTime);
   
    if(formatType === 0){
      return date.getDate()+" "+(monthName[date.getMonth()])+" "+date.getFullYear();
    }else{
      return date.getFullYear()+"-"+(("0" + [date.getMonth()+1]).slice(-2) )+"-"+("0" + date.getDate()).slice(-2);
    }
    
}
function get(path,formdata={}){
    
    
    let axiosRequestOptions = {
        headers: {
        'Content-Type': 'application/json',
        
        }
    };
    let currentUser = localStorage.getItem("currentUser");
    // console.log('currentUser', currentUser)
    
    if(currentUser){
        currentUser = JSON.parse(currentUser);
        axiosRequestOptions['headers']['Authorization'] = 'Bearer '+currentUser.JwtToken;
        formdata['token'] = currentUser.JwtToken;
        formdata['user_id'] = currentUser.user_id;
        axiosRequestOptions['headers']['data'] = JSON.stringify(formdata);
    }
    
   
    return axios.get(`${API_PATH}${path}`,axiosRequestOptions)
    .then(response=> {
       
        return ({status:true,data:response.data});
    })
    .catch(error=> {
       
        return({status:false,error:error});
    });


}

// added new function so we just post and forget.
function sendTrackingData(path, formdata={}){

  //console.log('posting tracking event', formdata);

  var headers= {
    'Content-Type': 'application/json'
  };

  axios.post(`${API_PATH}${path}`,formdata,{headers});

  //console.log('posted tracking event');

}

function post(path,formdata={},additionalToken=''){

    var headers= {
        'Content-Type': 'application/json'        
    };
    
    /*let currentUser = localStorage.getItem("currentUser");
    
    if(currentUser){
        currentUser = JSON.parse(currentUser);
        if(additionalToken === ''){
            headers['Authorization'] = 'Bearer '+currentUser.JwtToken;
        }else if(additionalToken === 'skip'){
          headers['Authorization'] = '';
      }else {
            headers['Authorization'] = 'Bearer '+additionalToken;
        }
        
        //console.log(currentUser.jwtToken)
        //formdata['token'] = currentUser.jwtToken;
        //formdata['user_id'] = currentUser.user_id;
    }// changed by manish to send the respondent token to backend.
    else{

      if(additionalToken === ''){
        headers['Authorization'] = '';
      }
      else{
        //console.log('Submitting user token:',additionalToken)
        headers['Authorization'] = 'Bearer '+additionalToken;
      }

    }
    // end changes by manish
    */
    // New change by Manish
    let token = getCurrentToken();
    if(token != null  && token !== 'null' && token !== ''){
      headers['Authorization'] = 'Bearer '+ token;
    }
    
// console.log("token",token )

    return axios.post(`${API_PATH}${path}`,formdata,{headers})
    .then(response=> {
            //console.log(response)
           if(response.data.statusCode === 200){
            return ({status:true,data:response});
           }else{
            return ({status:false,data:response});
           }
           
    })
    .catch((error)=> {
      //console.log(error.response)
     /* if(error.response.status === 401 && localStorage.getItem('currentUser')){
        alert(path)
        localStorage.removeItem('currentUser');
	      localStorage.removeItem('token');
        window.location = "/login";
        return;
      }*/
         return({status:false,error:error});
    });

}

// added by manish to get token of either logged in user or respondent 
// (e.g. usage: For goal setting after taking an assessment)
function getCurrentToken(){

  //console.log('Going to get active token');
  let currentUser = localStorage.getItem("currentUser");
  let additionalToken = localStorage.getItem("emailToken");
  
  if(currentUser){
      currentUser = JSON.parse(currentUser);
      //console.log('current user active - token', currentUser.JwtToken);
      return currentUser.JwtToken;
  }
  else {
    if(additionalToken === 'skip'){
      additionalToken = '';
    }
    //console.log('current token', additionalToken);  
    return additionalToken;
    }
  

}



function convertToSlug(Text) {
    return Text?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }
  function setQuestionStorage(data){
    localStorage.setItem("questionStorage",JSON.stringify(data));
  }
  function getQuestionStorage(){
    return localStorage.getItem("questionStorage") ?  JSON.parse(localStorage.getItem("questionStorage")) : {};
  }
  function awsBucketImage (mediaObj={}){
      // console.log("mediaObj",mediaObj);
      if(mediaObj !== null && mediaObj.hasOwnProperty('m_lMediaId') && mediaObj.m_szMediaKey !== null && mediaObj.m_szMediaKey.trim() !== '' ){
        return `https://s3.amazonaws.com/${AMAZON_BUCKET}/${mediaObj['m_szMediaKey']}${mediaObj['m_lMediaId']}.${mediaObj['m_szFileExtension'].toLowerCase()}`;
      }else{
          return false;
      }
    
  }

  function checkPromotion(data,type=true){
    
    if(data && data.m_lPromotionId > 0)
      return true;
    else
      return false;
    
    if (data){
      if(type === true){
        let stringdata = data.m_szPromotionDescPre;
        stringdata = stringdata.replace(/<[^>]*>?/gm, '');
        if(stringdata.length > 0){
          return true;
        }
        return false;
      }else{
        let stringdata = data.m_szPromotionDesc;
        stringdata.replace(/<[^>]*>?/gm, '');
        if(stringdata.length > 0){
          return true;
        }
        return false;
      }
    }
    else{
      return false;
    }
  }
  function getCustomizeText(textObj={},key,defaultText=''){
    if(textObj.hasOwnProperty('m_oEvalCustomizations') && textObj['m_oEvalCustomizations'].hasOwnProperty('m_dictEvalCustomizations') && textObj['m_oEvalCustomizations']['m_dictEvalCustomizations'].hasOwnProperty(key)){
        return textObj['m_oEvalCustomizations']['m_dictEvalCustomizations'][key];
    }else{
        return defaultText;
    }
  }

  function getCustomizeText2(customizations=[],key){
    if(customizations && customizations[key]){
        return customizations[key];
    }else{
        return '';
    }
  }

  function setAssesmentResult(data){
    localStorage.setItem("assesmentResult",data);
  }
  function getAssesmentResult(){
    return localStorage.getItem("assesmentResult") ?  JSON.parse(localStorage.getItem("assesmentResult")) : {};
  }
  function getColors(dataObject={},key,type="normal"){
    if(type === "normal"){
        if(dataObject && dataObject.hasOwnProperty("dictColors") && dataObject["dictColors"].hasOwnProperty(key)){
            return dataObject["dictColors"][key];
        }
        return `rgba(71, 62, 143,1)`;
    }else{
        if(dataObject && dataObject.hasOwnProperty("dictColors1") && dataObject["dictColors1"].hasOwnProperty(type) &&  dataObject["dictColors1"][type].hasOwnProperty(key)){
            return dataObject["dictColors1"][type][key];
        }
        return `rgba(71, 62, 143,1)`; 
    }
  }
  function timeSince(date) {
    var seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
   var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function setOptions(data){
    localStorage.setItem("assesmentOptions",JSON.stringify(data));
  }


  function getOptions(){
      return localStorage.getItem("assesmentOptions") ?  JSON.parse(localStorage.getItem("assesmentOptions")) : defaultOptions
  }


/*  
export function checkOption(key,val=0){
      let optionData = getOptions();
      if(optionData.hasOwnProperty(key) && optionData[key] === val){
        return true;
      }
      return false;
  }
  */

 /* export function checkOptionLanding(key,val=1,data=[]){
    let optionStatus = false;
  if(data && data.hasOwnProperty("glistOptions")){
    data.glistOptions.forEach(element=>{
     if(key === element.Key && element.Value === val)
      {
        optionStatus = true;
      }
    })  
  }
  return optionStatus;
}
*/
/*
export function checkOptionLanding2(key, val = 1, data = []) {
  
  // console.log("in checkoptionlanding2", key, val, data);

  if (!Array.isArray(data)) {
    data = Object.values(data);
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if ((element.Key === key || element.key === key) && (element.Value === val || element.value === val)) {
      // console.log("returning true");
      return true;
    }

  }

  // console.log("returning false");
  return false;
}
*/

/*
export function  getOptionValue(key, data = []) {
  
  if (!Array.isArray(data)) {
    data = Object.values(data);
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.Key === key || element.key === key) {
      console.log("matched element:", element);
      // console.log("returning true");
      if(element.Value != undefined)
      {
        console.log("option value:", element.Value );
        return element.Value;
      }else 
      {        
        console.log("option value:", element.value );
        return element.value;
      }

    }

  }

  return 0;
}

*/


/*export function checkOptionLanding1(key,val=1,data=[])
{

  if(data && data[key]===val)
    return true;
    else
    return false;

}*/

export function checkOptionSetting(key,val=1,data=[])
{

  
  if(data && data[key]===val)
  {
    //console.log("key: " + key + " val: " + val + "true");
    return true;
  }
    
    //console.log("key: " + key + " val: " + val + "false");
    return false;

    

}



export function getOptionValue(key,data=[])
{
  if(data)  
    return data[key];
  
    return undefined;
}




function validateError(formData){
    let errors = {};
     Object.keys(formData).forEach(element=>{
        if(formData[element] === ""){
            errors[element]=true;
        }
    })
   
    return errors
}
function getButtonText(data={},keyItem,defaultText=''){
  let btnText = defaultText;
  if(data && data.hasOwnProperty("m_listCustomizations")){
    data.m_listCustomizations.forEach(element=>{
     if(keyItem === element.m_lCustomizationId)
      if(element.m_szCustomizationName === ""){
          btnText  = element.m_szCustomizationDefault;
      }else{
        btnText  = element.m_szCustomizationName;
      }
    })  
  }
  return btnText;
}
export function getColor(data={},keyItem){
  let btnColor = '';
  if(data && data.hasOwnProperty("glistColors")){
    data.glistColors.forEach(element=>{
     if(keyItem === element.Key)
        {
          btnColor = element.Value;
        }
    })  
  }
  return btnColor;
}

// export function getColor1(data={},keyItem){
//   let btnColor = '';
//   if(data && data.m_oColorScheme){
//    Object.values(data.m_oColorScheme.m_dictColors).forEach(element=>{
//      if(keyItem === element.Key)
//         {
//           btnColor = element.Value;
//         }
//     })  
//   }
//   return btnColor;
// }


// export function getColor1(data={},keyItem){
//   let btnColor = '';
//   if(data && data.m_dictColors)
//   {
//    Object.entries(data.m_dictColors).map(([key, value])=>{
//      if(keyItem === key)
//         {
//           btnColor = value;
//         }
//     })  
//   }
//   return btnColor;
// }

export function getColor1(data={},keyItem){
  let btnColor = '';
  if(data && data.m_dictColors)
  {
    btnColor = data.m_dictColors[keyItem];
  }
  return btnColor;
}

export function getColor2(data=[], key)
{
  if(data)  
    return data[key];
  
    return '';
}

export function getPreviewColor(data={},keyItem){
  let btnColor = '';
 
  if(data && data.hasOwnProperty("m_oColorScheme")){
    let result = data.m_oColorScheme.m_dictColors;
    
    Object.keys(result).forEach(element=>{
     
     if(keyItem+"" === element+"")
        {
              btnColor = result[element];
        }
    })  
  }
  
  return btnColor;
}
export function getClientReferenceId() {
  return window.Rewardful && window.Rewardful.referral || ('checkout_'+(new Date).getTime());
}