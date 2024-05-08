import axios from "axios";
export default axios.create({
  baseURL: "http://44.215.230.155:3050/api",
  headers: {
    "Content-type": "application/json",
  },
});

//44.215.230.155