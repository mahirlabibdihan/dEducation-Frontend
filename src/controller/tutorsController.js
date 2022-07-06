import Cookies from "universal-cookie";
import TutorsApi from "../api/tutorsApi";
import Controller from "./base";

class TutorsController extends Controller {
  tutorsApi = new TutorsApi();
  cookies = new Cookies();
  getTutorsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getTutorsList(token);
    return result;
  };
  getMyTutorsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getMyTutorsList(token);
    return result;
  };
}
export default TutorsController;
