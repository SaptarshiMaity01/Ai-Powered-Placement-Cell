import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { getCurrentUser } from "../../services/authService";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("User from useAuth:", data); // 👈 optional debug
        dispatch(setUser(data));
      } catch (err) {
        console.error("Auto-login failed", err);
        localStorage.removeItem("token");
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found, fetching user..."); // 👈 add this
      fetchUser();
    } else {
      console.log("No token found.");
    }
  }, [dispatch]);
};

export default useAuth;
