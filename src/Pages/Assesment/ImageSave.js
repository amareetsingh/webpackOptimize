import React, { useEffect, useState } from 'react';
import styles from './../Templates/templates.module.css';
import {  useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {Col} from "react-bootstrap";
import { functionService } from '../../Context/functions';


function ImageSave() {

    const[templateList,setTemplateList] = useState([]);
    // const[row,setRow]= useState([]);
    const[loader,setLoader]=useState(false);
    const params = useParams();
    const getData = async()=>{        
      setLoader(true);
  let res = await functionService.post('/Images/getUploadedImages',{"lUserId": 0});
     
  if(res.status === true){
       
          if (res.data.data.statusCode === 200) {
          let response = res.data.data.result
          setTemplateList(response);
        
      }
      }else{
        
      }
     
      setLoader(false);
  }
      useEffect(() => {
        getData();
  },[params]);
    //console.log("templateList",templateList)
  
  return (
    <div>
	{templateList && templateList.map((obj,index)=>(
							<Col sm={4} className={styles.blacktemplete} key={index}>
					        <div className={styles.templete_design}>
								<div className={styles.imageBox}>
					    	  <img src={functionService.awsBucketImage(obj) !== false ? functionService.awsBucketImage(obj ) :console.log('')} alt="logo" />
							  </div>		
							 </div>
						</Col>
						))}
    </div>
  )
}

export default ImageSave;
