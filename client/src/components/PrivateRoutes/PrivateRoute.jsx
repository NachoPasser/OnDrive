import { Redirect } from "react-router-dom";
import { useAuthorized } from "../../hooks/useAuthorized";
import { useBan } from "../../hooks/useBan";

const PrivateRoute = ({ allowed, children, redirect }) => {
  const { globalBan, verifying } = useBan();
  const { authorized, loading } = useAuthorized({ allowed });
  //false
  if (verifying) return null;
  if (globalBan) return <Redirect to="/" />;

  if (loading)
    return (
      <h1 style={{ backgroundColor: "red", color: "white" }}>
       ESTO SERIA EL LOADER
      </h1>// ESTE H1 deberia ser un LOADER(SPINNER DE CARGA)
    );

  return (
    <div>{authorized ? children : <Redirect to={redirect}></Redirect>}</div>
  );
};

export default PrivateRoute;
