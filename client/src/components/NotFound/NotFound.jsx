import s from "./NotFound.module.css";
import car from "../../assets/NotFound/car-error.png";
import signal from "../../assets/NotFound/error-404.png";
import logo from "../../assets/NavBar/logo-ondrive.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={s.notFoundBackground}>
      <div className={s.NotFoundContainer}>
        <img src={signal} alt="404 NOT FOUND" className={s.errorSign} />

        <Link to="/">
          <img src={car} alt="Auto OnDrive" className={s.carImg} />
        </Link>

        <h2>Parece que te perdiste</h2>
        <h4>
          Viaja de regreso con
          <Link to="/">
            <img src={logo} alt="OnDrive" className={s.logo} />
          </Link>
        </h4>
      </div>
    </div>
  );
}
