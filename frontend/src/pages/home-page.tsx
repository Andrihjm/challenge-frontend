import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to={"/auth/sign-in"}>click</Link>
    </div>
  );
};

export default HomePage;
