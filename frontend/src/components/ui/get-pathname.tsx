import { useLocation } from "react-router-dom";

interface GetPathnameProps {
  index: number;
  className?: string;
}

const GetPathname = ({ index, className }: GetPathnameProps) => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[index] || "";

  return <div className={className}>{pathname}</div>;
};

export default GetPathname;
