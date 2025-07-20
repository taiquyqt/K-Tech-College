import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth-store"
import { useEffect } from "react";

const Customer = () => {
    const navigate = useNavigate();
    const {loggedInUser} = useAuthStore();
    
    useEffect(() => {
      if (!loggedInUser) {
        navigate('/login');
      }
      if (loggedInUser && !loggedInUser.roles.some(role => role.name === 'Managers')) {
        navigate('/access-denied');
      }
    }, [loggedInUser, navigate])
    

    console.log('Logged in user:', loggedInUser);
  return (
    <div>Customer</div>
  )
}

export default Customer