import { API_PATH } from '../Components/API';
export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	return fetch(`${API_PATH}User/loginUser`, requestOptions)
	.then(response => response.json())
	.then(result => {

	    if (result.statusCode === 200) {
			// console.log("login api result",JSON.parse(result.result));
			//let reducerState = dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(result.result) });
			dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(result.result) })
			//console.log("Initial state after login", reducerState);
			localStorage.setItem('currentUser', result.result);
			//console.log("After login user:", result);
			return result.result;
		}else{
			//localStorage.setItem('currentUser', '');// manish
			dispatch({ type: 'LOGIN_ERROR', error: result.message });
			return false;
		}
	})
	.catch(error => {
		//localStorage.setItem('currentUser', ''); // manish
		dispatch({ type: 'LOGIN_ERROR', error: 'sorry somthing went wrong. Please try again.' });
      return false;
	});

	// try {
	// 	dispatch({ type: 'REQUEST_LOGIN' });
	// 	let response = await fetch(`${API_PATH}auth/login`, requestOptions);
	// 	let result = await response.json();
	// 	let data = result.data;
	// 	//let data = {"user":"dev","auth_token":'1'};
	// 	if (data.user) {
	// 		dispatch({ type: 'LOGIN_SUCCESS', payload: data });
	// 		localStorage.setItem('currentUser', JSON.stringify(data));
	// 		return data;
	// 	}

	// 	dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
	// 	console.log(data.errors[0]);
	// 	return;
	// } catch (error) {
	// 	dispatch({ type: 'LOGIN_ERROR', error: error });
	// 	console.log(error);
	// }
}

export async function logout(dispatch) {
	localStorage.removeItem('currentUser');
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('token');
	localStorage.clear();
}
