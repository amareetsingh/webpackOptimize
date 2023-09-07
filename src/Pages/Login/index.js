import React, { useState, useEffect } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { functionService } from '../../Context/functions';
import Toaster from '../../Components/Toaster';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Key from '../../assets/images/lock.png';

function Login(props) {
	const { pathname } = useLocation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const[resetPassword,setResetPassword]=useState(false);
	const[otpSent]=useState(false);
	const dispatch = useAuthDispatch();
	const [showtoast1, setShowToast1] = useState(false);
	//const { loading, errorMessage } = useAuthState();
	const [errors] = useState({id:0, status:false});
	const [message, setMessage] = useState('Wrong Credentials');
	const { loading } = useAuthState();
	const[loader,setLoader]=useState(false);
	const [showtoast, setShowToast] = useState(false);
	const toggleShowToast = () => setShowToast(!showtoast);
	const toggleShowToast1 = () => setShowToast1(!showtoast1);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	// let data = functionService.validateError(email);
		

	const handleLogin = async (e) => {
		e.preventDefault();

		try {			
			setLoader(true);			
			let response = await loginUser(dispatch, { email, password });
			// console.log("login", response);
			var userObject = JSON.parse(response);		
			// console.log("userObjecr", userObject);	
			if(response!== false && response.status !== false){				
					setLoader(false);	
					if(userObject.oUser.m_oUserAccount.m_nAccountStatus != 1){
						props.history.push('/profile');
					}
					else {
						props.history.push('/login-redirect');
					}	
					//window.location = '/login-redirect';				
				}				
				else{
				setLoader(false);
				setMessage("Invalid UserName and Password")
				setShowToast1(true)
			}		
			
		} catch (error) {
			setLoader(false);
		}
	};
 const hanldeSubmitForgot = async ()=>{
	 setLoader(true);
	 let res = await functionService.post('User/forgot',{"szEmail":email});	 
	 if(res !== false && res.status !== false){		
		if(res.data.data.statusCode === 200){
			setShowToast(true);
		}else{				
			setShowToast1(true)
		}
		
	 }else{
		setMessage(res.data.data.result)
		setShowToast1(true)		
	 }
	 setLoader(false);
 }
	return (
		<>
		<Header loader={loader}/>
		<div className={styles.container}>			
			<div>
			   <div className={styles.logo_header}>
				
				 <h1>Interactive assessments for experts</h1>
						<p>Sell and engage as an expert should. Generate more leads and upgrade every customer touchpoint into a conversation.</p>
				 </div>
					
					<div className={styles.loginPage}>
						<form>
						{resetPassword === false ? 
						<div className={styles.login_fied}>
						
							<div className={styles.loginForm}>
								<div className={styles.loginFormItem}>
									<label htmlFor='email'>Username</label>
									<input
										type='text'
										id='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										disabled={loading}
									/>
									<FontAwesomeIcon icon={faUser} />
									{errors && errors.id === 1 && <p className="error errcont">Please fill required field!</p>}

								</div>
								<div className={styles.loginFormItem}>
									<label htmlFor='password'>Password</label>
									<input
										type='password'
										id='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										disabled={loading}
									/>
									<img src={Key} alt='password-icon'/>
									{errors && errors.id === 2 && <p className="error errcont">Please fill required field!</p>}
								</div>
							</div>
							<button onClick={handleLogin} disabled={loading}>
								login
							</button>
							
							{/* {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null} */}
							<div className={styles.create_account_link}>
							<Link to="/" onClick={(e)=>{e.preventDefault();setResetPassword(true);}} className={styles.forget_password}>Forgot your password?</Link>
							<Link to="/pricing" className={styles.create_account}>Create your account</Link>
							</div>
							 </div>	

								:
							 <div className={styles.forgetPassword}>
						
							<div className={styles.loginForm}>
								<div className={styles.loginFormItem}>
									<label htmlFor='email'>Email Address</label>
									<input
										type='text'
										onChange={(e) => setEmail(e.target.value)}
										disabled={loading}
									/>
									<FontAwesomeIcon icon={faUser} />									
									{errors && errors.id === 1 && <p className="error errcont">Please fill required field!</p>}									
								</div>
								{otpSent === true &&
								<div className={styles.loginFormItem}>
									<label >One Time Password</label>
									<Link to="/" className={styles.resendotp}>Resend</Link>
									<input
										type='text'
										onChange={(e) => setPassword(e.target.value)}
										disabled={loading}
									/>
									<img src={Key} alt='password-icon'/>
								</div>
								}
							</div>
							<button disabled={loading} onClick={()=>{hanldeSubmitForgot()}} type="button">
								{otpSent === true ? 'Verify OTP' : 'Submit'}
							</button>
								<Link to="/" onClick={(e)=>{e.preventDefault();setResetPassword(false);}} className={styles.forget_password}>Back to Login</Link>
								
							 </div>	
							}
						</form>
					</div>
			</div>
			<Toaster showtoast={showtoast} toggleShowToast={toggleShowToast} bgclass="success" status="Success" message="Email sent Successfully!!" toasticon={faCheckCircle} />
			<Toaster showtoast={showtoast1} toggleShowToast={toggleShowToast1} bgclass="danger" status="Error" message={message} toasticon={faBan} />
         
		</div>
		<Footer/>
		</>
	);
}

export default Login;
