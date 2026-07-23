import axios from "axios";

const API = axios.create({
  baseURL: "https://student-support-chatbot-2.onrender.com/"
});

export default API;