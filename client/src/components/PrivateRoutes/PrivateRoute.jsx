import { Redirect } from "react-router-dom";
import { useAuthorized } from "../../hooks/useAuthorized";
import { useBan } from "../../hooks/useBan";

const PrivateRoute = ({ allowed, children, redirect }) => {
  const { globalBan, verifying, error } = useBan();
  const { authorized, loading } = useAuthorized({ allowed });

  if (error)
    return <h1 style={{ backgroundColor: "red", color: "white" }}>Error</h1>;

  if (verifying)
    return <h1 style={{ backgroundColor: "red", color: "white" }}>ESTE SERIA EL LOADER</h1>;

  if (globalBan) return <Redirect to="/" />;

  if (loading)
    return (
      <h1 style={{ backgroundColor: "red", color: "white" }}>
        ESTO SERIA EL LOADER
      </h1> // ESTE H1 deberia ser un LOADER(SPINNER DE CARGA)
    );

  return (
    <div>{authorized ? children : <Redirect to={redirect}></Redirect>}</div>
  );
};

export default PrivateRoute;
