import React from 'react'
import { useLocation } from 'react-router';
import HomeNavBar from '../components/navBar/HomeNavBar';

function Home() {
  const location = useLocation();
  const userData=location?.state.user
  // console.log(userData)
  return (
		<div>
			<HomeNavBar userDetails={userData} />
			<h1 style={{fontSize:"2rem", margin:"1rem"}}>Welcome {userData?.name}</h1>
		</div>
	);
}

export default Home
