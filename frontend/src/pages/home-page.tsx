import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../redux/api/user-api-slice";
import { signout } from "../redux/features/auth/auth-feature-slice";
import { useNavigateURL } from "../hooks/auth-hook";

const HomePage = () => {
  useNavigateURL("protected");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signoutApiCall] = useSignoutMutation();

  const logoutHandler = async () => {
    try {
      await signoutApiCall({}).unwrap();
      dispatch(signout());
      navigate("/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={logoutHandler} className="cursor-pointer">
        log out
      </div>
    </div>
  );
};

export default HomePage;
