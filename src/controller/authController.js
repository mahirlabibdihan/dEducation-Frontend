import Cookies from "universal-cookie";
import AuthApi from "../api/authApi";
import Controller from "./base";
import { COOKIE_AGE } from "../index";
import { showToast } from "../App";
class AuthController extends Controller {
  authApi = new AuthApi();
  cookies = new Cookies();
  login = async (data) => {
    const res = await this.authApi.login(data);
    if (res.success) {
      this.cookies.set("token", res.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      this.cookies.set("type", data.type, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
    } else {
      showToast(res.error, "error");
    }
    return res;
  };
  logout = async () => {
    this.cookies.remove("token", { path: "/" });
    this.cookies.remove("type", { path: "/" });
  };

  signup = async (data) => {
    const res = await this.authApi.signup(data);
    this.showSuccess("New account created", res);
    return res;
  };

  changePass = async (currPass, newPass) => {
    const token = this.cookies.get("token");
    const res = await this.authApi.changePass(
      {
        currPass: currPass,
        newPass: newPass,
      },
      token
    );
    if (res.success) {
      this.cookies.set("token", res.data.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
    }
    this.showSuccess("Password changed", res);
    return res;
  };
  resetPass = async (newPass, token) => {
    const res = await this.authApi.resetPass(newPass, token);
    if (res.success) {
      this.showSuccess("Password changed", res);
    }
    return res;
  };
  forgotPass = async (email, type) => {
    const res = await this.authApi.forgotPass(email, type);
    this.showSuccess("Password recovery link sent to your email", res);
    return res;
  };
}
export default AuthController;
