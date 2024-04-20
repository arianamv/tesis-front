import axios from "axios";
export default axios.create({
  baseURL: "http://52.207.16.30:8080/",
  headers: {
    "Content-type": "application/json",
  },
});
