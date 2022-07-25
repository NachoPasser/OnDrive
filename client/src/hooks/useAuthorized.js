import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/enviroment";

const getVerify = (token) => {
  return axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getVerifyDriver = (id) => {
  return axios.get(`${API_URL}/auth/profile`, {
    headers: {
      user_id: `${id}`,
    },
  });
};

export function useAuthorized({ allowed = [] }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    getVerify(token)
      .then((res) => {
        //driver case
        const { type, id } = res.data;
        //pageUse - admin - googleUser
        if (allowed.includes(type)) {
          setAuthorized(true);
          setLoading(false);
        } else if (allowed.includes("driverUser")) {
          getVerifyDriver(id)
            .then((user) => {
              if (user.data.driver !== null) setAuthorized(true);
              setLoading(false);
            })
            .catch(() => {
              setAuthorized(false);
              setLoading(false);
            });
        } else setLoading(false);
      })
      .catch((res) => {
        const { type } = res.response.data;
        allowed.includes(type) ? setAuthorized(true) : setAuthorized(false); //visitor
        setLoading(false);
      });
  }, [allowed, token]);

  return { authorized, loading };
}
