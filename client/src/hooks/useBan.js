import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/enviroment";
import { useEffect } from "react";

const getBanStatus = (token) => {
  return axios.get(`${API_URL}/auth/verify/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function useBan() {
  const [error, setError] = useState(false);
  const [globalBan, setGlobalBan] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setVerifying(true);
    getBanStatus(token)
      .then((res) => {
        setGlobalBan(res.data.status);
        setVerifying(false);
        setError(false);
      })
      .catch((e) => {
        console.log(e)
        if (e.response?.data?.type === "visitor") setVerifying(false);
        else {
          setVerifying(false);
          setError(true);
        }
      });
  }, [token]);

  return { globalBan, verifying, error };
}
