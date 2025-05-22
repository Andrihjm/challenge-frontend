import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import UserName from "../ui/user-name";

const Header = () => {
  const user = useSelector((state: RootState) => state?.auth?.userInfo);

  const userName = user.data.name;
  const firstName = userName.split(" ")[0];

  return (
    <header className="pt-4">
      <div className="flex items-center gap-1">
        Hello,
        <UserName name={firstName} />
      </div>

      <h1 className="text-2xl font-bold">Let's test your knowledge</h1>
    </header>
  );
};

export default Header;
