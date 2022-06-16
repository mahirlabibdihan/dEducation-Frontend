import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";

class AuthApi extends Api {
  signup = async (data) => {
    try {
      let res = await axios.post(API_BASE_URL + "/auth/signup", {
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

  login = async (data) => {
    try {
      let res = await axios.post(API_BASE_URL + "/auth/login", {
        email: data.email,
        pass: data.pass,
        type: data.type,
      });
      if (res.status === 200) {
        console.log(res.data.token);
        return {
          success: true,
          token: res.data.token,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  changePass = async (data, token) => {
    console.log(data);
    try {
      let res = await axios.post(
        API_BASE_URL + "/auth/change_pass",
        {
          currPass: data.currPass,
          newPass: data.newPass,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (res.status === 200) {
        return {
          success: true,
          token: res.data.token,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
}
export default AuthApi;
