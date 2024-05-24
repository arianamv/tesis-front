import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3050/api",
  headers: {
    "Content-type": "application/json",
  },
});

//44.215.230.155