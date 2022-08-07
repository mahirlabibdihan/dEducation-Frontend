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
      return err.response.data;
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
      return err.response.data;
    }
  };
  changePass = async (data, token) => {
    return await this.post("/auth/change_pass", {
      curr_pass: data.currPass,
      new_pass: data.newPass,
    });
  };
}
export default AuthApi;
