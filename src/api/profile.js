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

export const uploadImage = async (formData) => {
  const cookies = new Cookies();
  try {
    let res = await axios.post(`${api_base_url}/profile/upload`, formData, {
      headers: { authorization: "Bearer " + cookies.get("token") },
    });
    if (res.status === 200) {
      return { success: true };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};
