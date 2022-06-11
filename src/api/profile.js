import axios from "axios";
import Cookies from "universal-cookie";
import { api_base_url } from "../index";
export const getProfile = async () => {
  const cookies = new Cookies();
  try {
    let res = await axios.get(`${api_base_url}/profile`, {
      headers: { authorization: "Bearer " + cookies.get("token") },
    });
    if (res.status === 200) {
      return { success: true, name: res.data.name, image: res.data.image };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};
export const logout = async (data) => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
};
export const signup = async (data) => {
  try {
    let res = await axios.post(api_base_url + "/auth/signup", {
      name: data.name,
      email: data.email,
      pass: data.pass,
    });
    if (res.status === 200) {
      return {
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};
