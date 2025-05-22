import { useNavigate } from "react-router-dom";
import Button from "./button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNotFound = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col gap-2 rounded-xl bg-white px-4 py-2 text-black">
        <p>No quiz data found.</p>
        <Button onClick={handleNotFound} className="bg-gradient-primary">
          Back!
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
