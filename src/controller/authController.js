import Cookies from "universal-cookie";
import { changePass } from "../api/auth";
import Controller from "./base";

class AuthController extends Controller {
  logout = async (data) => {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
  };

  changePass = async (currPass, newPass) => {
    const result = await changePass({
      currPass: currPass,
      newPass: newPass,
    });
    console.log(result);
    return result.success === true;
  };
}
export default AuthController;
