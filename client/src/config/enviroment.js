const { REACT_APP_API_URL, REACT_APP_API_PORT } = process.env;
export const API_URL =
  REACT_APP_API_URL === "localhost"
    ? `http://${REACT_APP_API_URL}:${REACT_APP_API_PORT}`
    : `https://${REACT_APP_API_URL}`;
