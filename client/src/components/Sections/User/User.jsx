import React, { useState } from "react";
import axios from "axios";
import ban_img from "../../../assets/Buttons/banned_permise.png";
import allow_img from "../../../assets/Buttons/allow_permise.png";
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
    <>
      <span id={s.email} className={s.item}>
        {email}
      </span>
      <button
        onClick={handleBanStatus}
        name="ban_status"
        className={`${s.item} ${s.item_btn}`}
      >
        <img
          src={banned ? ban_img : allow_img}
          alt={banned ? "Desbanear" : "Banear"}
          name="ban_status"
        />
      </button>
      <button
        onClick={handleBanStatus}
        name="ban_publish"
        className={`${s.item} ${s.item_btn}`}
      >
        <img
          src={bannedPublish ? ban_img : allow_img}
          alt={bannedPublish ? "Desbanear" : "Banear"}
          name="ban_publish"
        />
      </button>
      <button
        onClick={handleBanStatus}
        name="ban_purchase"
        className={`${s.item} ${s.item_btn}`}
      >
        <img
          src={bannedPurchase ? ban_img : allow_img}
          alt={bannedPurchase ? "Desbanear" : "Banear"}
          name="ban_purchase"
        />
      </button>
    </>
  );
}
