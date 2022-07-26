import React, { useEffect } from "react";
import s from "./AdminPanel.module.css";
import User from "../Sections/User/User";
import logo from "../../assets/NavBar/logo-ondrive.png";
import logo_admin from "../../assets/NavBar/admin-logo.png";
import { Link, useHistory } from "react-router-dom";
import { getUsersFromDatabase } from "../../redux/actions/getUsersFromDatabase";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function AdminPanel() {
  const history = useHistory();
  const [filterEmail, setFilterEmail] = useState("");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFromDatabase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value === "" || value.replace(/ /g, "").length === 0)
      return setFilterEmail("");

    setFilterEmail(value);
  };

  const handleSession = () => {
    localStorage.removeItem("token");
    history.push("/loginAdmin");
  };

  return (
    <div className={s.admin_panel_page}>
      <div className={s.admin_panel_container}>
        <nav className={s.grid_nav}>
          <Link className={s.home} to="/home-passengers">
            <img src={logo} alt="OnDrive" />
          </Link>
          <button className={s.logout_btn} onClick={handleSession}>
            Cerrar Sesion
          </button>
        </nav>
        <div className={s.grid_title}>
          <img src={logo_admin} alt="administrador" />
          <h1>Panel de administrador</h1>
        </div>
        <input
          className={s.grid_header_input}
          type="text"
          placeholder="🔎 Email..."
          onChange={handleSearch}
        />
        <span className={s.grid_header}>Global</span>
        <span className={s.grid_header}>Publicar</span>
        <span className={s.grid_header}>Comprar</span>
        {users.length ? (
          users.map((u) =>
            u.email.toLowerCase().includes(filterEmail.toLowerCase()) ? (
              <User
                key={u.id}
                email={u.email}
                ban_status={u.ban_status}
                ban_publish={u.driver ? u.driver.publish : false}
                ban_purchase={u.ban_purchase}
              />
            ) : null
          )
        ) : (
          <h1 style={{ color: "white" }}>No hay usuarios cargados.</h1>
        )}
      </div>
    </div>
  );
}
