import { useNavigateURL } from "../hooks/auth-hook";
import Navigation from "../components/shared/navigation";
import Header from "../components/shared/header";
import ListSoal from "../components/shared/list-soal";

const HomePage = () => {
  useNavigateURL("protected");

  return (
    <>
      <div className="p-4">
        <Navigation />
        <Header />
      </div>

      <div className="">
        <ListSoal />
      </div>
    </>
  );
};

export default HomePage;
