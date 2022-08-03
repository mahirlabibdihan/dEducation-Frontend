import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CoachingApi from "../api/coachingApi";
class CoachingController extends Controller {
  coachingApi = new CoachingApi();
  cookies = new Cookies();
  create = async (data) => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.create(data, token);
    return result;
  };
  getList = async () => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.getList(token);
    return result;
  };
  getMyList = async () => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.getMyList(token);
    return result;
  };
  getInfo = async (coaching_id) => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.getInfo(coaching_id, token);
    return result;
  };
  joinCoaching = async (coaching_id) => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.joinCoaching(coaching_id, token);
    return result;
  };
  getMyCourseList = async (coaching_id) => {
    const token = this.cookies.get("token");
    const result = await this.coachingApi.getMyCourseList(coaching_id, token);
    return result;
  };
  updateInfo = async (data, coaching_id) => {
    const token = this.cookies.get("token");
    data["coaching_id"] = coaching_id;
    const result = await this.coachingApi.updateInfo(data, token);
    return result;
  };
  uploadImage = async (formData) => {
    // console.log("Upload", coaching_id);
    const token = this.cookies.get("token");
    console.log(token);
    const result = await this.coachingApi.uploadImage(formData, token);
    return result;
  };
}
export default CoachingController;
