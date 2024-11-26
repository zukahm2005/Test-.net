import axios from "axios";

// Cập nhật baseURL với cổng 5179
const api = axios.create({
  baseURL: "http://localhost:5179/api",
});

export default api;
