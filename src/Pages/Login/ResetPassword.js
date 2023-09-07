import React, { useState } from 'react';
import styles from './login.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Key from '../../assets/images/lock.png';
import Toaster from '../../Components/Toaster';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { functionService } from '../../Context/functions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function ResetPassword() {
    const[message,setMessage]=useState('');
    const[loader,setLoader]=useState(false);
    const[disabled,setDisabled]=useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [showtoast1, setShowToast1] = useState(false);
	const toggleShowToast = () => setShowToast(!showtoast);
	const toggleShowToast1 = () => setShowToast1(!showtoast1);
    const searchParam = new URLSearchParams(window.location.search); 
    const[formData,setFormData]=useState({password:'',cpassword:''});
    const history = useHistory();
    const handleSubmit = async()=>{
        
        if(formData.password !== formData.cpassword){setMessage("Password can't match!");toggleShowToast1(true);  return false;}
        if(disabled === true){ return;}
        setDisabled(true);
        setLoader(true);
        const code = searchParam.get('code');
	    const email = searchParam.get('email');
        let res = await functionService.post('User/reset',
        {"szEmail":email,
         "szPassword": formData.password,
         "code": code.replaceAll(" ","+")
        }
        );	 
        if(res !== false && res.status !== false){		
            if(res.data.data.statusCode === 200){
                setMessage("Successfully reset your password!")
                setShowToast(true);
                setFormData({password:'',cpassword:''});
                setTimeout(function(){
                    history.push("/login");
                },1000);
                
            }else{				
                setShowToast1(true);
                setMessage(res.data.data.result)
            }
            
        }else{
            setMessage(res.data.data.result);
            setShowToast1(true)	;	
        }
        setLoader(false);
        setDisabled(false);
    }
	return (
		<>
		<Header loader={loader}/>
        <Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message={message} toasticon={faCheckCircle} />
		<Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />
         
		<div className={styles.container}>			
			<div>
			   <div className={styles.logo_header}>				
				 <h1>Interactive assessments for experts</h1>
						<p>Sell and engage as an expert should. Generate more leads and upgrade every customer touchpoint into a conversation.</p>
				 </div>					
					<div className={styles.loginPage}>
						<form>						
                            <div className={styles.login_fied}>                            
                                <div className={styles.loginForm}>
                                    <div className={styles.loginFormItem}>
                                        <label htmlFor='email'>Password</label>
                                        <input
                                            type='password'
                                            id='email'  
                                            value={formData.password}
                                            onChange={(e)=>setFormData({...formData,password:e.target.value})}                                          
                                        />
                                         <img src={Key} alt='password-icon'/>
                                    </div>
                                    <div className={styles.loginFormItem}>
                                        <label htmlFor='password'>Confirm Password</label>
                                        <input
                                            type='password'
                                            id='password'
                                            value={formData.cpassword}
                                            onChange={(e)=>setFormData({...formData,cpassword:e.target.value})}                                           
                                        />
                                        <img src={Key} alt='password-icon'/>
                                    </div>
                                </div>
                                <button  type="button" onClick={handleSubmit}>
                                    Reset
                                </button>                                                              
                            </div>													
						</form>
					</div>
			</div>
			
		</div>
		<Footer/>
		</>
	);
}

export default ResetPassword;
