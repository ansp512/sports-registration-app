import axios from "axios";

const STATIC_HEADERS = {
  headers: {
    "content-type": "application/json",
  },
};

export const registerUser = (userName: string) =>
  axios
    .post(
      `http://localhost:8000/api/users/create-username/${userName}`,
      STATIC_HEADERS
    )
    .then((r) => r);

export const validateUser = (userName: string) => {
  return axios
    .get<any>(`http://localhost:8000/api/users/validate/${userName}`)
    .then((r) => r);
};
