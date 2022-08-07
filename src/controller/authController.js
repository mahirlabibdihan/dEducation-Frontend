import Cookies from "universal-cookie";
import AuthApi from "../api/authApi";
import Controller from "./base";
import { COOKIE_AGE } from "../index";
import { showToast } from "../App";
class AuthController extends Controller {
  authApi = new AuthApi();
  cookies = new Cookies();
  login = async (data) => {
    const result = await this.authApi.login(data);
    if (result.success) {
      this.cookies.set("token", result.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      this.cookies.set("type", data.type, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
    } else {
      showToast(result.error, "error");
    }
    return result;
  };
  logout = async () => {
    this.cookies.remove("token", { path: "/" });
    this.cookies.remove("type", { path: "/" });
  };

  signup = async (data) => {
    const result = await this.authApi.signup(data);
    this.showSuccess("New account created", result);
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
    if (result.success) {
      this.cookies.set("token", result.data.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
    }
    this.showSuccess("Password changed", result);
    return result;
  };
}
export default AuthController;
