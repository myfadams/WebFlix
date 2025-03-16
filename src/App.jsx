import { useEffect, useState } from 'react'
import './App.css'
import FirstSection from './sections/index/FirstSection';
import SecondSection from './sections/index/SecondSection';
import { useAuth } from './context/Context';
import { useNavigate } from 'react-router';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { user, checkEmailVerification } = useAuth();
  const [isLoading,setIsLoading]=useState(true);
  const navigate=useNavigate();
  useEffect(() => {
      if (!user) {
        setIsLoading(false);
        return;
      }
       if (user.emailVerified) {
					navigate("/selectProfile");
					return;
				}
      const interval = setInterval(() => {
        if (user && !user?.emailVerified) {
          checkEmailVerification();
        } else {
          console.log("verified");
          navigate("/selectProfile");
           clearInterval(interval);
          return
        }
      }, 3000); // 🔄 Runs every 5 seconds
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, [user, checkEmailVerification]);

    if(isLoading)
      return <LoadingScreen title={"Siging in"} />;

  return (
    <>
    <FirstSection/>
    <SecondSection/>
    </>
  )
}

export default App
