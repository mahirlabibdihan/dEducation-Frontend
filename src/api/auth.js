import axios from "axios";
import Cookies from "universal-cookie";
import { api_base_url } from "../index";
export const login = async (data) => {
  const cookies = new Cookies();
  const COOKIE_AGE = 31536000;
  try {
    let res = await axios.post(api_base_url + "/auth/login", {
      email: data.email,
      pass: data.pass,
      type: data.type,
    });
    if (res.status === 200) {
      cookies.set("token", res.data.token, { path: "/", maxAge: COOKIE_AGE });
      console.log(res.data.token);
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
export const signup = async (data) => {
  try {
    let res = await axios.post(api_base_url + "/auth/signup", {
      name: data.name,
      email: data.email,
      pass: data.pass,
      type: data.type,
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

export const changePass = async (data) => {
  console.log(data);
  const cookies = new Cookies();
  const COOKIE_AGE = 31536000;
  try {
    let res = await axios.post(
      api_base_url + "/auth/change_pass",
      {
        currPass: data.currPass,
        newPass: data.newPass,
      },
      {
        headers: { authorization: "Bearer " + cookies.get("token") },
      }
    );
    if (res.status === 200) {
      cookies.set("token", res.data.token, { path: "/", maxAge: COOKIE_AGE });
      console.log(res.data.token);
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
