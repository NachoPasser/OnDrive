import { Redirect } from "react-router-dom";
import { useAuthorized } from "../../hooks/useAuthorized";

const PrivateRoute = ({ allowed, children, redirect }) => {
  const { authorized, loading } = useAuthorized({ allowed });
  console.log(authorized);
  return (
    <div>
      {loading ? (
        <h1>Verificando</h1>
      ) : authorized ? (
        children
      ) : (
        <Redirect to={redirect}></Redirect>
      )}
    </div>
  );
};

export default PrivateRoute;
