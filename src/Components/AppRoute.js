import React, { useEffect } from 'react';
import { Redirect, Route,useLocation } from 'react-router-dom';
import { useAuthState } from '../Context';
// import { Helmet } from 'react-helmet';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
	const userDetails = useAuthState();
	const location = useLocation();
	useEffect(()=>{
		if(isPrivate){
			if(document.body.classList.contains("hiddenchat")){
				document.body.classList.remove("hiddenchat");
			}
		}else{
			if(!document.body.classList.contains("hiddenchat")){
				document.body.classList.add("hiddenchat");
			}
		}
		
	},[location.pathname,isPrivate])
	
	return (
		<Route
			exact
			path={path}
			render={(props) => (
				<>	
				{/* <Helmet>
					<title>Evalinator - Personalized Client Engagement</title>
					<meta name="Evalinator" content="Personalized Engagement" />
					<meta property="og:title" content="Evalinator - Personalized Client Engagement" />
					<meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
				</Helmet> */}
				{isPrivate && !Boolean(userDetails.token) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					(Boolean(userDetails.token) && (location.pathname === "/login" || location.pathname === "/")) ?
					(
						<Redirect to={{ pathname: '/dashboard' }} />
					):
					(<Component {...props} />)
				)}
				</>
			)}
			{...rest}
		/>
	);
};

export default AppRoutes;
