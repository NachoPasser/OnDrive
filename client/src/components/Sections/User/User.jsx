import React, { useState } from "react";
import axios from "axios";
import s from "./User.module.css";
import { API_URL } from "../../../config/enviroment";

export default function User({
  email,
  ban_status,
  ban_publish = false,
  ban_purchase = false,
}) {
  const [banned, setBan] = useState(ban_status);
  const [bannedPublish, setBanPublish] = useState(ban_publish);
  const [bannedPurchase, setBanPurchase] = useState(ban_purchase);

  const types = {
    ban_status: () => [!banned, setBan],
    ban_publish: () => [!bannedPublish, setBanPublish],
    ban_purchase: () => [!bannedPurchase, setBanPurchase],
  };

  const handleBanStatus = (e) => {
    const { name } = e.target;
    let [status, setter] = types[name]();

    setter(status);

    axios
      .put(`${API_URL}/admin/${status ? "ban" : "unban"}`, {
        [`${status ? "ban" : "unban"}_email`]: email,
        type: name,
      })
      .then((res) => alert(res.data.msg));
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={s.columns}>
        <span id={s.email}>{email}</span>
      </div>
      <div id={s.divBtn}>
        <button onClick={handleBanStatus} name="ban_status">
          {banned ? "Desbanear" : "Banear"}
        </button>
        <button onClick={handleBanStatus} name="ban_publish">
          {bannedPublish ? "Desbanear" : "Banear"}
        </button>
        <button onClick={handleBanStatus} name="ban_purchase">
          {bannedPurchase ? "Desbanear" : "Banear"}
        </button>
      </div>
    </div>
  );
}
