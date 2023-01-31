import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    // dispatch logout action
    dispatch(logout());
  };

  return { logOut };
};
