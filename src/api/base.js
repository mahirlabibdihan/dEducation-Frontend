import axios from "axios";
import { API_BASE_URL } from "../index";
import Cookies from "universal-cookie";
export default class Api {
  cookies = new Cookies();
  get = async (url) => {
    const token = this.cookies.get("token");
    try {
      const res = await axios.get(API_BASE_URL + url, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return err.response.data;
    }
  };
  post = async (url, body) => {
    const token = this.cookies.get("token");
    try {
      const res = await axios.post(API_BASE_URL + url, body, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return err.response.data;
    }
  };
}
