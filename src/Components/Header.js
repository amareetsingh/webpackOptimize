import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../Pages/Login/login.module.css';

import stylesDash from '../Pages/Dashboard/dashboard.module.css';
import Evalinator from '../assets/images/Evalinator_logo.png';
import { logout, useAuthDispatch, useAuthState } from '../Context';
import { Dropdown, Container } from "react-bootstrap";
import user_profile from '../assets/images/user_profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import { functionService } from '../Context/functions';
function Header({ loader = false,reloader=0 }) {
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
	const[user,setUser]=useState(userDetails);
	const [toggle, setToggle] = useState(false)
	const history = useHistory();
	const handleLogout = () => {
		logout(dispatch);
		history.push('/login');
	};
	const handleProfile = () => {
		history.push('/profile');
	};
	const handleMobileMenu = () =>{
		setToggle(!toggle)
	}
   
 
	 useEffect(() => {
		if(localStorage.getItem('currentUser'))
			setUser(JSON.parse(localStorage.getItem('currentUser')));
	  }, [reloader]);
	
	return (
		<>
			<Loader loader={loader} />
			<div className={styles.headermain}>
				<Container>
			{userDetails.token === "" ?
			
				<header className={styles.headerpart}>
					<Link to="/"><img src={Evalinator} alt="logo" /> </Link>
					<ul>						
						<li><a href="https://www.evalinator.com/">Home</a></li>
						{/*<li><Link to="/">Solutions </Link></li>
			<li><Link to="/">Resources</Link></li>*/}
						<li><Link to="/pricing">Pricing </Link></li>
						
						<li ><Link to="/">Login</Link></li>
						<li className={styles.menu_startbtn}><Link to="/pricing">Start Free Trial</Link></li>
					</ul>					
					<button className={styles.menu_toggle} onClick={handleMobileMenu}><FontAwesomeIcon icon={faBars}/></button>
					{toggle &&
					<div className={styles.mobile_menu}>
						<ol>
							<li><a href="https://www.evalinator.com/">Home</a></li>
							<li><Link to="/pricing">Pricing </Link></li>
							<li><Link to="/">Resources</Link></li>
							<li ><Link to="/">Login</Link></li>
							<li className={styles.menu_startbtn}><Link to="/pricing">Start Free Trial</Link></li>
						</ol>
					</div>
					}
				</header>
			
				:
			
				<header className={stylesDash.dashboard_header}>
					<div className={stylesDash.container}>
					<Link to="/"><img src={Evalinator} alt="logo" /> </Link>
						<div className={stylesDash.profile_right}>
							<Dropdown>
								<Dropdown.Toggle className={stylesDash.user_btn} id="dropdown-basic">
								<img src={functionService.awsBucketImage(user && user.oUser  && user.oUser.m_oMedia) !== false ? functionService.awsBucketImage(user && user.oUser  && user.oUser.m_oMedia) : user_profile} alt="profile pic" />
									<p>{(user && user.FirstName)}</p>
								</Dropdown.Toggle>

								<Dropdown.Menu className={stylesDash.logout}>
									<button className={stylesDash.logoutBtn} onClick={handleProfile}><FontAwesomeIcon icon={faUser}/>Profile</button>
									<button className={stylesDash.logoutBtn} onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>
										Logout
									</button>
								</Dropdown.Menu>                              
							</Dropdown>

						</div>

					</div>
				</header>			
			}
			</Container>
			</div>
		</>
	);
}

export default Header;
