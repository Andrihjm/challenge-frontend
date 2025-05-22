import { useNavigate } from "react-router-dom";

const BackPage = () => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div onClick={handleBackPage} className="h-8 w-8 cursor-pointer">
      <img
        src="/assets/svgs/back.svg"
        alt="menu-icon"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default BackPage;
