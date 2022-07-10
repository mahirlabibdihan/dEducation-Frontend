import Cookies from "universal-cookie";
import AuthApi from "../api/authApi";
import Controller from "./base";
import { COOKIE_AGE } from "../index";
class AuthController extends Controller {
  authApi = new AuthApi();
  cookies = new Cookies();
  login = async (data) => {
    console.log(data);
    const result = await this.authApi.login(data);
    console.log(result);
    if (result.success) {
      this.cookies.set("token", result.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      this.cookies.set("type", data.type, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      return true;
    }
    return false;
  };
  logout = async (data) => {
    this.cookies.remove("token", { path: "/" });
    this.cookies.remove("type", { path: "/" });
  };

  signup = async (data) => {
    const result = await this.authApi.signup(data);
    return result;
  };

  changePass = async (currPass, newPass) => {
    const token = this.cookies.get("token");
    const result = await this.authApi.changePass(
      {
        currPass: currPass,
        newPass: newPass,
      },
      token
    );
    console.log(result);
    if (result.success) {
      this.cookies.set("token", result.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      return true;
    }
    return false;
  };
}
export default AuthController;
