import { LogOut } from "lucide-react";
import Button from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../../redux/api/user-api-slice";
import { signout } from "../../redux/features/auth/auth-feature-slice";

const Navigation = () => {
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
    <nav className="flex w-full items-center justify-between">
      <div className="cursor-pointer">
        <img
          src="/assets/svgs/menu.svg"
          alt="menu-icon"
          className="h-full w-full object-cover"
        />
      </div>

      <Button onClick={logoutHandler}>
        <LogOut size={20} />
      </Button>
    </nav>
  );
};

export default Navigation;
