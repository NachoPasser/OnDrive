import { Redirect } from "react-router-dom";
import { useAuthorized } from "../../hooks/useAuthorized";
import { useBan } from "../../hooks/useBan";
import Loader from "../Sections/Loader/Loader";
import Error from "../Sections/Error/Error";

const PrivateRoute = ({ allowed, children, redirect }) => {
  const { globalBan, verifying, error } = useBan();
  const { authorized, loading } = useAuthorized({ allowed });

  if (error) return <Error />;

  if (verifying) return <Loader />;

  if (globalBan) return <Redirect to="/" />;

  if (loading) return <Loader />;

  return (
    <div>{authorized ? children : <Redirect to={redirect}></Redirect>}</div>
  );
};

export default PrivateRoute;
