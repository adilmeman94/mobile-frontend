import axios from "axios";
import { ADMIN_API_URL } from '../configs/constant';

const axiosInstance = axios.create({
  baseURL: ADMIN_API_URL
});

export default axiosInstance;
