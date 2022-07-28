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

const verifyComplete = async (allowed, token) => {
  try {
    //visitor sin token
    if (!token) return allowed.includes("visitor"); //true or false

    //case admin / pageUser
    let verify = await getVerify(token);
    const { type, id } = verify.data;
    if (allowed.includes(type)) return true;

    //verificamos la posibilidad de que sea un driverUser
    if (allowed.includes("driverUser")) {
      let verifyDriver = await getVerifyDriver(id);
      return verifyDriver.data.driver !== null; //true or false
    }
  } catch (e) {
    //498 error: caso visitor o token caducado
    return allowed.includes("visitor"); //true or false
  }
};

export function useAuthorized({ allowed = [] }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    verifyComplete(allowed, token)
      .then((state) => {
        setAuthorized(state);
        setLoading(false);
      })
      .catch((state) => {
        setAuthorized(state);
        setLoading(false);
      });
  }, [allowed, token]);

  return { authorized, loading };
}